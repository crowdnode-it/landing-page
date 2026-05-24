import Link from "next/link"
import { ArrowLeftRight, ArrowRight, BarChart3, Layers3, Radio, TrendingUp } from "lucide-react"
import type { CSSProperties, ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PhoneScrollPreview } from "@/components/landing/phone-scroll-preview"
import { cn } from "@/lib/utils"
import type { DisplayStyle, PersonaSection, PersonaTheme, VisualVariant } from "@/lib/personas"

type PersonaCSSVars = CSSProperties & {
  "--p-bg": string
  "--p-bg-alt": string
  "--p-surface": string
  "--p-surface-warm": string
  "--p-ink": string
  "--p-ink-soft": string
  "--p-ink-mute": string
  "--p-ink-line": string
  "--p-accent": string
  "--p-accent-2": string
  "--p-cta-bg": string
  "--p-cta-text": string
  "--p-stripe": string
}

const navItems = [
  { label: "StartKit", href: "#startkit" },
  { label: "Secondary Market", href: "#secondary" },
  { label: "After Investment", href: "#track" },
]

const stats = [
  { label: "From", value: "€200" },
  { label: "EU-regulated", value: "Real equity" },
  { label: "Exit", value: "When you choose" },
]

const displayClass: Record<DisplayStyle, string> = {
  serif: "font-[family-name:var(--font-instrument-serif)] font-normal",
  inter: "font-sans font-bold",
  space: "font-[family-name:var(--font-space-grotesk)] font-bold",
}

const heroTitleSizeClass: Record<DisplayStyle, string> = {
  serif: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  inter: "text-5xl sm:text-6xl lg:text-7xl",
  space: "text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl",
}

const sectionIds = ["startkit", "secondary", "track"]

function themeVars(theme: PersonaTheme): PersonaCSSVars {
  return {
    "--p-bg": theme.colors.bg,
    "--p-bg-alt": theme.colors.bgAlt,
    "--p-surface": theme.colors.surface,
    "--p-surface-warm": theme.colors.surfaceWarm,
    "--p-ink": theme.colors.ink,
    "--p-ink-soft": theme.colors.inkSoft,
    "--p-ink-mute": theme.colors.inkMute,
    "--p-ink-line": theme.colors.inkLine,
    "--p-accent": theme.colors.accent,
    "--p-accent-2": theme.colors.accent2,
    "--p-cta-bg": theme.colors.ctaBg,
    "--p-cta-text": theme.colors.ctaText,
    "--p-stripe": theme.dark ? "rgba(240, 248, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
  }
}

function normalizeWord(word: string) {
  return word.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function AccentLine({
  line,
  accentWords,
}: {
  line: string
  accentWords: string[]
}) {
  const accents = new Set(accentWords.map(normalizeWord))

  return line.split(/(\s+)/).map((part, index) => {
    if (/^\s+$/.test(part)) {
      return part
    }

    const accented = accents.has(normalizeWord(part))

    return (
      <span key={`${part}-${index}`} className={accented ? "text-[var(--p-accent)]" : undefined}>
        {part}
      </span>
    )
  })
}

function ParityMark({ size = "default" }: { size?: "default" | "small" }) {
  return (
    <Link
      href="/lara"
      className={cn(
        "inline-flex items-center gap-2 font-sans font-bold uppercase text-[var(--p-ink)] [letter-spacing:0]",
        size === "small" ? "text-xs" : "text-sm"
      )}
    >
      <span className="size-1.5 rounded-full bg-[var(--p-accent)] shadow-[0_0_18px_color-mix(in_srgb,var(--p-accent)_60%,transparent)]" />
      <span>Parity</span>
    </Link>
  )
}

function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[10px] font-medium uppercase text-[var(--p-accent)] [letter-spacing:0]",
        center && "justify-center"
      )}
    >
      <span className="h-px w-7 bg-[var(--p-accent)]" />
      <span>{children}</span>
      {center ? <span className="h-px w-7 bg-[var(--p-accent)]" /> : null}
    </div>
  )
}

function CTAButton({
  children,
  size = "lg",
}: {
  children: ReactNode
  size?: "sm" | "lg"
}) {
  return (
    <Button
      render={<a href="#join" />}
      nativeButton={false}
      className={cn(
        "!h-auto rounded-full !bg-[var(--p-cta-bg)] !text-[var(--p-cta-text)] shadow-none hover:opacity-90",
        "border border-transparent [letter-spacing:0]",
        size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
      )}
    >
      <span>{children}</span>
      <ArrowRight data-icon="inline-end" className="size-4" />
    </Button>
  )
}

