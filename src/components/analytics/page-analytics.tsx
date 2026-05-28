"use client"

import { useEffect } from "react"

import {
  _state,
  detectIab,
  getVisitInfo,
  recordVisit,
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
 * nav_click via data-track-nav attributes.
 * cta_click is handled directly by CTAButton (src/components/landing/cta-button.tsx).
 */
export function PageAnalytics({ persona }: { persona: PersonaKey }) {
  useEffect(() => {
    // ── Init shared state ──────────────────────────────────────────────────
    // Reset scroll/section state on every mount so re-mounts (Strict Mode dev,
    // or client-side navigation between persona pages) start from a clean slate.
    _state.pageLoadTime = Date.now()
    _state.persona = persona
    _state.scrollDepthPct = 0
    _state.passedHalfway = false
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

    // ── scroll_depth ───────────────────────────────────────────────────────
    // navigating is set to true when a nav link is clicked and cleared after the
    // smooth-scroll animation finishes (~1200 ms). While navigating:
    //   • _state is still updated (so waitlist_signup gets accurate position)
    //   • trackScrollDepth is NOT called and thresholds are NOT marked as fired
    //     (so the same threshold can still fire later on genuine manual scroll)
    const firedThresholds = new Set<number>()
    let navigating = false
    let navigationTimer: ReturnType<typeof setTimeout> | null = null

    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.round((window.scrollY / total) * 100)
      _state.scrollDepthPct = pct
      if (pct >= 50) _state.passedHalfway = true

      if (navigating) return

      for (const threshold of [25, 50, 75, 90] as const) {
        if (pct >= threshold && !firedThresholds.has(threshold)) {
          firedThresholds.add(threshold)
          trackScrollDepth(persona, threshold)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    // Capture scroll position immediately — covers pages that load at a non-zero
    // offset (e.g. a direct link with a #hash that auto-scrolls on load).
    onScroll()

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
              // Only track genuine reading time — 3.5 s minimum filters out scroll-through flickers
              if (dwellMs > 3500) {
                trackSectionDwell(persona, sectionId, dwellMs)
              }
            }
          }
        }
      },
      // threshold: 0 — any intersection triggers enter; fully out-of-view triggers exit.
      // This is necessary for sections taller than the viewport (e.g. Hero on mobile)
      // where a ratio-based threshold like 0.4 would geometrically never be reached.
      { threshold: 0 },
    )

    document
      .querySelectorAll("[data-section]")
      .forEach((el) => sectionObserver.observe(el))

    // ── Click delegation for nav_click ────────────────────────────────────
    // Server-rendered nav anchors carry data-track-nav / data-track-nav-type.
    // cta_click is handled directly in CTAButton via onClick.
    function onDocumentClick(e: MouseEvent) {
      const navEl = (e.target as HTMLElement).closest("[data-track-nav]") as HTMLElement | null
      if (navEl) {
        // Suppress scroll_depth events during the programmatic smooth-scroll that
        // follows a nav click. 1200 ms covers typical smooth-scroll durations.
        navigating = true
        if (navigationTimer !== null) clearTimeout(navigationTimer)
        navigationTimer = setTimeout(() => { navigating = false }, 1200)

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
      if (navigationTimer !== null) clearTimeout(navigationTimer)
      window.removeEventListener("scroll", onScroll)
      sectionObserver.disconnect()
      document.removeEventListener("click", onDocumentClick)
    }
  }, [persona])

  return null
}
