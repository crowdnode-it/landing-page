# GA4 Custom Explorations — Parity Landing Page

This document describes every GA4 Exploration built for the Parity landing page analytics. Each Exploration maps to a funnel stage and contains multiple tabs, each answering a specific research question. All Explorations live under **Explore** in the GA4 left sidebar.

---

## Prerequisites

### Custom Dimensions registered in GA4
| GA4 Display Name | Event Parameter | Notes |
|---|---|---|
| `Persona` | `persona` | "bob", "johann", or "lara" |
| `IAB_type` | `iab_type` | "instagram", "facebook", or "none" |
| `UTM_source` | `utm_source` | e.g. "meta", "instagram" |
| `UTM_Campaign` | `utm_campaign` | ad campaign name |
| `UTM_content` | `utm_content` | ad creative identifier |
| `Is_returning` | `is_returning` | true/false — was this user here before without converting |
| `Section_id` | `section_id` | "hero", "founders", "startkit", "secondary", "track", "join" |
| `Nav_type` | `nav_type` | "top_desktop" or "mobile_pill" |
| `Nav_target` | `target` | the section the nav link points to |
| `Form_location` | `form_location` | where on the page the form is ("hero", "join") |
| `Signup_Role` | `role` | role the user selected in the waitlist form |
| `Last_Field_Touched` | `last_field_touched` | "email" or "role" — last field touched before abandoning |
| `Role_filled` | `role_filled` | true/false |
| `Email_filled` | `email_filled` | true/false |
| `Last_visible_section` | `last_visible_section` | section in viewport at moment of conversion |
| `Passed_50pct` | `passed_50pct` | true/false — did user scroll past 50% before converting |
| `Scroll_Depth_percentage` | `depth_pct` | **dimension** — 25, 50, 75, or 90 (threshold reached) |

### Custom Metrics registered in GA4
| GA4 Display Name | Event Parameter | Notes |
|---|---|---|
| `Dwell_time_ms` | `dwell_ms` | ms a section was visible before leaving viewport |
| `Scroll_at_submit` | `scroll_depth_at_submit` | scroll % at exact moment of form submission |
| `Time_on_page_ms` | `time_on_page_ms` | ms from page load to form submission |
| `Visit_count` | `visit_count` | number of times this user has visited |
| `Time_in_form_ms` | `time_in_form_ms` | ms spent inside the form before abandoning |

### Calculated Metrics registered in GA4
| GA4 Display Name | Formula | Why |
|---|---|---|
| `Avg Dwell Time (ms)` | `{{Dwell_time_ms}} / {{Event count}}` | Raw metric is sum — dividing by event count gives per-section average |
| `Avg Time on Page (ms)` | `{{Time_on_page_ms}} / {{Event count}}` | Same reason — average time-to-convert per persona, not total |

> **Important:** `Scroll_Depth_percentage` must be registered as a **Dimension** (not a metric). Its values are discrete thresholds (25 / 50 / 75 / 90), not continuous numbers, so they belong in rows. If registered as a metric, GA4 locks it to Sum aggregation and it cannot be used as a row dimension.

> **Important:** Custom dimensions and metrics do not backfill. Any event collected before registration shows "not set" for that field. Only events collected after registration populate correctly.

---

## Custom Events Reference

| Event Name | When it fires | Key parameters |
|---|---|---|
| `page_landed` | On page mount (once per visit) | persona, iab_type, is_returning, visit_count, utm_source, utm_campaign, utm_content |
| `session_survived_3s` | 3 seconds after mount, if still on page | persona, iab_type |
| `scroll_depth` | At 25%, 50%, 75%, 90% scroll thresholds | persona, depth_pct |
| `section_dwell` | When a section leaves the viewport after >2s of visibility | persona, section_id, dwell_ms |
| `nav_click` | On any navigation link click | persona, nav_type, target |
| `form_field_interact` | On email focus/blur, role select change | persona, form_location, field, action |
| `form_abandon` | On tab-hide or page-hide when form was touched but not submitted | persona, form_location, email_filled, role_filled, last_field_touched, time_in_form_ms |
| `waitlist_signup` | On successful form submission | persona, role, form_location, scroll_depth_at_submit, passed_50pct, time_on_page_ms, last_visible_section, is_returning, visit_count |
| `return_visit` | On mount, only if user has visited before without converting | persona, visit_count, prior_form_touch |

