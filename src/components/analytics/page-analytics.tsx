"use client"

import { useEffect, useRef } from "react"

import {
  _state,
  detectIab,
  getVisitInfo,
  recordVisit,
  trackNavClick,
  trackPageLanded,
  trackReturnVisit,
  trackSectionDwell,
  trackBoxOpen,  
  trackBoxDwell,
  trackSessionSurvived3s,
} from "@/lib/analytics"
import type { PersonaKey } from "@/lib/personas"

/**
 * Invisible client component mounted once inside PersonaLanding.
 * Handles all passive tracking: page_landed, session_survived_3s, scroll_depth,
 * section_dwell (IntersectionObserver), box_open & box_dwell (hashchange for modals), 
 * return_visit, and click-delegation for nav_click via data-track-nav attributes.
 * cta_click is handled directly by CTAButton (src/components/landing/cta-button.tsx).
 */
export function PageAnalytics({ persona }: { persona: PersonaKey }) {
  // Riferimenti per preservare i timer attivi tra eventi asincroni e closures
  const enterTimesRef = useRef<Map<string, number>>(new Map())
  const isNavigatingRef = useRef(false)
  
  // Riferimento per calcolare quanto tempo una box/modal rimane aperta
  const activeBoxRef = useRef<{ id: string; enterTime: number } | null>(null)

  useEffect(() => {
    // ── Init shared state ──────────────────────────────────────────────────
    _state.pageLoadTime = Date.now()
    _state.persona = persona
    _state.lastVisibleSection = "hero"

    const iabType = detectIab()
    _state.iabType = iabType

    const visitInfo = getVisitInfo()
    _state.isReturning = visitInfo.isReturning
    _state.visitCount = visitInfo.visitCount + 1

    recordVisit()

    // ── page_landed ────────────────────────────────────────────────────────
    trackPageLanded(persona, iabType, visitInfo.isReturning, _state.visitCount)

    if (visitInfo.isReturning) {
      trackReturnVisit(persona, _state.visitCount, visitInfo.priorFormTouch)
    }

    // ── session_survived_3s ────────────────────────────────────────────────
    const survivalTimer = setTimeout(() => {
      trackSessionSurvived3s(persona, iabType)
    }, 3000)

    let navigationTimer: ReturnType<typeof setTimeout> | null = null

    // Helper per valutare e tracciare il dwell time di una sezione
    const flushSectionDwell = (sectionId: string) => {
      const enterTime = enterTimesRef.current.get(sectionId)
      if (enterTime !== undefined) {
        const dwellMs = Date.now() - enterTime
        
        // Filtro anti-flicker: almeno 3,5 secondi di visibilità reale
        if (dwellMs > 3500) {
          trackSectionDwell(persona, sectionId, dwellMs)
        }
      }
      // Pulisce sempre il timestamp all'uscita per prevenire il bug dei ghost-timers
      enterTimesRef.current.delete(sectionId)
    }

    // Helper per valutare e tracciare il dwell time di una box aperta (Modal)
    const flushBoxDwell = () => {
      if (activeBoxRef.current) {
        const { id, enterTime } = activeBoxRef.current
        const dwellMs = Date.now() - enterTime
        
        // Traccia solo se tenuta aperta per più di 1 secondo (scarta i click errati)
        if (dwellMs > 1000) {
          trackBoxDwell(persona, id, dwellMs)
        }
        activeBoxRef.current = null
      }
    }

    // Helper per svuotare ALL i tracciamenti attivi (es. quando l'app viene chiusa)
    const flushAllActiveSections = () => {
      for (const sectionId of enterTimesRef.current.keys()) {
        flushSectionDwell(sectionId)
      }
      flushBoxDwell()
    }

    // ── box_open & box_dwell via URL Hash Change (Gestione Modal Nativi) ──
    const handleHashChange = () => {
      const hash = window.location.hash

      // Se l'hash punta a un modal delle box (es: #value-tokens)
      if (hash.startsWith("#value-")) {
        // Se c'era già un'altra box aperta, salviamo prima i suoi dati di durata
        flushBoxDwell()
        
        const boxId = hash.replace("#value-", "")
        
        // 1. Tracciamento IMMEDIATO dell'apertura del box
        trackBoxOpen(persona, boxId)
        
        // 2. Facciamo partire il timer per il dwell time della box
        activeBoxRef.current = {
          id: boxId,
          enterTime: Date.now()
        }
      } else {
        // L'utente ha chiuso il modal (es: cliccando sulla X o sul backdrop che punta a #value)
        flushBoxDwell()
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    
    // Controllo preventivo al caricamento iniziale se la pagina nasce già con un hash nell'URL
    handleHashChange()

    // ── section_dwell via IntersectionObserver ─────────────────────────────
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        // Se l'utente sta saltando programmaticamente tramite un click, congeliamo i radar
        if (isNavigatingRef.current) return

        for (const entry of entries) {
          const sectionId = (entry.target as HTMLElement).dataset.section ?? "unknown"

          if (entry.isIntersecting) {
            if (!enterTimesRef.current.has(sectionId)) {
              enterTimesRef.current.set(sectionId, Date.now())
            }
            _state.lastVisibleSection = sectionId
          } else {
            flushSectionDwell(sectionId)
          }
        }
      },
      // Il threshold a 0.1 (10% visibilità) evita micro-attivazioni sui rimbalzi di overscroll
      { threshold: 0.1 },
    )

    document
      .querySelectorAll("[data-section]")
      .forEach((el) => sectionObserver.observe(el))

    // ── Handle Page Close / Minimize / Tab Switch ──────────────────────────
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        // Finestra chiusa, ridotta a icona o cambio scheda: salva tutto all'istante
        flushAllActiveSections()
      } else if (document.visibilityState === "visible") {
        // L'utente torna sulla pagina: riavvia i counter per ciò che è visibile ora
        document.querySelectorAll("[data-section]").forEach((el) => {
          const sectionId = (el as HTMLElement).dataset.section ?? "unknown"
          const rect = el.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0
          if (isVisible) {
            enterTimesRef.current.set(sectionId, Date.now())
          }
        })
        
        // Se la pagina torna visibile e c'è ancora l'hash del modal attivo, riavvia il counter del modal
        const hash = window.location.hash
        if (hash.startsWith("#value-")) {
          activeBoxRef.current = {
            id: hash.replace("#value-", ""),
            enterTime: Date.now()
          }
        }
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange)

    // ── Click delegation for nav_click ────────────────────────────────────
    function onDocumentClick(e: MouseEvent) {
      const navEl = (e.target as HTMLElement).closest("[data-track-nav]") as HTMLElement | null
      if (navEl) {
        isNavigatingRef.current = true
        if (navigationTimer !== null) clearTimeout(navigationTimer)

        // 1. Logga la sezione che l'utente sta abbandonando prima del salto temporale
        const currentSectionId = _state.lastVisibleSection
        if (currentSectionId) {
          flushSectionDwell(currentSectionId)
        }

        // 2. HARD RESET della mappa sezioni per non registrare lo scroll veloce del lancio
        enterTimesRef.current.clear()

        // 3. Invia l'evento del click sul menu
        trackNavClick(
          persona,
          navEl.dataset.trackNavType ?? "unknown",
          navEl.dataset.trackNav ?? "unknown",
        )

        // 4. Riaccende i radar delle sezioni solo quando lo smooth scroll si è fermato del tutto
        navigationTimer = setTimeout(() => {
          isNavigatingRef.current = false
          
          document.querySelectorAll("[data-section]").forEach((el) => {
            const sectionId = (el as HTMLElement).dataset.section ?? "unknown"
            const rect = el.getBoundingClientRect()
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0
            if (isVisible) {
              enterTimesRef.current.set(sectionId, Date.now())
              _state.lastVisibleSection = sectionId
            }
          })
        }, 1300) // 1300ms assicura la fine dell'inerzia dello scroll hardware
      }
    }

    document.addEventListener("click", onDocumentClick)

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      clearTimeout(survivalTimer)
      if (navigationTimer !== null) clearTimeout(navigationTimer)
      
      flushAllActiveSections()
      
      sectionObserver.disconnect()
      window.removeEventListener("hashchange", handleHashChange)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      document.removeEventListener("click", onDocumentClick)
    }
  }, [persona])

  return null
}