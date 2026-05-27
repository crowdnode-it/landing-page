"use client"

import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { _state, trackCtaClick } from "@/lib/analytics"

export function CTAButton({
  children,
  size = "lg",
  location = "unknown",
}: {
  children: ReactNode
  size?: "sm" | "lg"
  location?: string
}) {
  return (
    <Button
      render={<a href="#join" />}
      nativeButton={false}
      onClick={() => trackCtaClick(_state.persona, location)}
      className={cn(
        "!h-auto rounded-full !bg-[var(--p-cta-bg)] !text-[var(--p-cta-text)] shadow-none hover:opacity-90",
        "border border-transparent [letter-spacing:-0.005em]",
        size === "sm" ? "px-4 py-2 text-[0.85rem] font-bold" : "px-6 py-3 text-[0.85rem] font-bold",
      )}
    >
      <span>{children}</span>
      <ArrowRight data-icon="inline-end" className="size-4" />
    </Button>
  )
}