---

## Exploration 1 — ToF: Audience & Quality

**Purpose:** Understand who is arriving at the site, where they come from, which persona variant attracts the most qualified traffic, and whether the Instagram in-app browser is creating technical drop-off before users even engage with the content.

---

### Tab 1 · Audience Demographics
**Answers:** ToF Q1 — *"Who is clicking the ads?"*

**Configuration**
- Visualization: Free form table
- Rows: `Age`, `Gender`, `Operating system`
- Columns (pivot): `Persona`
- Values: `Event count`, `Sessions`
- Filter: `Event name` exactly matches `page_landed`

**Logic and meaning**

The `page_landed` event fires once per visit on page mount. Filtering to it means every row in the table represents exactly one real page load — not a scroll, click, or interaction. This gives a clean count of arrivals by demographic.

Pivoting by `Persona` puts bob / johann / lara as side-by-side columns, so you can compare the demographic profile of each variant's audience in a single view.

`Event count` = total landings from that demographic group. `Sessions` = GA4's session count for context.

**How to read it:** Look for demographic clusters that over-index on a specific persona column. If 25–34 year olds concentrate in the `johann` column, that demographic resonates with the Aspiring VC narrative. This data cross-referenced with Meta Ads Manager (which shows demographics of who clicked) tells you whether your targeting is attracting the right people or just anyone who clicks.

---

### Tab 2 · Geographic Breakdown
**Answers:** ToF Q2 — *"Which countries, regions, or cities are responding first?"*

**Configuration**
- Visualization: Free form table
- Rows: `Country`, `Region`, `City`
- Columns (pivot): `Persona`
- Values: `Event count`
- Filter: `Event name` exactly matches `page_landed`
- Sort: Event count descending

**Logic and meaning**

"Responding" means actually landing on the page, not just seeing the ad. Meta shows where the ad was served; GA4 shows where the actual page load happened. These differ due to VPNs, travel, and mismatched targeting.

Rows are hierarchical: Country → Region → City. You can collapse them in GA4 to zoom in or out.

**How to read it:** Top rows by event count = your first wave of markets. Cross with the Persona columns to see which geography is responding to which narrative. A city appearing high for `johann` but low for `bob` is meaningful signal — that market's audience self-identifies with the Aspiring VC persona, informing future geo-targeted campaigns.

---

### Tab 3 · Persona Conversion Funnel
**Answers:** ToF Q3 — *"Who represents the cheapest scalable audience to bring to the site?"*

**Configuration**
- Visualization: Funnel exploration
- Step 1: `page_landed` → "Landed"
- Step 2: `session_survived_3s` → "Survived 3s"
- Step 3: `waitlist_signup` → "Converted"
- Breakdown: `Persona`

**Logic and meaning**

GA4 cannot show Meta ad costs, but it shows conversion rates. The formula for CPL (Cost Per Lead) is:

```
CPL = CPC (from Meta) ÷ Conversion Rate (from GA4)
```

This funnel breaks the journey into three stages:
- **Landed → Survived 3s:** Drop-off here = technical friction (slow load, IAB browser issues) or immediate mismatch (wrong audience). Nothing to do with page content.
- **Survived 3s → Converted:** Drop-off here = persuasion failure. The user stayed but wasn't convinced. This is where copy, design, and CTA placement matter.

Breaking by Persona shows which variant is most efficient end-to-end.

**How to read it:** The step-2-to-step-3 percentage per persona column is your conversion rate. Bring Meta CPC for each persona ad set and divide. The persona with the lowest CPL is the most scalable audience to invest in. A persona with high Landed count but low Converted count = expensive traffic that doesn't convert.

