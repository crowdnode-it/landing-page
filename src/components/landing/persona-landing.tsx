import Link from "next/link"
import { ArrowLeftRight, ArrowRight, BadgeEuro, ChevronDown, FileText, Landmark, LockKeyhole, Scale, Users } from "lucide-react"
import type { CSSProperties } from "react"

import { CTAButton } from "@/components/landing/cta-button"
import { HashScroll } from "@/components/landing/hash-scroll"
import { NavWrapper } from "@/components/landing/nav-wrapper"
import { WaitlistForm } from "@/components/landing/waitlist-form"
import { ValueProps } from "@/components/landing/value-props"
import { cn } from "@/lib/utils"
import type { PersonaTheme } from "@/lib/personas"
import { PageAnalytics } from "@/components/analytics/page-analytics"

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
  { label: "Value Proposition", href: "#value" },
  { label: "Who we are", href: "#who-we-are" },
]


function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "")

  if (normalized.length !== 6) {
    return null
  }

  const value = Number.parseInt(normalized, 16)

  if (Number.isNaN(value)) {
    return null
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function withAlpha(hex: string, alpha: number) {
  const rgb = hexToRgb(hex)

  if (!rgb) {
    return hex
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
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
      <span key={`${part}-${index}`} className={accented ? "bsp-serif text-[var(--p-accent)]" : undefined}>
        {part}
      </span>
    )
  })
}

function HeroTitle({ theme }: { theme: PersonaTheme }) {
  return (
    <>
      {theme.title.map((line) => (
        <span key={line} className="block text-balance">
          <AccentLine line={line} accentWords={theme.titleAccentWords} />
        </span>
      ))}
    </>
  )
}

function ParityMark({ size = "default", href }: { size?: "default" | "small"; href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.025em] text-[var(--p-ink)]",
        size === "small" ? "text-xs" : "text-sm"
      )}
    >
      <span className="size-1.5 rounded-full bg-[var(--p-accent)] shadow-[0_0_18px_color-mix(in_srgb,var(--p-accent)_60%,transparent)]" />
      <span>Parity</span>
    </Link>
  )
}

function Nav({ theme }: { theme: PersonaTheme }) {
  return (
    <NavWrapper
      background={withAlpha(theme.colors.bg, theme.dark ? 0.88 : 0.92)}
      border={withAlpha(theme.colors.ink, theme.dark ? 0.12 : 0.14)}
    >
      <header className="mx-auto grid h-16 w-full min-w-0 max-w-[1440px] grid-cols-[1fr_auto] items-center gap-6 px-6 sm:px-10 md:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-16 xl:px-[88px]">
        <ParityMark href="#hero" />
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-track-nav={item.href.replace("#", "")}
              data-track-nav-type="top_desktop"
              className="text-[16px]/[1.3] font-medium tracking-[-0.02em] text-[var(--p-ink-soft)] transition-colors hover:text-[var(--p-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-4">
          <CTAButton size="sm">{theme.cta}</CTAButton>
        </div>
      </header>
    </NavWrapper>
  )
}


