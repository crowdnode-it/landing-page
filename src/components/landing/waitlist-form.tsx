"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowRight, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  recordConversion,
  recordFormTouch,
  trackFormAbandon,
  trackFormFieldInteract,
  trackFormStarted,
  trackWaitlistSignup,
} from "@/lib/analytics"
import { waitlistEmailMaxLength, waitlistEmailPattern } from "@/lib/waitlist"

// Same regex the server validates with, minus the ^…$ anchors the HTML
// `pattern` attribute adds itself — so client and server enforce one rule.
const emailInputPattern = waitlistEmailPattern.source.slice(1, -1)

const roles = [
  "Just curious - show me what you've got",
  "Investor - hunting the next unicorn",
  "Industry expert - I invest in what I understand",
  "Aspiring VC - building my first portfolio",
  "Founder - building the next big thing",
  "Crypto native - always early",
  "Institutional investor - looking for deal flow",
]

export function WaitlistForm({
  centered = false,
  persona = "unknown",
  initialSubmitted = false,
}: {
  centered?: boolean
  persona?: string
  initialSubmitted?: boolean
}) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [submitted, setSubmitted] = useState(initialSubmitted)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const emailRef = useRef<HTMLInputElement>(null)
  const roleRef = useRef<HTMLSelectElement>(null)
  // Synchronous in-flight lock: blocks a second submit from a fast double-click
  // or Enter-spam before React re-renders. Released when the success modal is
  // dismissed, so it does not change resubmit behaviour.
  const submittingRef = useRef(false)

  // Refs for abandon tracking — written synchronously in handlers so abandon listeners
  // always read current values, even if they fire before the next React render cycle.
  const formState = useRef({
    emailFilled: false,
    roleFilled: false,
    lastFieldTouched: null as string | null,
    touchStartTime: null as number | null,
    submitted: initialSubmitted,
  })

  // form_abandon — fires when the user leaves with a touched but unsubmitted form.
  // Listens to both visibilitychange (tab switch) and pagehide (close/navigate away).
  // A deduplication flag prevents double-firing when both events fire in sequence.
  useEffect(() => {
    let fired = false

    function fireAbandon() {
      if (fired) return
      const s = formState.current
      if (s.touchStartTime && !s.submitted) {
        fired = true
        trackFormAbandon(
          persona,
          s.emailFilled,
          s.roleFilled,
          s.lastFieldTouched,
          Date.now() - s.touchStartTime,
        )
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") fireAbandon()
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("pagehide", fireAbandon)

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("pagehide", fireAbandon)
    }
  }, [persona, ])

  function handleEmailFocus() {
    if (!formState.current.touchStartTime) {
      formState.current.touchStartTime = Date.now()
      recordFormTouch()
      trackFormStarted(persona)
    }
    formState.current.lastFieldTouched = "email"
    trackFormFieldInteract(persona, "email", "focus")
  }

  function handleEmailBlur() {
    trackFormFieldInteract(persona, "email", emailRef.current?.value ? "blur_filled" : "blur_empty")
  }

  function handleRoleChange(value: string) {
    setRole(value)
    formState.current.roleFilled = !!value
    formState.current.lastFieldTouched = "role"
    if (!formState.current.touchStartTime) {
      formState.current.touchStartTime = Date.now()
      recordFormTouch()
      trackFormStarted(persona)
    }
    trackFormFieldInteract(persona, "role", "changed")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // `submitted` is async React state; on a fast double-click both events can
    // read the stale `false` before a re-render. submittingRef is synchronous,
    // so the second event sees `true` immediately and bails — no double POST.
    if (submitted || submittingRef.current) return
    submittingRef.current = true

    const formData = new FormData(event.currentTarget)
    const submittedEmail = String(formData.get("email") ?? emailRef.current?.value ?? email).trim()
    const submittedRole = String(formData.get("role") ?? roleRef.current?.value ?? role)

    // Set ref synchronously before any async work — pagehide/visibilitychange listeners
    // read the ref directly and must see submitted=true before the next render cycle.
    formState.current.emailFilled = true
    formState.current.roleFilled = true
    formState.current.submitted = true
    trackWaitlistSignup(persona, submittedRole)
    recordConversion()
    setSubmittedEmail(submittedEmail)
    event.currentTarget.reset()
    formState.current.emailFilled = false
    formState.current.roleFilled = false
    setEmail("")
    setRole("")
    setSubmitted(true)

    fetch("/api/waitlist", { method: "POST", body: formData }).catch((err) => {
      console.error("[waitlist] failed to save lead:", err)
    })
  }

  function closeSuccess() {
    // Release the in-flight lock so the form behaves exactly as before once the
    // success modal is dismissed (resubmit behaviour intentionally unchanged).
    submittingRef.current = false
    setSubmitted(false)
  }

  const fieldClass = cn(
    "h-[52px] w-full rounded-2xl border border-[var(--p-ink-line)] bg-[color-mix(in_srgb,var(--p-surface)_50%,transparent)] px-5 text-[15px] text-[var(--p-ink)] outline-none",
    "placeholder:text-[var(--p-ink-mute)]",
    "focus:border-[var(--p-accent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--p-accent)_20%,transparent)]",
    "transition-all"
  )

  return (
    <>
      <form
        action="/api/waitlist"
        method="post"
        onSubmit={handleSubmit}
        aria-label="Join the waitlist"
        className={cn("flex flex-col gap-3", centered && "mx-auto w-full max-w-md")}
      >
        <input type="hidden" name="persona" value={persona} />
        <input type="hidden"/>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            ref={emailRef}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            pattern={emailInputPattern}
            maxLength={waitlistEmailMaxLength}
            title="Enter a valid email address, e.g. name@example.com"
            onChange={(e) => {
              setEmail(e.target.value)
              formState.current.emailFilled = !!e.target.value
            }}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            placeholder="your@email.com"
            className={cn(fieldClass, "sm:flex-1")}
          />
          <div className="relative sm:flex-1">
            <select
              ref={roleRef}
              name="role"
              defaultValue=""
              required
              onChange={(e) => handleRoleChange(e.target.value)}
              className={cn(
                fieldClass,
                "appearance-none pr-10 [color-scheme:light]",
                !role && "text-[var(--p-ink-mute)]"
              )}
            >
              {/* Explicit option colours so the native dropdown stays readable
                  on the dark personas (Bob/Lara), where it otherwise inherits
                  light text onto the OS's grey popup. */}
              <option value="" disabled style={{ color: "#6b7280", backgroundColor: "#ffffff" }}>
                I am...
              </option>
              {roles.map((r) => (
                <option key={r} value={r} style={{ color: "#101010", backgroundColor: "#ffffff" }}>
                  {r}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--p-ink-mute)]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className={cn(
            "flex h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[var(--p-cta-bg)] text-[15px] font-semibold text-[var(--p-cta-text)]",
            "transition-all hover:opacity-90 hover:shadow-[0_4px_24px_color-mix(in_srgb,var(--p-accent)_30%,transparent)] active:scale-[0.98]",
            "[letter-spacing:-0.005em]"
          )}
        >
          <span>Join the Waitlist</span>
          <ArrowRight className="size-4" />
        </button>
      </form>

      {submitted ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-success-title"
          className="fixed inset-0 z-[90] grid place-items-center bg-black/55 px-5 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-[var(--p-ink-line)] bg-[var(--p-bg)] px-7 py-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <button
              type="button"
              aria-label="Close"
              onClick={closeSuccess}
              className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-[var(--p-ink-soft)] transition-colors hover:bg-[color-mix(in_srgb,var(--p-surface)_70%,transparent)] hover:text-[var(--p-ink)]"
            >
              <X className="size-4" />
            </button>
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--p-accent-2)]">
              <Check className="size-6 text-white" />
            </div>
            <h2 id="waitlist-success-title" className="mt-6 text-2xl font-extrabold leading-tight text-[var(--p-ink)] [letter-spacing:-0.03em]">
              You&apos;re on the list.
            </h2>
            {submittedEmail ? (
              <>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[var(--p-ink-soft)]">
                  We saved your spot for early access. We&apos;ll reach back to you at
                </p>
                <p className="mx-auto mt-3 block max-w-full truncate whitespace-nowrap text-base font-extrabold text-[var(--p-ink)]">
                  {submittedEmail}
                </p>
              </>
            ) : (
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[var(--p-ink-soft)]">
                We saved your spot for early access. We&apos;ll reach back to you soon.
              </p>
            )}
            <button
              type="button"
              onClick={closeSuccess}
              className="mt-7 h-11 rounded-full bg-[var(--p-ink)] px-6 text-sm font-bold text-[var(--p-bg)] transition-opacity hover:opacity-90"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
