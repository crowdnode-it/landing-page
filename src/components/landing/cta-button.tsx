"use client"

import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
export function CTAButton({
  children,
  size = "lg",
}: {
  children: ReactNode
  size?: "sm" | "lg"
}) {
  return (
    <Button
      render={<a href="#join" data-track-nav="join" data-track-nav-type="top_cta" />}
      nativeButton={false}
      className={cn(
        "bsp-pill !h-auto !rounded-full border-transparent !bg-[var(--p-cta-bg)] !text-[var(--p-cta-text)] shadow-none hover:opacity-90",
        size === "sm" ? "px-3 py-2 md:px-[1.125rem] md:py-2.5" : "px-[1.125rem] py-2.5",
      )}
    >
      <span>{children}</span>
      <ArrowRight data-icon="inline-end" className="size-4" />
    </Button>
  )
}