function Nav({ theme }: { theme: PersonaTheme }) {
  return (
    <div className="sticky top-0 z-50 border-b border-transparent bg-[color-mix(in_srgb,var(--p-bg)_85%,transparent)] backdrop-blur-md transition-colors">
      <header className="mx-auto grid w-full min-w-0 max-w-[1440px] grid-cols-[1fr_auto] items-center gap-6 px-6 py-5 sm:px-10 lg:grid-cols-[1fr_auto_1fr] lg:px-16 xl:px-[88px]">
        <ParityMark />
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--p-ink-soft)] transition-colors hover:text-[var(--p-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-4">
          <CTAButton size="sm">{theme.cta}</CTAButton>
        </div>
      </header>
    </div>
  )
}

function CropMarks() {
  return (
    <>
      <span className="absolute left-2 top-2 size-3 border-l border-t border-[var(--p-ink)] opacity-35" />
      <span className="absolute right-2 top-2 size-3 border-r border-t border-[var(--p-ink)] opacity-35" />
      <span className="absolute bottom-2 left-2 size-3 border-b border-l border-[var(--p-ink)] opacity-35" />
      <span className="absolute bottom-2 right-2 size-3 border-b border-r border-[var(--p-ink)] opacity-35" />
    </>
  )
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--p-ink-line)] py-3 last:border-b-0">
      <span className="text-xs text-[var(--p-ink-mute)]">{label}</span>
      <span className="font-mono text-xs font-semibold text-[var(--p-ink)]">{value}</span>
    </div>
  )
}

