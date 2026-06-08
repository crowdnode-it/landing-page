# The 10 Custom Events
## 1. page_landed

**Trigger:** fires once on mount, ~200ms after load
**Implementation:** `useEffect` in PersonaLanding, reads URL, `localStorage`, and UA string

* `persona` → "bob" | "johann" | "lara"
* `is_returning` → boolean (from localStorage flag set on first visit)
* `visit_count` → number (localStorage counter)
* `iab_type` → "instagram" | "facebook" | "none" (UA sniff)
* `utm_source` → from URL param
* `utm_campaign` → from URL param



## 2. session_survived_3s

**Trigger:** `setTimeout(3000)` set inside `useEffect` on mount — fires only if the user is still on the page
**Implementation:** single `setTimeout` in PersonaLanding; cancel it on unmount

* `persona` → "bob" | "johann" | "lara"
* `iab_type` → "instagram" | "facebook" | "none"



## 4. section_dwell

**Trigger:** fires when a section leaves the viewport after **at least 3,5 seconds of visibility** — filters out scroll-through flickers. Uses `IntersectionObserver` at `threshold: 0` — records `enterTime` on enter, fires event with `dwell_ms = Date.now() - enterTime` on exit.
**Implementation:** single observer in `PageAnalytics` (`src/components/analytics/page-analytics.tsx`) targeting all elements with `data-section` attributes

> **Note:** `_state.lastVisibleSection` is updated on every section *enter* with no minimum, so `waitlist_signup` always carries the correct last-seen section even for sections the user scrolled through quickly without triggering a `section_dwell` event.

* `persona` → "bob" | "johann" | "lara"
* `section_id` → "hero" | "value" | "join" | "who-we-are"
* `dwell_ms` → number (milliseconds section was visible, always > 3500)



## 5. nav_click

**Trigger:** click on any navigation anchor carrying `data-track-nav` — desktop top nav or mobile bottom pill
**Implementation:** event delegation on `document` in `PageAnalytics` (`src/components/analytics/page-analytics.tsx`); anchors in `persona-landing.tsx` carry `data-track-nav` and `data-track-nav-type` attributes
top_desktop means values in the navbar from the desktop ( in the mobile version there is not )
* `persona` → "bob" | "johann" | "lara"
* `nav_type` → "hero_primary" | "hero_secondary" | "top_cta" | "top_desktop"
* `target` → "value_proposition" | "join" | "who-we-are" 


## 6. form_field_interact

**Trigger:** `onFocus`, `onBlur`, and `onChange` on the email input and role select inside WaitlistForm
**Implementation:** add handlers to both fields in `waitlist-form.tsx`; track a `formState` ref (`{emailFocused, emailFilled, roleFilled, lastField}`)

* `persona` → "bob" | "johann" | "lara"
* `field` → "email" | "role"
* `action` → "focus" | "blur_empty" | "blur_filled" | "changed"


## 7. form_abandon

**Trigger:** fires when the user leaves with a touched but unsubmitted form. Listens to **both** `visibilitychange→hidden` (tab switch/minimize) and `pagehide` (tab close / navigate away). A deduplication flag prevents double-firing when both events fire in sequence.
**Implementation:** `useEffect` in `WaitlistForm` (`src/components/landing/waitlist-form.tsx`); uses the `formState` ref from event #6. The original `visibilitychange`-only implementation missed tab-close and page-navigation scenarios.

* `persona` → "bob" | "johann" | "lara"
* `form_location` → "hero" | "closing"
* `email_filled` → boolean
* `role_filled` → boolean
* `last_field_touched` → "email" | "role" | null
* `time_in_form_ms` → ms since first field focus

**Answers:** Post-Click Q1 (completion friction). Pairs with `form_field_interact` to give you a funnel: `form_field_interact focus` → `form_field_interact blur_filled` → `form_abandon` vs. `waitlist_signup`. You'll see if people abandon after seeing the role dropdown options.


## 8. waitlist_signup

**Trigger:** on successful `handleSubmit` in WaitlistForm, before `setSubmitted(true)`
**Implementation:** add the analytics call inside `handleSubmit` in `waitlist-form.tsx`; reads shared refs for scroll state and last visible section (passed as props or via a context)

* `persona` → "bob" | "johann" | "lara"
* `role` → the selected role option string
* `time_on_page_ms` → ms since page load
* `last_visible_section` → "who-we-are" | "value" | "join" | "hero"
* `is_returning` → boolean
* `visit_count` → number


## 9. return_visit

**Trigger:** fires on `page_landed` when `localStorage` confirms the user has been here before without converting
**Implementation:** in PersonaLanding mount effect — if `localStorage.getItem('parity_visited')` exists but `localStorage.getItem('parity_converted')` does not, fire this event. Set both flags on first visit / conversion.

* `persona` → "bob" | "johann" | "lara"
* `visit_count` → number (total visits including this one)
* `prior_form_touch` → boolean (did they interact with the form on a previous visit?)

## 10. box_clicked

**Trigger:** fires immediately when a value proposition bento block is clicked to open its detailed modal overview.
**Implementation:** delegated hash/URL listener or click capture in `PageAnalytics` (`src/components/analytics/page-analytics.tsx`) — fires `trackBoxOpen` instantly when `window.location.hash` changes to match a `#value-[id]` target block.

* `persona` → "bob" | "johann" | "lara"
* `box_id` → "tokens" | "founders" | "sell" | "etf" | "updates" | "grow"


## 11. box_dwell

**Trigger:** fires when an expanded value proposition details modal is closed, or when the user leaves the page while it's open — filters out unintentional click-and-close misclicks under 1 second.
**Implementation:** managed via `hashchange`, `visibilitychange`, and component unmount events in `PageAnalytics` (`src/components/analytics/page-analytics.tsx`). Records `enterTime` when `#value-[id]` hits the URL hash, computes delta on exit, and dispatches event if `dwell_ms > 1000`.

* `persona` → "bob" | "johann" | "lara"
* `box_id` → "tokens" | "founders" | "sell" | "etf" | "updates" | "grow"
* `dwell_ms` → number (milliseconds modal panel was kept open, always > 1000)


## 12. iab_exit_prompt (conditional)

**Trigger:** fires when `iab_type !== "none"` and the user taps the share button or tries to open in an external browser (detectable via a custom banner you render for IAB users)
**Implementation:** render a small "Open in browser for best experience" banner only when UA indicates Instagram/Facebook IAB; instrument the banner's click

* `persona` → "bob" | "johann" | "lara"
* `iab_type` → "instagram" | "facebook"
* `action` → "banner_shown" | "banner_clicked"

**Answers:** ToF Q4 — closes the loop. You'll know not just that IAB users bounced at 3s, but whether offering them an exit to a real browser recovers them.