---

### Tab 4 · IAB Survival Rate
**Answers:** ToF Q4 — *"Is the Instagram audience surviving the first 3 seconds?"*

**Configuration**
- Visualization: Free form table
- Create two identical tabs — one filtered on `page_landed`, one on `session_survived_3s`
- Rows: `IAB_type`
- Columns (pivot): `Persona`
- Values: `Event count`
- Segment filter: `IAB_type` = `instagram`

**Logic and meaning**

Instagram's in-app browser (IAB) renders pages differently from native browsers: slower JavaScript execution, limited caching, different rendering engine on iOS. Users arriving from Instagram Stories or feed ads land inside this browser and often leave before the page finishes loading — not because the content is wrong but because of pure technical friction.

`iab_type` is detected via the user agent string on page mount and attached to both `page_landed` and `session_survived_3s`. Comparing the count of each event for `iab_type = instagram` gives the survival rate:

```
Instagram Survival Rate = session_survived_3s count / page_landed count (where iab_type = instagram)
```

**How to read it:** If native browser survival is 70% but Instagram IAB is 35%, the in-app browser is losing half your Instagram traffic before they even see the content. The fix in that scenario is a "Open in Safari/Chrome" prompt — a copy or design change won't help. If both are similar, the page loads fine in IAB and drop-off is genuine audience mismatch.

---

## Exploration 2 — MoF: Engagement & Attention

**Purpose:** Understand what users do once they're on the page. How far they scroll, where they spend time reading, whether they navigate actively or read passively, and whether behavior differs across personas.

---

### Tab 1 · Scroll Depth
**Answers:** MoF Q1 — *"How far down does each persona scroll before converting or leaving?"* and MoF Q2 — *"Do people who convert scroll less than people who don't?"*

**Configuration**
- Visualization: Free form table
- Rows: `Scroll_Depth_percentage`, `Persona`
- Values: `Event count`
- Filter: `Event name` exactly matches `scroll_depth`
- Segment A: Users who triggered `waitlist_signup` (Converters)
- Segment B: Users who did NOT trigger `waitlist_signup` (Non-converters)

Second view (duplicate tab, rename "Scroll at Submit"):
- Filter: `Event name` exactly matches `waitlist_signup`
- Rows: `Persona`
- Values: `Scroll_at_submit` (average via calculated metric or manual: sum / event count)

**Logic and meaning**

`scroll_depth` fires at four thresholds: 25%, 50%, 75%, 90%. Each threshold fire is independent — a user who reaches 75% generates three events (25, 50, 75). This means `Event count` at threshold 50 = number of users who scrolled at least halfway.

`Scroll_Depth_percentage` must be registered as a **dimension** (not a metric) so it can appear as a row. Its four values are categories, not a continuous number.

`Scroll_at_submit` (from `waitlist_signup`) is the precise scroll position at the moment the user submitted the form — not a threshold, but the exact percentage.

With Converter / Non-converter segments active, the same table shows side-by-side scroll distribution for both groups.

**How to read it:**

- If converters cluster at the 25% row, the hero section alone is persuading them — the rest of the page is irrelevant for these users. Consider an above-the-fold CTA experiment.
- If non-converters cluster at 75–90%, they read almost everything but didn't act. This is a conviction problem, not an awareness problem — they understand the product but aren't convinced. Stronger social proof, clearer risk reduction, or urgency mechanisms may help.
- If converters and non-converters have similar scroll distributions, scroll depth alone doesn't predict conversion for this audience and you need to look at section dwell instead.

---

### Tab 2 · Section Dwell Time
**Answers:** MoF Q3 — *"Which specific features or sections hold visual attention the longest?"* and MoF Q4 — *"Does the preference for a specific feature change based on the persona?"*

**Configuration**
- Visualization: Free form table
- Rows: `Section_id`
- Columns (pivot): `Persona`
- Values: `Avg Dwell Time (ms)` (calculated metric), `Event count`
- Filter: `Event name` exactly matches `section_dwell`

