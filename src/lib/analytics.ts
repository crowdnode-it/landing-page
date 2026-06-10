// analytics.ts — GA4 custom event layer for Parity landing page
// All functions are client-safe: they guard against SSR with typeof window checks.
// _state is written only from PageAnalytics (client) and read by event functions
// that are also called only on the client.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

type IabType = "instagram" | "facebook" | "none"

// ─── Module-level session state ───────────────────────────────────────────────
// Mutated by PageAnalytics on mount, consumed by event helpers below.
export const _state = {
  persona: "unknown",
  lastVisibleSection: "hero",
  pageLoadTime: 0,
  isReturning: false,
  visitCount: 0,
  iabType: "none" as IabType,
}

// ─── Core dispatcher ──────────────────────────────────────────────────────────
function trackMeta(eventName: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return

  if (eventName === "waitlist_signup") {
    window.fbq("track", "Lead", params)
  }

  window.fbq("trackCustom", eventName, params)
}

function track(eventName: string, params: Record<string, unknown> = {}) {
  console.log(
    `%c[Analytics] %c${eventName}`,
    "color:#a8dadc;font-weight:bold;",
    "color:#e9c46a;font-weight:bold;",
    params,
  )
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params)
  }
  trackMeta(eventName, params)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function detectIab(): IabType {
  if (typeof navigator === "undefined") return "none"
  const ua = navigator.userAgent
  if (/Instagram/i.test(ua)) return "instagram"
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return "facebook"
  return "none"
}

export function getVisitInfo() {
  try {
    const visited = localStorage.getItem("parity_visited")
    const convertedRaw = localStorage.getItem("parity_converted")
    const isConverted = convertedRaw === "1"
    const count = parseInt(localStorage.getItem("parity_visit_count") ?? "0", 10)
    const priorFormTouch = !!localStorage.getItem("parity_form_touched")
    return {
      isReturning: !!visited && !isConverted,
      visitCount: count,
      priorFormTouch,
    }
  } catch {
    return { isReturning: false, visitCount: 0, priorFormTouch: false }
  }
}

export function recordVisit() {
  try {
    const count = parseInt(localStorage.getItem("parity_visit_count") ?? "0", 10)
    localStorage.setItem("parity_visited", "1")
    localStorage.setItem("parity_visit_count", String(count + 1))
  } catch { /* storage unavailable (e.g. private browsing) */ }
}

export function recordConversion() {
  try {
    localStorage.setItem("parity_converted", "1")
  } catch { /* storage unavailable */ }
}

export function recordFormTouch() {
  try {
    localStorage.setItem("parity_form_touched", "1")
  } catch { /* storage unavailable */ }
}

// ─── Events ───────────────────────────────────────────────────────────────────

/** ToF Q1-Q4 · fires on mount with UTM params, IAB type, and returning-user flag */
export function trackPageLanded(
  persona: string,
  iabType: string,
  isReturning: boolean,
  visitCount: number,
) {
  const search =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null
  track("page_landed", {
    persona,
    is_returning: isReturning,
    visit_count: visitCount,
    iab_type: iabType,
    utm_source: search?.get("utm_source") ?? "(none)",
    utm_campaign: search?.get("utm_campaign") ?? "(none)",
    utm_content: search?.get("utm_content") ?? "(none)",
  })
}

/** Post-Click Q2 · fires on mount when the visitor has been here before without converting */
export function trackReturnVisit(
  persona: string,
  visitCount: number,
  priorFormTouch: boolean,
) {
  track("return_visit", {
    persona,
    visit_count: visitCount,
    prior_form_touch: priorFormTouch,
  })
}

/** ToF Q4 · fires 3 seconds after mount — only if the user is still on the page */
export function trackSessionSurvived3s(persona: string, iabType: string) {
  track("session_survived_3s", { persona, iab_type: iabType })
}

/** MoF Q3-Q4 · fires when a section leaves the viewport, carrying the ms it was visible */
export function trackSectionDwell(persona: string, sectionId: string, dwellMs: number) {
  track("section_dwell", { persona, section_id: sectionId, dwell_ms: dwellMs })
}

/** MoF Q5 · fires on any nav link click (top desktop, mobile pill, nav CTA) */
export function trackNavClick(persona: string, navType: string, target: string) {
  track("nav_click", { persona, nav_type: navType, target })
}

/** Post-Click Q1 · fires on email focus/blur and role select change */
export function trackFormFieldInteract(
  persona: string,
  field: string,
  action: string,
) {
  track("form_field_interact", {
    persona,
    field,
    action,
  })
}

/** Post-Click Q1 · fires once when a user first touches the waitlist form */
export function trackFormStarted(persona: string) {
  track("form_started", { persona })
}

export function trackBoxDwell(persona: string, boxId: string, dwellMs: number) {
   track("box_dwell", {
    persona : persona,
    box_id: boxId,
    dwell_ms: dwellMs,
  })
}

export function trackBoxOpen(persona: string, boxId: string) {
   track("box_clicked", {
    persona : persona,
    box_id: boxId
  })
}

/** Post-Click Q1 · fires on tab-hide / page-hide when form was touched but not submitted */
export function trackFormAbandon(
  persona: string,
  emailFilled: boolean,
  roleFilled: boolean,
  lastFieldTouched: string | null,
  timeInFormMs: number,
) {
  track("form_abandon", {
    persona,
    email_filled: emailFilled,
    role_filled: roleFilled,
    last_field_touched: lastFieldTouched,
    time_in_form_ms: timeInFormMs,
  })
}

/** BoF Q1-Q4 + Post-Click Q2 · master conversion event fired on successful form submit */
export function trackWaitlistSignup(persona: string, role: string) {
  track("waitlist_signup", {
    persona,
    role,
    last_visible_section: _state.lastVisibleSection,
    time_on_page_ms: Date.now() - _state.pageLoadTime,
    is_returning: _state.isReturning,
    visit_count: _state.visitCount,
  })
}