function Hero({ theme }: { theme: PersonaTheme }) {
  return (
    <section
      id="hero"
      data-section="hero"
      className="relative grid min-h-svh place-items-center overflow-hidden bg-[var(--p-bg)] px-6 pb-48 pt-28 text-center sm:px-10 lg:px-16 lg:pb-36 xl:px-[88px]"
    >
      <div className="pointer-events-none absolute left-1/2 top-[45%] size-[min(900px,126vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--p-accent)_24%,transparent)_0%,color-mix(in_srgb,var(--p-accent)_10%,transparent)_32%,transparent_66%)] blur-2xl" />
      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center">
        <h1 className="bsp-display mx-auto max-w-[1080px] overflow-visible text-[var(--p-ink)]">
          <HeroTitle theme={theme} />
        </h1>
        <p className="bsp-body mx-auto mt-8 max-w-[720px] text-[color-mix(in_srgb,var(--p-ink)_84%,var(--p-ink-soft))] md:mt-10">
          {theme.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#join"
            data-track-nav="join"
            data-track-nav-type="hero_primary"
            className="bsp-pill border-transparent bg-[var(--p-cta-bg)] text-[var(--p-cta-text)] hover:opacity-90 active:scale-[0.98]"
          >
            <span>Invest</span>
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#value"
            data-track-nav="value"
            data-track-nav-type="hero_secondary"
            className="bsp-pill show-more-motion border-[color-mix(in_srgb,var(--p-accent)_60%,transparent)] text-[var(--p-ink)] hover:border-[var(--p-accent)] hover:bg-[color-mix(in_srgb,var(--p-accent)_12%,transparent)]"
          >
            <span>Show more</span>
            <ChevronDown className="size-4" />
          </a>
        </div>

      </div>
      <TrustCarousel className="absolute inset-x-0 bottom-24 z-10 sm:bottom-28 lg:bottom-0" />
    </section>
  )
}


const founders = [
  { name: "Antonio De Cinque", role: "Product & Design", initials: "AD", photo: "/founders/antonio.jpeg", linkedin: "https://www.linkedin.com/in/antonio-de-cinque/", phrase: "Turns product vision into experiences that feel functional and beautiful." },
  { name: "Bruno Carchia", role: "Strategy & Operations", initials: "BC", photo: "/founders/bruno.jpeg", linkedin: "https://www.linkedin.com/in/bruno-carchia/", phrase: "Drives Parity's organization and technical execution from Stockholm." },
  { name: "Matteo Camellini", role: "AI & Engineering", initials: "MC", photo: "/founders/matteo.jpg", linkedin: "https://www.linkedin.com/in/matteo-camellini-209a28244/", phrase: "Builds the models behind the markets, from neural nets to quant finance." },
  { name: "Giangiacomo Zanni", role: "Finance & Markets", initials: "GZ", photo: null, linkedin: "https://www.linkedin.com/in/giangiacomo-zanni/", phrase: "Brings structured-finance discipline from BNP Paribas Asset Management." },
]

const trustMarks = [
  { label: "€200 minimum", Icon: BadgeEuro },
  { label: "MiFID II framework", Icon: Scale },
  { label: "EU-regulated real equity", Icon: Landmark },
  { label: "Segregated custody", Icon: LockKeyhole },
  { label: "Exit when you choose", Icon: ArrowLeftRight },
  { label: "Transparent reporting", Icon: FileText },
]

function TrustCarousel({ className }: { className?: string }) {
  const marks = [...trustMarks, ...trustMarks, ...trustMarks]

  return (
    <div className={cn("border-y border-[var(--p-ink-line)] bg-[color-mix(in_srgb,var(--p-surface)_24%,transparent)] px-0", className)} aria-label="Trust indicators">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="trust-carousel-track flex w-max items-center gap-10 px-8 py-4 sm:gap-14">
          {marks.map(({ label, Icon }, index) => (
            <div
              key={`${label}-${index}`}
              className="flex shrink-0 items-center gap-3"
            >
              <Icon className="size-[22px] shrink-0 text-[var(--p-accent)]" />
              <span className="bsp-mono-label whitespace-nowrap text-[12px] uppercase text-[var(--p-ink-soft)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Founders() {
  return (
    <section id="who-we-are" data-section="who-we-are" className="scroll-mt-0 border-t border-[var(--p-ink-line)] bg-[var(--p-bg)] px-6 py-20 sm:px-10 md:py-[7.5rem] lg:px-16 xl:px-[88px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <h2 className="bsp-section-title text-[var(--p-ink)]">
            Who we are
          </h2>
          <p className="bsp-section-subtitle mt-4 max-w-2xl text-[var(--p-ink-soft)]">
            Four founders building accessible private markets.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4 lg:gap-10">
          {founders.map((f) => (
            <div
              key={f.initials}
              className="group flex flex-col items-start text-left"
            >
              <div className="mb-5 size-[88px] overflow-hidden rounded-full border border-[var(--p-ink-line)] bg-[var(--p-surface)] transition-colors group-hover:border-[var(--p-accent)] sm:size-24">
                {f.photo ? (
                  <img src={f.photo} alt={f.name} className="size-full object-cover" />
                ) : (
                  <div className="grid size-full place-items-center bg-[var(--p-surface)] font-sans text-xl font-bold text-[var(--p-ink-mute)] group-hover:text-[var(--p-accent)]">
                    {f.initials}
                  </div>
                )}
              </div>
              <div className="text-[17px]/[1.3] font-medium tracking-[-0.02em] text-[var(--p-ink)]">{f.name}</div>
              <div className="bsp-mono-label mt-1 text-[11px] uppercase text-[var(--p-ink-mute)]">{f.role}</div>
              <div className="mt-3 text-[14px]/[1.3] tracking-[-0.02em] text-[var(--p-ink-soft)]">{f.phrase}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA({
  theme,
  initialWaitlistSubmitted = false,
}: {
  theme: PersonaTheme
  initialWaitlistSubmitted?: boolean
}) {
  return (
    <section
      id="join"
      data-section="join"
      className="relative scroll-mt-0 overflow-hidden bg-[var(--p-bg-alt)] px-6 py-20 text-center sm:px-10 md:py-[7.5rem] lg:px-16 xl:px-[88px]"
    >
      {theme.dark ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,color-mix(in_srgb,var(--p-accent)_28%,transparent)_0%,transparent_62%)]" />
      ) : null}
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-9 flex justify-center">
          <ParityMark size="small" href="#hero" />
        </div>
        <h2 className="bsp-display text-[var(--p-ink)]">
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
        <p className="bsp-body mx-auto mt-8 max-w-[520px] text-[var(--p-ink-mute)]">
          {theme.closingSub}
        </p>
        <div className="mt-10">
          <WaitlistForm
            centered
            persona={theme.key}
            initialSubmitted={initialWaitlistSubmitted}
          />
        </div>
      </div>
    </section>
  )
}

function Footer({ theme }: { theme: PersonaTheme }) {
  return (
    <footer className="bg-[var(--p-bg)] px-6 pb-32 pt-12 sm:px-10 lg:px-16 lg:py-12 xl:px-[88px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 text-xs text-[var(--p-ink-mute)]">
        <ParityMark size="small" href="#hero" />
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
  { label: "How it\nworks", href: "#value", Icon: BadgeEuro },
  { label: "Who\nwe are", href: "#who-we-are", Icon: Users },
  { label: "Invest", href: "#join", Icon: ArrowRight },
]

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 lg:hidden">
      <div className="flex w-[min(340px,calc(100vw-2rem))] items-stretch rounded-[22px] border border-[var(--p-ink-line)] bg-[color-mix(in_srgb,var(--p-bg)_88%,transparent)] shadow-[0_8px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl">
        {mobileNavItems.map(({ label, href, Icon }, i) => (
          <a
            key={href}
            href={href}
            data-track-nav={href.replace("#", "")}
            data-track-nav-type="mobile_pill"
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-2 py-3.5 text-[var(--p-ink-soft)] transition-colors hover:text-[var(--p-ink)]",
              i === 0 && "rounded-l-[22px]",
              i === mobileNavItems.length - 1 && "rounded-r-[22px]",
              i > 0 && "border-l border-[var(--p-ink-line)]"
            )}
          >
            <Icon className="size-[18px]" />
            <span className="bsp-mono-label whitespace-pre-line text-center text-[10px] leading-tight uppercase">
              {label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export function PersonaLanding({
  theme,
  initialWaitlistSubmitted = false,
}: {
  theme: PersonaTheme
  initialWaitlistSubmitted?: boolean
}) {
  return (
    <div style={{ ...themeVars(theme), background: theme.colors.bg }} className="min-h-screen bg-[var(--p-bg)] text-[var(--p-ink)]">
      <style>{`html,body{background-color:${theme.colors.bg}}`}</style>
      <PageAnalytics persona={theme.key} />
      <HashScroll />
      <Nav theme={theme} />
      <main className="overflow-x-hidden">
        <Hero theme={theme} />
        <ValueProps persona={theme.key} />
        <Founders />
        <ClosingCTA
          theme={theme}
          initialWaitlistSubmitted={initialWaitlistSubmitted}
        />
      </main>
      <Footer theme={theme} />
      {/* <MobileBottomNav /> */}
    </div>
  )
}
