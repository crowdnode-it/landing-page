
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

**Answers:** ToF Q3 (CPC comparison when linked to Meta data), ToF Q4 (IAB detection baseline), Post-Click Q2 (returning vs. first-touch population split)


## 2. session_survived_3s

**Trigger:** `setTimeout(3000)` set inside `useEffect` on mount — fires only if the user is still on the page
**Implementation:** single `setTimeout` in PersonaLanding; cancel it on unmount

* `persona` → "bob" | "johann" | "lara"
* `iab_type` → "instagram" | "facebook" | "none"

**Answers:** ToF Q4 — "Is the Instagram audience surviving the first 3 seconds?" Cross-tabulate `iab_type=instagram` sessions where this event fires vs. total `page_landed` to get the IAB survival rate.


## 3. scroll_depth

**Trigger:** fires once per threshold — 25%, 50%, 75%, 90% — using a scroll event listener with a Set of fired thresholds
**Implementation:** `useEffect` in PersonaLanding, calculates `scrollY / (documentHeight - viewportHeight)`

* `persona` → "bob" | "johann" | "lara"
* `depth_pct` → 25 | 50 | 75 | 90

**Answers:** MoF Q1 (scroll depth per persona), MoF Q2 (compare scroll depth between users who later convert vs. those who don't — GA4 funnel or segment analysis), BoF Q2 (did they hit 50% before submitting? — answered by `waitlist_signup.passed_50pct`)


## 4. section_dwell

**Trigger:** fires when a section leaves the viewport after **at least 3,5 seconds of visibility** — filters out scroll-through flickers. Uses `IntersectionObserver` at `threshold: 0` — records `enterTime` on enter, fires event with `dwell_ms = Date.now() - enterTime` on exit.
**Implementation:** single observer in `PageAnalytics` (`src/components/analytics/page-analytics.tsx`) targeting all elements with `data-section` attributes

> **Note:** `_state.lastVisibleSection` is updated on every section *enter* with no minimum, so `waitlist_signup` always carries the correct last-seen section even for sections the user scrolled through quickly without triggering a `section_dwell` event.

* `persona` → "bob" | "johann" | "lara"
* `section_id` → "hero" | "founders" | "startkit" | "secondary" | "track" | "join"
* `dwell_ms` → number (milliseconds section was visible, always > 2000)

**Answers:** MoF Q3 (which sections hold attention longest), MoF Q4 (cross-reference dwell by persona to see if Johann lingers on `#secondary` more than Bob)


## 5. nav_click

**Trigger:** click on any navigation anchor carrying `data-track-nav` — desktop top nav or mobile bottom pill
**Implementation:** event delegation on `document` in `PageAnalytics` (`src/components/analytics/page-analytics.tsx`); anchors in `persona-landing.tsx` carry `data-track-nav` and `data-track-nav-type` attributes

* `persona` → "bob" | "johann" | "lara"
* `nav_type` → "top_desktop" | "mobile_pill"
* `target` → "startkit" | "secondary" | "track"

**Answers:** MoF Q5 — "Are users exploring or just scrolling?" Compare session rate of `nav_click` events vs. sessions where no `nav_click` fires but `scroll_depth≥75%` does. High scroll + no nav click = passive reader. Nav click = active explorer.


## 6. form_field_interact

**Trigger:** `onFocus`, `onBlur`, and `onChange` on the email input and role select inside WaitlistForm
**Implementation:** add handlers to both fields in `waitlist-form.tsx`; track a `formState` ref (`{emailFocused, emailFilled, roleFilled, lastField}`)

* `persona` → "bob" | "johann" | "lara"
* `form_location` → "hero" | "closing" (passed as prop)
* `field` → "email" | "role"
* `action` → "focus" | "blur_empty" | "blur_filled" | "changed"

**Answers:** Post-Click Q1 — field-by-field abandonment. Segment users who fired `form_field_interact` `field=email` `action=focus` but never fired `waitlist_signup` to see where they dropped. Specifically tells you: did they fail at the email step, or did they balk at the role dropdown?


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
* `form_location` → "hero" | "closing"
* `scroll_depth_at_submit` → 0–100 (current scroll %)
* `passed_50pct` → boolean (did `scroll_depth` ever hit 50 before this?)
* `time_on_page_ms` → ms since page load
* `last_visible_section` → "startkit" | "secondary" | "track" | "founders" | "hero"
* `is_returning` → boolean
* `visit_count` → number

**Answers:** This is the master conversion event. It directly answers:
* BoF Q2 (`passed_50pct` — did they actually read the tokenization mechanics?)
* BoF Q3 (`last_visible_section`)
* BoF Q4 (in GA4: create an Exploration → Segment Overlap of persona × country filtering on `waitlist_signup`)
* Post-Click Q2 (`is_returning` + `visit_count`)


## 9. return_visit

**Trigger:** fires on `page_landed` when `localStorage` confirms the user has been here before without converting
**Implementation:** in PersonaLanding mount effect — if `localStorage.getItem('parity_visited')` exists but `localStorage.getItem('parity_converted')` does not, fire this event. Set both flags on first visit / conversion.

* `persona` → "bob" | "johann" | "lara"
* `visit_count` → number (total visits including this one)
* `prior_form_touch` → boolean (did they interact with the form on a previous visit?)

**Answers:** Post-Click Q2 — "Impulsive vs. Returners." Compare `return_visit.prior_visit_count` distribution against `waitlist_signup.is_returning`. Reveals how long the consideration cycle is and which persona converts faster on return visits.


## 10. iab_exit_prompt (conditional)

**Trigger:** fires when `iab_type !== "none"` and the user taps the share button or tries to open in an external browser (detectable via a custom banner you render for IAB users)
**Implementation:** render a small "Open in browser for best experience" banner only when UA indicates Instagram/Facebook IAB; instrument the banner's click

* `persona` → "bob" | "johann" | "lara"
* `iab_type` → "instagram" | "facebook"
* `action` → "banner_shown" | "banner_clicked"

**Answers:** ToF Q4 — closes the loop. You'll know not just that IAB users bounced at 3s, but whether offering them an exit to a real browser recovers them.
