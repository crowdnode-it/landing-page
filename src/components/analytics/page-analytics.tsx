"use client"

import { useEffect } from "react"

import {
  _state,
  detectIab,
  getVisitInfo,
  recordVisit,
  trackCtaClick,
  trackNavClick,
  trackPageLanded,
  trackReturnVisit,
  trackScrollDepth,
  trackSectionDwell,
  trackSessionSurvived3s,
} from "@/lib/analytics"
import type { PersonaKey } from "@/lib/personas"

/**
 * Invisible client component mounted once inside PersonaLanding.
 * Handles all passive tracking: page_landed, session_survived_3s, scroll_depth,
 * section_dwell (IntersectionObserver), return_visit, and click-delegation for
 * cta_click and nav_click via data-track-cta / data-track-nav attributes.
 */
export function PageAnalytics({ persona }: { persona: PersonaKey }) {
  useEffect(() => {
    // ── Init shared state ──────────────────────────────────────────────────
    _state.pageLoadTime = Date.now()
    _state.persona = persona

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

    // ── scroll_depth ───────────────────────────────────────────────────────
    const firedThresholds = new Set<number>()

    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.round((window.scrollY / total) * 100)
      _state.scrollDepthPct = pct
      if (pct >= 50) _state.passedHalfway = true

      for (const threshold of [25, 50, 75, 90] as const) {
        if (pct >= threshold && !firedThresholds.has(threshold)) {
          firedThresholds.add(threshold)
          trackScrollDepth(persona, threshold)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    // ── section_dwell via IntersectionObserver ─────────────────────────────
    // Requires [data-section] attributes on each tracked section element.
    const enterTimes = new Map<string, number>()

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = (entry.target as HTMLElement).dataset.section ?? "unknown"

          if (entry.isIntersecting) {
            enterTimes.set(sectionId, Date.now())
            _state.lastVisibleSection = sectionId
          } else {
            const enterTime = enterTimes.get(sectionId)
            if (enterTime !== undefined) {
              const dwellMs = Date.now() - enterTime
              enterTimes.delete(sectionId)
              // Ignore sub-500ms flickers from fast scrolling
              if (dwellMs > 500) {
                trackSectionDwell(persona, sectionId, dwellMs)
              }
            }
          }
        }
      },
      { threshold: 0.4 },
    )

    document
      .querySelectorAll("[data-section]")
      .forEach((el) => sectionObserver.observe(el))

    // ── Click delegation for cta_click and nav_click ───────────────────────
    // Server-rendered elements carry data-track-cta / data-track-nav attributes.
    function onDocumentClick(e: MouseEvent) {
      const target = e.target as HTMLElement

      const ctaEl = target.closest("[data-track-cta]") as HTMLElement | null
      if (ctaEl) {
        trackCtaClick(persona, ctaEl.dataset.trackCta ?? "unknown")
        return
      }

      const navEl = target.closest("[data-track-nav]") as HTMLElement | null
      if (navEl) {
        trackNavClick(
          persona,
          navEl.dataset.trackNavType ?? "unknown",
          navEl.dataset.trackNav ?? "unknown",
        )
      }
    }

    document.addEventListener("click", onDocumentClick)

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      clearTimeout(survivalTimer)
      window.removeEventListener("scroll", onScroll)
      sectionObserver.disconnect()
      document.removeEventListener("click", onDocumentClick)
    }
  }, [persona])

  return null
}
