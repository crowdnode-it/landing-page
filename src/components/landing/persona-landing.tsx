import Link from "next/link"
import { ArrowLeftRight, ArrowRight, Layers3, TrendingUp } from "lucide-react"
import type { CSSProperties, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { PhoneScrollPreview } from "@/components/landing/phone-scroll-preview"
import { HashScroll } from "@/components/landing/hash-scroll"
import { WaitlistForm } from "@/components/landing/waitlist-form"
import { StartKit } from "@/components/graphics/start-kit"
import { AfterInvestment } from "@/components/graphics/after-investment"
import { SecondaryMarket } from "@/components/graphics/secondary-market"
import type { GraphicPalette } from "@/components/graphics/types"
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
  serif: "font-sans",
  inter: "font-sans",
  space: "font-sans",
}

const heroTitleSizeClass: Record<DisplayStyle, string> = {
  serif: "text-[clamp(2.4rem,5.8vw,4.8rem)]/[1.05]",
  inter: "text-[clamp(2.4rem,5.8vw,4.8rem)]/[1.05]",
  space: "text-[clamp(2.4rem,5.8vw,4.8rem)]/[1.05]",
}

const sectionIds = ["startkit", "secondary", "track"]

function buildPalette(theme: PersonaTheme): GraphicPalette {
  const dark = !!theme.dark
  return {
    background: theme.colors.bg,
    text: theme.colors.ink,
    accent: theme.colors.accent,
    muted: theme.colors.inkMute,
    panelStroke: theme.colors.inkLine,
    panelFill: theme.colors.surface,
    chipFill: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
    barDark: dark ? "rgba(255,255,255,0.13)" : "#dfe2e8",
    mode: dark ? "dark" : "light",
    lineColors: theme.lineColors,
  }
}

function RichBody({ text }: { text: string }) {
  return text.split("\n\n").map((para, i) => (
    <p key={i} className={i > 0 ? "mt-4" : undefined}>
      {para.split(/(\*\*[^*]+\*\*)/).map((seg, j) =>
        seg.startsWith("**") && seg.endsWith("**") ? (
          <strong key={j} className="font-semibold text-[var(--p-ink)]">
            {seg.slice(2, -2)}
          </strong>
        ) : (
          seg
        )
      )}
    </p>
  ))
}

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
        "inline-flex items-center gap-2 font-sans font-bold uppercase tracking-[0.08em] text-[var(--p-ink)]",
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
        "flex items-center gap-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--p-accent)]",
        center && "justify-center"
      )}
    >
      <span className="size-1.5 rounded-full bg-[var(--p-accent)] opacity-60" />
      <span>{children}</span>
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
        "border border-transparent [letter-spacing:-0.005em]",
        size === "sm" ? "px-4 py-2 text-[0.85rem] font-bold" : "px-6 py-3 text-[0.85rem] font-bold"
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
              className="text-sm font-medium [letter-spacing:-0.02em] text-[var(--p-ink-soft)] transition-colors hover:text-[var(--p-ink)]"
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


function PersonaGraphic({ variant, theme }: { variant: VisualVariant; theme: PersonaTheme }) {
  const palette = buildPalette(theme)
  const isSquare = variant === "portfolio"
  const artW = isSquare ? 1254 : 1448
  const artH = isSquare ? 1254 : 1086

  const graphic =
    variant === "portfolio" ? (
      <StartKit palette={palette} />
    ) : variant === "orderbook" ? (
      <SecondaryMarket palette={palette} />
    ) : variant === "chart" ? (
      <AfterInvestment palette={palette} />
    ) : null

  if (!graphic) return null

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-2xl opacity-40 blur-[55px]" style={{ background: `var(--p-accent)` }} />
      <svg viewBox={`0 0 ${artW} ${artH}`} width="100%" className="relative block rounded-2xl">
        <foreignObject width={artW} height={artH}>
          {graphic}
        </foreignObject>
      </svg>
    </div>
  )
}