function PortfolioMock() {
  const bars = [54, 72, 38, 86, 64, 46]

  return (
    <div className="flex min-h-56 flex-col justify-center gap-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-3 w-28 rounded-full bg-[color-mix(in_srgb,var(--p-ink)_18%,transparent)]" />
          <div className="mt-3 h-2 w-44 rounded-full bg-[color-mix(in_srgb,var(--p-ink)_10%,transparent)]" />
        </div>
        <Badge className="h-auto rounded-full border border-[var(--p-ink-line)] bg-transparent px-3 py-1 text-[10px] uppercase text-[var(--p-ink-mute)] [letter-spacing:0]">
          6 startups
        </Badge>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["AI", "Bio", "Clean", "Fin"].map((item) => (
          <div
            key={item}
            className="rounded-[6px] border border-[var(--p-ink-line)] px-2 py-3 text-center font-mono text-[10px] text-[var(--p-ink-soft)]"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex h-28 items-end gap-3 border-t border-[var(--p-ink-line)] pt-5">
        {bars.map((height, index) => (
          <div
            key={height}
            className={cn(
              "w-full rounded-t-[3px]",
              index % 2 ? "bg-[var(--p-accent)]" : "bg-[color-mix(in_srgb,var(--p-ink)_16%,transparent)]"
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function OrderBookMock() {
  const rows = [
    ["Buy", "€240", "42"],
    ["Buy", "€218", "16"],
    ["Sell", "€260", "8"],
    ["Sell", "€275", "21"],
  ]

  return (
    <div className="flex min-h-56 flex-col justify-center gap-4">
      <div className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase text-[var(--p-ink-mute)] [letter-spacing:0]">
        <span>Side</span>
        <span>Price</span>
        <span>Shares</span>
      </div>
      <div className="divide-y divide-[var(--p-ink-line)] rounded-[8px] border border-[var(--p-ink-line)]">
        {rows.map(([side, price, shares], index) => (
          <div
            key={`${side}-${price}-${shares}`}
            className="grid grid-cols-3 gap-2 px-3 py-3 text-xs text-[var(--p-ink-soft)]"
          >
            <span className={index === 2 ? "text-[var(--p-accent)]" : undefined}>{side}</span>
            <span className="font-mono text-[var(--p-ink)]">{price}</span>
            <span className="font-mono">{shares}</span>
          </div>
        ))}
      </div>
      <div className="h-2 rounded-full bg-[color-mix(in_srgb,var(--p-ink)_12%,transparent)]">
        <div className="h-full w-7/12 rounded-full bg-[var(--p-accent)]" />
      </div>
    </div>
  )
}

function ChartMock() {
  const points = [38, 52, 44, 68, 59, 84, 76, 92]

  return (
    <div className="flex min-h-56 flex-col justify-center gap-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-3 w-32 rounded-full bg-[color-mix(in_srgb,var(--p-ink)_18%,transparent)]" />
          <div className="mt-3 h-2 w-48 rounded-full bg-[color-mix(in_srgb,var(--p-ink)_10%,transparent)]" />
        </div>
        <TrendingUp className="size-5 text-[var(--p-accent)]" />
      </div>
      <div className="flex h-36 items-end gap-2 rounded-[8px] border border-[var(--p-ink-line)] p-4">
        {points.map((height, index) => (
          <div
            key={`${height}-${index}`}
            className={cn(
              "w-full rounded-t-[3px]",
              index === points.length - 1
                ? "bg-[var(--p-accent)]"
                : "bg-[color-mix(in_srgb,var(--p-ink)_14%,transparent)]"
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 text-[10px] uppercase text-[var(--p-ink-mute)] [letter-spacing:0]">
        <span>Updates</span>
        <span>Metrics</span>
        <span>Trades</span>
      </div>
    </div>
  )
}

function DealMock({ theme }: { theme: PersonaTheme }) {
  const Icon = theme.key === "bob" ? Radio : theme.key === "johann" ? BarChart3 : Layers3

  return (
    <div className="flex min-h-64 min-w-0 flex-col justify-between gap-6 sm:min-h-72">
      <div className="flex min-w-0 items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase text-[var(--p-ink-mute)] [letter-spacing:0]">
            {theme.name} view
          </div>
          <div className={cn("mt-3 text-2xl leading-tight text-[var(--p-ink)]", displayClass[theme.display])}>
            {theme.key === "bob" ? "Live round signal" : theme.key === "johann" ? "Private-market thesis" : "Research-ready deal"}
          </div>
        </div>
        <div className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--p-ink-line)] text-[var(--p-accent)]">
          <Icon className="size-5" />
        </div>
      </div>

      <div className="grid gap-1 rounded-[8px] border border-[var(--p-ink-line)] px-4">
        <MetricRow label="Minimum" value="€200" />
        <MetricRow label="Ownership" value="Real equity" />
        <MetricRow label="Liquidity" value="Secondary" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {theme.proofPoints.map((point) => (
          <div
            key={point}
            className="rounded-[8px] border border-[var(--p-ink-line)] bg-[color-mix(in_srgb,var(--p-surface)_88%,transparent)] p-3"
          >
            <div className="mb-2 size-1.5 rounded-full bg-[var(--p-accent)]" />
            <div className="text-[11px] leading-snug text-[var(--p-ink-soft)]">{point}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VisualMock({
  variant,
  theme,
}: {
  variant: VisualVariant
  theme: PersonaTheme
}) {
  if (variant === "portfolio") {
    return <PortfolioMock />
  }

  if (variant === "orderbook") {
    return <OrderBookMock />
  }

  if (variant === "chart") {
    return <ChartMock />
  }

  return <DealMock theme={theme} />
}

function ProductFrame({
  label,
  sub,
  variant,
  theme,
  hero = false,
}: {
  label: string
  sub: string
  variant: VisualVariant
  theme: PersonaTheme
  hero?: boolean
}) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-[8px] border border-[var(--p-ink-line)] bg-[var(--p-surface)] p-0 py-0 text-[var(--p-ink)] ring-0",
        "w-full min-w-0",
        "shadow-[0_40px_90px_-60px_color-mix(in_srgb,var(--p-accent)_70%,black)]",
        hero ? "min-h-[460px]" : "min-h-[420px]"
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 12px, var(--p-stripe) 12px 13px)",
        }}
      />
      <CropMarks />
      <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between font-mono text-[9px] uppercase text-[var(--p-ink-mute)] [letter-spacing:0] sm:inset-x-5">
        <span>[ product ]</span>
        <span>{hero ? "DEAL ROOM" : "UI MOCK"}</span>
      </div>
      <div className="relative m-5 flex min-h-[calc(100%-40px)] min-w-0 flex-col gap-5 rounded-[8px] border border-dashed border-[color-mix(in_srgb,var(--p-ink)_14%,transparent)] p-4 sm:m-11 sm:min-h-[calc(100%-88px)] sm:p-6">
        <Badge className="h-auto w-fit rounded-full border border-[var(--p-ink-line)] bg-transparent px-3 py-1 font-mono text-[10px] uppercase text-[var(--p-ink-mute)] [letter-spacing:0]">
          <span className="size-1.5 rounded-full bg-[var(--p-accent)]" />
          Product UI
        </Badge>
        <div className="flex-1">
          <VisualMock variant={variant} theme={theme} />
        </div>
        <div className="flex min-w-0 items-center justify-between gap-4 border-t border-[color-mix(in_srgb,var(--p-ink)_14%,transparent)] pt-4 font-mono text-[10px] font-semibold uppercase text-[var(--p-ink)] [letter-spacing:0]">
          <span className="min-w-0 truncate">{label}</span>
          <span className="shrink-0 font-normal text-[var(--p-ink-mute)]">{sub}</span>
        </div>
      </div>
    </Card>
  )
}

function Hero({ theme }: { theme: PersonaTheme }) {
  return (
    <section className="relative overflow-hidden bg-[var(--p-bg)] px-6 pb-20 pt-10 sm:px-10 lg:px-16 lg:pb-24 xl:px-[88px]">
      {theme.dark ? (
        <div className="pointer-events-none absolute -right-44 -top-56 size-[680px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--p-accent)_22%,transparent)_0%,transparent_62%)]" />
      ) : null}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-12">
          <Eyebrow>{theme.eyebrow}</Eyebrow>
        </div>

        <div className="grid min-w-0 grid-cols-1 items-center gap-14 lg:grid-cols-[1.32fr_0.88fr] xl:gap-20">
          <div className="min-w-0">
            <h1
              className={cn(
                "max-w-5xl text-balance leading-[1.02] text-[var(--p-ink)] [letter-spacing:0]",
                heroTitleSizeClass[theme.display],
                displayClass[theme.display]
              )}
            >
              {theme.title.map((line) => (
                <span key={line} className="block">
                  <AccentLine line={line} accentWords={theme.titleAccentWords} />
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--p-ink-soft)] sm:text-lg">
              {theme.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CTAButton>{theme.cta}</CTAButton>
            </div>
          </div>
          <div className="min-w-0">
            <PhoneScrollPreview theme={theme} />
          </div>
        </div>

        <div className="mt-16 grid border-t border-[var(--p-ink-line)] pt-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "border-[var(--p-ink-line)] py-5 sm:px-7 sm:py-0",
                index > 0 && "border-t sm:border-l sm:border-t-0",
                index === 0 && "sm:pl-0"
              )}
            >
              <div className="font-mono text-[10px] uppercase text-[var(--p-ink-mute)] [letter-spacing:0]">
                {stat.label}
              </div>
              <div className={cn("mt-2 text-2xl leading-tight text-[var(--p-ink)]", displayClass[theme.display])}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PersonaBrief({ theme }: { theme: PersonaTheme }) {
  return (
    <section id="about" className="border-t border-[var(--p-ink-line)] bg-[var(--p-bg)] px-6 py-12 sm:px-10 lg:px-16 xl:px-[88px]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
        <div>
          <Eyebrow>Persona strategy</Eyebrow>
          <h2 className={cn("mt-6 text-3xl leading-tight text-[var(--p-ink)] sm:text-4xl", displayClass[theme.display])}>
            {theme.tagline}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-3xl text-base leading-8 text-[var(--p-ink-soft)]">{theme.personaNote}</p>
          <div className="flex flex-wrap gap-2">
            {theme.proofPoints.map((point) => (
              <Badge
                key={point}
                className="h-auto rounded-full border border-[var(--p-ink-line)] bg-[color-mix(in_srgb,var(--p-surface)_80%,transparent)] px-3 py-1.5 text-xs text-[var(--p-ink-soft)]"
              >
                {point}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureSection({
  theme,
  section,
  flip,
  id,
}: {
  theme: PersonaTheme
  section: PersonaSection
  flip: boolean
  id: string
}) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-[var(--p-ink-line)] bg-[var(--p-bg)] px-6 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-[88px]"
    >
      <div
        className={cn(
          "pointer-events-none absolute top-14 text-[160px] leading-none text-[var(--p-ink)] opacity-[0.045] sm:text-[220px]",
          displayClass[theme.display],
          flip ? "right-4" : "left-4"
        )}
      >
        {section.num}
      </div>
      <div
        className={cn(
          "relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 lg:gap-20",
          flip ? "lg:grid-cols-[1fr_1.05fr]" : "lg:grid-cols-[1.05fr_1fr]"
        )}
      >
        <div className={cn("max-w-xl", flip && "lg:order-2")}>
          <Eyebrow>
            {section.num} / {section.label}
          </Eyebrow>
          <h2
            className={cn(
              "mt-7 text-balance text-4xl leading-tight text-[var(--p-ink)] [letter-spacing:0] sm:text-5xl lg:text-6xl",
              displayClass[theme.display]
            )}
          >
            {section.title}
          </h2>
          <p className="mt-7 text-base leading-8 text-[var(--p-ink-soft)]">{section.body}</p>
        </div>
        <div className={cn("min-w-0", flip && "lg:order-1")}>
          <ProductFrame label={section.imageLabel} sub={section.num} variant={section.variant} theme={theme} />
        </div>
      </div>
    </section>
  )
}

function ClosingCTA({ theme }: { theme: PersonaTheme }) {
  return (
    <section
      id="join"
      className="relative overflow-hidden bg-[var(--p-bg-alt)] px-6 py-24 text-center sm:px-10 lg:px-16 lg:py-36 xl:px-[88px]"
    >
      {theme.dark ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,color-mix(in_srgb,var(--p-accent)_28%,transparent)_0%,transparent_62%)]" />
      ) : null}
      <div className="pointer-events-none absolute inset-6 border border-[var(--p-ink-line)] sm:inset-8" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-9 flex justify-center">
          <ParityMark size="small" />
        </div>
        <h2
          className={cn(
            "text-balance text-5xl leading-none text-[var(--p-ink)] [letter-spacing:0] sm:text-6xl lg:text-8xl",
            displayClass[theme.display]
          )}
        >
          {theme.closingTitle.map((line, index) => (
            <span key={line} className="block">
              {index === theme.closingTitle.length - 1 ? (
                <AccentLine line={line} accentWords={[line.split(" ").at(-1) ?? ""]} />
              ) : (
                line
              )}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[var(--p-ink-soft)] sm:text-lg">
          {theme.closingSub}
        </p>
        <div className="mt-10">
          <CTAButton>{theme.closingCta}</CTAButton>
        </div>
      </div>
    </section>
  )
}

function Footer({ theme }: { theme: PersonaTheme }) {
  return (
    <footer className="border-t border-[var(--p-ink-line)] bg-[var(--p-bg)] px-6 py-8 sm:px-10 lg:px-16 xl:px-[88px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 text-xs text-[var(--p-ink-mute)]">
        <ParityMark size="small" />
        <p className="max-w-3xl leading-6">
          Parity is a concept landing page for a private-market investing platform.
          Private startup investments are high-risk, and may result in total loss of capital.
          This page is not investment advice and does not constitute an offer to sell securities.
        </p>
      </div>
    </footer>
  )
}

const mobileNavItems = [
  { label: "Start\nKit", href: "#startkit", Icon: Layers3 },
  { label: "Secondary\nMarket", href: "#secondary", Icon: ArrowLeftRight },
  { label: "After\nInvestment", href: "#track", Icon: TrendingUp },
]

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 lg:hidden">
      <div className="flex w-[min(340px,calc(100vw-2rem))] items-stretch rounded-2xl border border-[var(--p-ink-line)] bg-[color-mix(in_srgb,var(--p-bg)_92%,transparent)] shadow-2xl backdrop-blur-md">
        {mobileNavItems.map(({ label, href, Icon }, i) => (
          <a
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-2 py-3.5 text-[var(--p-ink-soft)] transition-colors hover:text-[var(--p-ink)]",
              i === 0 && "rounded-l-2xl",
              i === mobileNavItems.length - 1 && "rounded-r-2xl",
              i > 0 && "border-l border-[var(--p-ink-line)]"
            )}
          >
            <Icon className="size-[18px]" />
            <span className="whitespace-pre-line text-center font-mono text-[10px] font-medium leading-tight uppercase [letter-spacing:0]">
              {label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export function PersonaLanding({ theme }: { theme: PersonaTheme }) {
  return (
    <div style={themeVars(theme)} className="min-h-screen bg-[var(--p-bg)] text-[var(--p-ink)]">
      <div className="h-[3px] bg-[var(--p-accent)]" />
      <Nav theme={theme} />
      <main className="overflow-x-hidden">
        <Hero theme={theme} />
        {theme.sections.map((section, index) => (
          <FeatureSection
            key={section.num}
            theme={theme}
            section={section}
            flip={index % 2 === 1}
            id={sectionIds[index] ?? section.label.toLowerCase()}
          />
        ))}
        <ClosingCTA theme={theme} />
      </main>
      <Footer theme={theme} />
      <MobileBottomNav />
    </div>
  )
}