**Logic and meaning**

`section_dwell` fires when a section **leaves** the viewport, carrying the milliseconds it was visible. A minimum of 2,000ms is enforced in the code — sections the user scrolled through in under 2 seconds do not generate an event. This filters out scroll-through flickers and ensures every data point represents genuine reading time.

The six sections tracked are: `hero`, `founders`, `startkit`, `secondary`, `track`, `join`.

`Avg Dwell Time (ms)` uses the calculated metric (`Dwell_time_ms / Event count`) because the raw metric is locked to Sum. Sum would simply reflect which sections have the most traffic (hero always wins, everyone loads it). Average controls for visit count and reveals where users genuinely pause.

`Event count` alongside the average is important context: a section with a high average but low event count means only a few users reached it, but those who did spent significant time — possibly a sign the section rewards those who reach it but many drop off before getting there.

**How to read it:**

- Highest average dwell = section capturing the most genuine attention per visit.
- Compare the same section across persona columns. If `secondary` (tokenomics) has a high average for `johann` but low for `bob`, Johann-type users are engaging deeply with product mechanics while Bob-type users skim it — which validates keeping detailed tokenomics in Johann's variant while simplifying it for Bob.
- Low dwell on `join` (the form section) combined with low conversions = users are reaching the form but not engaging with it, suggesting the CTA or form itself is the problem, not awareness.

---

### Tab 3 · Navigation vs Passive Reading
**Answers:** MoF Q5 — *"Are users exploring the site or just scrolling?"*

**Configuration**
- Visualization: Free form table
- Rows: `Nav_type`, `Nav_target`
- Columns (pivot): `Persona`
- Values: `Event count`, `Sessions`
- Filter: `Event name` exactly matches `nav_click`

**Logic and meaning**

`nav_click` fires whenever a user clicks a navigation link — either the top desktop nav bar or the mobile pill nav. It carries `nav_type` (which nav UI they used) and `target` (which section they jumped to).

A user who clicks a nav link is actively looking for something specific — they are not passively consuming the page flow. The ratio of nav clicks to sessions is the "explorer ratio":

```
Explorer ratio = nav_click event count / Sessions
```

A high explorer ratio means users are curious but not finding what they need through linear reading. A low explorer ratio means the top-to-bottom flow is working as designed.

**How to read it:**

- The most-clicked `Nav_target` tells you which section users are seeking out. If `track` (tokenomics) is the top target, users want to jump to it directly — consider moving it higher in the page layout.
- `Nav_type` split (top_desktop vs mobile_pill) reveals whether mobile and desktop users navigate differently, which could inform a mobile-specific layout decision.
- High nav clicks on `join` = users are actively looking for the form, which is a strong intent signal even without a conversion.

---

## Exploration 3 — BoF: Conversion Intent

**Purpose:** Understand the quality and nature of conversions. Who converts fastest, whether they actually understood the product, what pushed them over the edge, and which persona-geography combination produces the highest-value signups.

---

### Tab 1 · Time to Convert
**Answers:** BoF Q1 — *"Which persona shows the highest urgency to convert?"*

**Configuration**
- Visualization: Free form table
- Rows: `Persona`
- Values: `Avg Time on Page (ms)` (calculated metric)
- Filter: `Event name` exactly matches `waitlist_signup`
- Sort: Average ascending (lowest time at top)

**Logic and meaning**

`time_on_page_ms` is recorded inside the `waitlist_signup` event as `Date.now() - _state.pageLoadTime`, where `pageLoadTime` is set on component mount. It is the elapsed milliseconds between page load and form submission.

This is a proxy for **conviction speed** — how quickly the page persuaded the user to act. It does not measure total session length (users may have left and returned), only time within the current visit.

The calculated metric `Avg Time on Page (ms)` divides the sum by event count to give a per-conversion average rather than an inflated total.

**How to read it:**

