"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const roles = [
  "Just curious - show me what you've got",
  "Investor - hunting the next unicorn",
  "Industry expert - I invest in what I understand",
  "Aspiring VC - building my first portfolio",
  "Founder - building the next big thing",
  "Crypto native - always early",
  "Institutional investor - looking for deal flow",
]

export function WaitlistForm({ centered = false }: { centered?: boolean }) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !role) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "flex items-center gap-4 rounded-2xl border border-[var(--p-accent)] bg-[color-mix(in_srgb,var(--p-accent)_10%,transparent)] px-6 py-5",
          centered && "mx-auto w-fit"
        )}
      >
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--p-accent)]">
          <Check className="size-4 text-[var(--p-bg)]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--p-ink)]">You&apos;re on the list!</p>
          <p className="text-xs text-[var(--p-ink-soft)]">We&apos;ll be in touch soon.</p>
        </div>
      </div>
    )
  }

  const fieldClass = cn(
    "h-[52px] w-full rounded-2xl border border-[var(--p-ink-line)] bg-[color-mix(in_srgb,var(--p-surface)_50%,transparent)] px-5 text-[15px] text-[var(--p-ink)] outline-none",
    "placeholder:text-[var(--p-ink-mute)]",
    "focus:border-[var(--p-accent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--p-accent)_20%,transparent)]",
    "transition-all"
  )

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-3", centered && "mx-auto w-full max-w-md")}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={cn(fieldClass, "sm:flex-1")}
        />
        <div className="relative sm:flex-1">
          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={cn(
              fieldClass,
              "appearance-none pr-10 [color-scheme:light_dark]",
              !role && "text-[var(--p-ink-mute)]"
            )}
          >
            <option value="" disabled>
              I am...
            </option>
            {roles.map((r) => (
              <option key={r} value={r}>
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
  )
}