function Hero({ theme }: { theme: PersonaTheme }) {
  return (
    <section className="relative overflow-hidden bg-[var(--p-bg)] px-6 pb-24 pt-16 sm:px-10 lg:px-16 lg:pb-32 xl:px-[88px]">
      {theme.dark ? (
        <div className="pointer-events-none absolute -right-44 -top-56 size-[680px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--p-accent)_22%,transparent)_0%,transparent_62%)]" />
      ) : null}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-4">
          <Eyebrow>{theme.eyebrow}</Eyebrow>
        </div>

        <div className="grid min-w-0 grid-cols-1 items-center gap-14 lg:grid-cols-[1.32fr_0.88fr] xl:gap-20">
          <div className="min-w-0">
            <h1
              className={cn(
                "max-w-[800px] overflow-hidden font-black text-[var(--p-ink)] [letter-spacing:-0.04em] [line-height:1.05]",
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
            <p className="mt-8 max-w-[460px] text-[0.95rem] font-normal leading-[1.75] text-[var(--p-ink-mute)]">
              {theme.subtitle}
            </p>
            <div className="mt-9 max-w-xl">
              <WaitlistForm />
            </div>
          </div>
          <div className="relative min-w-0 scale-[0.85] origin-top">
            <div className="absolute inset-4 rounded-3xl opacity-25 blur-[50px]" style={{ background: `var(--p-accent)` }} />
            <div className="relative">
              <PhoneScrollPreview theme={theme} />
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "border-[color-mix(in_srgb,var(--p-ink-line),transparent_40%)] sm:px-8",
                index > 0 && "border-t pt-6 sm:border-l sm:border-t-0 sm:pt-0",
                index === 0 && "sm:pl-0"
              )}
            >
              <div className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--p-ink-mute)]">
                {stat.label}
              </div>
              <div className="mt-2 font-sans text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-none [letter-spacing:-0.03em] text-[var(--p-ink)]">
                {stat.value}
              </div>
            </div>
          ))}
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
      className="relative scroll-mt-20 overflow-hidden border-t border-[var(--p-ink-line)] bg-[var(--p-bg)] px-6 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-[88px]"
    >
      <div
        className={cn(
          "pointer-events-none absolute top-14 text-[160px] font-black leading-none text-[var(--p-ink)] opacity-[0.025] sm:text-[220px]",
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
              "mt-8 text-[clamp(1.8rem,3.2vw,2.5rem)]/[1.12] font-extrabold text-[var(--p-ink)] [letter-spacing:-0.03em]",
              displayClass[theme.display]
            )}
          >
            {section.title}
          </h2>
          <div className="mt-7 text-[0.95rem] font-normal leading-[1.7] text-[var(--p-ink-soft)]">
            <RichBody text={section.body} />
          </div>
        </div>
        <div className={cn("min-w-0", flip && "lg:order-1")}>
          <PersonaGraphic variant={section.variant} theme={theme} />
        </div>
      </div>
    </section>
  )
}

function ClosingCTA({ theme }: { theme: PersonaTheme }) {
  return (
    <section
      id="join"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--p-bg-alt)] px-6 py-28 text-center sm:px-10 lg:px-16 lg:py-40 xl:px-[88px]"
    >
      {theme.dark ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,color-mix(in_srgb,var(--p-accent)_28%,transparent)_0%,transparent_62%)]" />
      ) : null}
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-9 flex justify-center">
          <ParityMark size="small" />
        </div>
        <h2
          className={cn(
            "text-[clamp(2.4rem,5.8vw,4.8rem)]/[1.05] font-black text-[var(--p-ink)] [letter-spacing:-0.04em]",
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
        <p className="mx-auto mt-8 max-w-[460px] text-[0.95rem] font-normal leading-[1.75] text-[var(--p-ink-mute)]">
          {theme.closingSub}
        </p>
        <div className="mt-10">
          <WaitlistForm centered />
        </div>
      </div>
    </section>
  )
}

function Footer({ theme }: { theme: PersonaTheme }) {
  return (
    <footer className="bg-[var(--p-bg)] px-6 py-12 sm:px-10 lg:px-16 xl:px-[88px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 text-xs text-[var(--p-ink-mute)]">
        <ParityMark size="small" />
        <p className="max-w-3xl text-[13px] font-normal leading-[1.8]">
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
      <div className="flex w-[min(340px,calc(100vw-2rem))] items-stretch rounded-[22px] border border-[var(--p-ink-line)] bg-[color-mix(in_srgb,var(--p-bg)_88%,transparent)] shadow-[0_8px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl">
        {mobileNavItems.map(({ label, href, Icon }, i) => (
          <a
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-2 py-3.5 text-[var(--p-ink-soft)] transition-colors hover:text-[var(--p-ink)]",
              i === 0 && "rounded-l-[22px]",
              i === mobileNavItems.length - 1 && "rounded-r-[22px]",
              i > 0 && "border-l border-[var(--p-ink-line)]"
            )}
          >
            <Icon className="size-[18px]" />
            <span className="whitespace-pre-line text-center font-mono text-[10px] font-medium leading-tight uppercase tracking-[0.1em]">
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
      <HashScroll />
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