- Low average = the persona is "pre-sold." They arrived already interested and the page confirmed their intent. The above-the-fold section is doing the work.
- High average = the persona needs to be persuaded by the page. They read carefully before deciding. This is not a negative — it means the page is doing its job for a more analytical audience — but it means that persona's page needs to hold up under scrutiny.
- Large gap between personas = your variants are attracting audiences with fundamentally different decision-making styles, which validates maintaining distinct page versions rather than consolidating.

---

### Tab 2 · Did They Read the Meat?
**Answers:** BoF Q2 — *"Did they actually read the product description before converting?"*

**Configuration**
- Visualization: Free form table
- Rows: `Persona`
- Columns (pivot): `Passed_50pct`
- Values: `Event count`
- Filter: `Event name` exactly matches `waitlist_signup`

**Logic and meaning**

The 50% scroll mark corresponds to where the tokenization mechanics are explained — the substantive product description. A signup where `passed_50pct = false` means the user submitted their email without reading how the product actually works. They responded to the brand, the headline, or the social proof — not the product itself.

`passed_50pct` is written into `_state` by the scroll observer in real time and attached to the `waitlist_signup` event at submission.

**How to read it:**

- High `true` count = signups who understood the product before committing. These are higher-quality leads who are less likely to churn from the waitlist when they learn more.
- High `false` count = signups driven by surface appeal. Not necessarily bad — impulse signups can still convert — but they require more onboarding and education post-signup. If `false` dominates, consider whether the hero copy is over-promising relative to the product reality.
- Difference by persona: if Johann shows 80% `true` and Bob shows 40% `true`, Johann-type users are product-driven while Bob-type users are narrative-driven. This has implications for the post-signup email sequence each persona receives.

---

### Tab 3 · Last Section Before Conversion
**Answers:** BoF Q3 — *"Which feature section is the user looking at right before they decide to click the CTA?"*

**Configuration**
- Visualization: Free form table
- Rows: `Last_visible_section`
- Columns (pivot): `Persona`
- Values: `Event count`
- Filter: `Event name` exactly matches `waitlist_signup`
- Sort: Event count descending

**Logic and meaning**

`last_visible_section` is updated by the IntersectionObserver every time a section enters the viewport — with no minimum dwell requirement, unlike `section_dwell`. At the moment of form submission, whatever section was last seen is written into the `waitlist_signup` event.

This is the closest approximation to "last touch" — what the user was looking at when they decided to act.

**How to read it:**

- `join` appearing at the top is expected and not informative on its own — it's where the form lives. Focus on rows above `join`.
- A section appearing frequently as the last visible section before conversion = a content catalyst. That section is triggering the decision to sign up even though the user then scrolls up or the form is elsewhere.
- If `founders` appears high, seeing the founders section creates conversion moments — double down on founder credibility and storytelling.
- If `track` (tokenomics) appears high for `johann` but not `bob`, the product details are what seals the deal for analytical personas but not for narrative personas.

---

### Tab 4 · Persona × Country Matrix
**Answers:** BoF Q4 — *"What is the highest-converting combination of Persona + Country?"*

**Configuration**
- Visualization: Free form table
- Rows: `Country`
- Columns (pivot): `Persona`
- Values: `Event count`
- Filter: `Event name` exactly matches `waitlist_signup`
- Sort: Event count descending

**Logic and meaning**

This table shows raw signup counts by country for each persona. To compute true conversion rate, cross-reference this table with the geographic breakdown in Exploration 1 (Tab 2), which shows landings by country and persona. Divide:

```
Conversion Rate = waitlist_signup count (this table) / page_landed count (ToF Tab 2)
```

This cannot be computed automatically across two Explorations in GA4 — export both to a spreadsheet and calculate there.

**How to read it:**

- High signup count + high landing count + high conversion rate = scalable beachhead. This is where you increase ad spend.
- High landing count + low signup count = traffic is arriving but not converting in this market. Could be cultural misalignment with the copy, wrong persona-market match, or a language barrier.
- Low landing count + high conversion rate = high-quality but under-served market. Worth testing dedicated spend to see if volume scales without degrading conversion rate.
- The cell with the highest rate at meaningful volume = your launch market. Prioritize it for community building, influencer partnerships, and first-user onboarding.

---

## Exploration 4 — Post-Click: Attribution & Friction

**Purpose:** Understand form completion friction and the consideration cycle of users who don't convert immediately but return later.

---

### Tab 1 · Form Abandonment Friction
**Answers:** Post-Click Q1 — *"What is the completion friction on the form?"*

**Configuration**
- Visualization: Free form table
- Rows: `Last_Field_Touched`, `Email_filled`, `Role_filled`
- Columns (pivot): `Persona`
- Values: `Event count`, `Time_in_form_ms` (average)
- Filter: `Event name` exactly matches `form_abandon`

**Logic and meaning**

`form_abandon` fires on `visibilitychange` (tab hidden) or `pagehide` (browser closed / navigated away) when the form was touched but not submitted. It captures `last_field_touched` (the last field interacted with), `email_filled` (whether the email field had content), `role_filled` (whether the role dropdown was selected), and `time_in_form_ms` (how long the user spent inside the form).

`Time_in_form_ms` average is particularly diagnostic:
- **Low time + abandoned:** The user opened the form, decided immediately it wasn't for them, and left. Intent mismatch — the form didn't match expectations set by the page.
- **High time + abandoned:** The user engaged seriously with the form but couldn't complete it. Confusion about what to fill in, indecision about role, or anxiety about submitting personal information.

**How to read it:**

- `Last_Field_Touched = role` with high count = users are stopping at the role dropdown. Check if `Email_filled = true` in those rows — if email was filled but role wasn't, users got stuck choosing a role. The dropdown options may not include a category they identify with.
- `Last_Field_Touched = email` with high count = users abandoned before even reaching the role field. The email field itself is the barrier — could be privacy concern or uncertainty about commitment.
- High `Time_in_form_ms` average + abandoned = the form is creating anxiety. Users want to submit but something is stopping them. Consider adding reassurance copy ("No spam. Cancel anytime.") near the submit button.

---

### Tab 2 · Impulsive vs Returning Converters
**Answers:** Post-Click Q2 — *"How many signups come from impulsive first touches versus multi-visit returners?"*

**Configuration**
- Visualization: Free form table
- Rows: `Is_returning`, `Visit_count`
- Columns (pivot): `Persona`
- Values: `Event count`
- Filter: `Event name` exactly matches `waitlist_signup`

**Logic and meaning**

`is_returning` and `visit_count` are read from `localStorage` on every page mount and stored in the module-level `_state` object. They are written into `waitlist_signup` at submission.

- `is_returning = false` + `visit_count = 1` = first-time visitor who converted immediately. These are impulse converters — your ad copy matched existing intent so perfectly that they needed no deliberation.
- `is_returning = true` + `visit_count = 2–3` = one or two prior visits. Short consideration cycle — they bounced once, thought about it briefly, and came back.
- `is_returning = true` + `visit_count = 4+` = extended consideration cycle. These users have strong intent but something is holding them back — could be timing, trust, or waiting for more information.

Note: `is_returning` is `true` only for users who visited before without converting. A user who converted and returns is not counted as returning (they're tracked separately via the `parity_converted` localStorage key).

**How to read it:**

- If the majority of signups are `is_returning = false` (impulse), retargeting ad campaigns are likely wasteful — users who are going to convert do so on first touch. Invest that budget in cold audience reach instead.
- If the majority are `is_returning = true` (returners), retargeting is essential and the consideration cycle is a real phenomenon for this audience. Invest in a retargeting sequence with additional social proof or urgency messaging.
- High `visit_count` average in the returning group = users are coming back many times before converting. This signals high intent paired with hesitation — the product is interesting but the ask (joining a waitlist) feels uncertain. Consider adding a stronger commitment reduction mechanism ("see what other investors have already joined").
- Persona differences in this table reveal whether different narratives attract deliberate vs impulsive audiences, which should inform the tone and urgency of the corresponding ad creative.
