import Link from "next/link"
import { ArrowLeftRight, Layers3, TrendingUp } from "lucide-react"
import type { CSSProperties, ReactNode } from "react"

import { CTAButton } from "@/components/landing/cta-button"
import { PhoneScrollPreview } from "@/components/landing/phone-scroll-preview"
import { HashScroll } from "@/components/landing/hash-scroll"
import { NavWrapper } from "@/components/landing/nav-wrapper"
import { WaitlistForm } from "@/components/landing/waitlist-form"
import { RotatingText } from "@/components/landing/rotating-text"
import { StartKit } from "@/components/graphics/start-kit"
import { AfterInvestment } from "@/components/graphics/after-investment"
import { SecondaryMarket } from "@/components/graphics/secondary-market"
import type { GraphicPalette } from "@/components/graphics/types"
import { cn } from "@/lib/utils"
import type { DisplayStyle, PersonaSection, PersonaTheme, VisualVariant } from "@/lib/personas"
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
  { label: "Who we are", href: "#who-we-are" },
  { label: "StartKit", href: "#startkit" },
  { label: "Secondary Market", href: "#secondary" },
  { label: "After Investment", href: "#track" },
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

function HeroTitle({ theme }: { theme: PersonaTheme }) {
  const rollingLineIndex = theme.title.findIndex((line) =>
    line.split(/\s+/).some((word) => normalizeWord(word) === normalizeWord(theme.rollingWord))
  )
  const lines: ReactNode[] = []

  for (let lineIndex = 0; lineIndex < theme.title.length; lineIndex += 1) {
    const line = theme.title[lineIndex]

    if (lineIndex !== rollingLineIndex) {
      lines.push(
        <span key={line} className="block text-balance">
          {line}
        </span>
      )
      continue
    }

    const restOfLine = line
      .split(/\s+/)
      .filter((word) => normalizeWord(word) !== normalizeWord(theme.rollingWord))
      .join(" ")
    const nextLine = theme.title[lineIndex + 1]
    const balancedLine = [restOfLine, nextLine].filter(Boolean).join(" ")

    lines.push(
      <span key={`${line}-rolling`} className="block text-[var(--p-accent)]">
        <RotatingText words={theme.rollingOptions} />
      </span>
    )

    if (balancedLine) {
      lines.push(
        <span key={`${line}-balanced`} className="block text-balance">
          {balancedLine}
        </span>
      )
      if (nextLine) {
        lineIndex += 1
      }
    }
  }

  return <>{lines}</>
}

function ParityMark({ size = "default", href }: { size?: "default" | "small"; href: string }) {
  return (
    <Link
      href={href}
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


function Nav({ theme }: { theme: PersonaTheme }) {
  return (
    <NavWrapper>
      <header className="mx-auto grid w-full min-w-0 max-w-[1440px] grid-cols-[1fr_auto] items-center gap-6 px-6 py-5 sm:px-10 lg:grid-cols-[1fr_auto_1fr] lg:px-16 xl:px-[88px]">
        <ParityMark href={`/${theme.key}`} />
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-track-nav={item.href.replace("#", "")}
              data-track-nav-type="top_desktop"
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
    </NavWrapper>
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
      <div className="relative w-full overflow-hidden rounded-2xl">
        {graphic}
      </div>
    </div>
  )
}

function Hero({ theme }: { theme: PersonaTheme }) {
  return (
    <section data-section="hero" className="relative bg-[var(--p-bg)] px-6 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-16 lg:pb-16 lg:pt-32 xl:px-[88px]">
      {theme.dark ? (
        <div className="pointer-events-none absolute -right-44 -top-56 size-[680px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--p-accent)_22%,transparent)_0%,transparent_62%)]" />
      ) : null}
      <div className="mx-auto w-full max-w-[1440px]">

        <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[1.32fr_0.88fr] xl:gap-14">
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              className={cn(
                "mx-auto max-w-[800px] overflow-hidden text-balance font-black text-[var(--p-ink)] [letter-spacing:-0.04em] [line-height:1.05] lg:mx-0",
                heroTitleSizeClass[theme.display],
                displayClass[theme.display]
              )}
            >
              <HeroTitle theme={theme} />
            </h1>
            <p className="mx-auto mt-8 max-w-[460px] text-[0.95rem] font-normal leading-[1.75] text-[var(--p-ink-soft)] lg:mx-0">
              {theme.subtitle}
            </p>
            <div className="mx-auto mt-9 w-full max-w-xl lg:mx-0">
              <WaitlistForm persona={theme.key} formLocation="hero" />
            </div>
          </div>
          <div className="relative flex min-w-0 justify-center overflow-visible [zoom:0.75]">
            <div className="absolute -inset-8 rounded-3xl opacity-25 blur-[60px]" style={{ background: `var(--p-accent)` }} />
            <div className="relative inline-flex">
              <PhoneScrollPreview theme={theme} />
              {/* Floating stat cards */}
              <div
                className="absolute -left-10 top-[18%] z-10 rounded-2xl border border-[var(--p-ink-line)] px-4 py-3 sm:-left-24 sm:px-4 sm:py-3 lg:-left-36 lg:px-5 lg:py-4"
                style={{
                  background: "color-mix(in srgb, var(--p-bg) 80%, transparent)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p-ink-mute)] sm:text-[10px] sm:tracking-[0.14em] lg:text-[12px] lg:tracking-[0.16em]">Exit</div>
                <div className="mt-1.5 font-sans text-2xl font-extrabold leading-none [letter-spacing:-0.03em] text-[var(--p-ink)] lg:text-3xl">When you choose</div>
              </div>
              <div
                className="absolute -right-4 top-[42%] z-10 rounded-2xl border border-[var(--p-ink-line)] px-4 py-3 sm:-right-14 sm:px-4 sm:py-3 lg:-right-20 lg:px-5 lg:py-4"
                style={{
                  background: "color-mix(in srgb, var(--p-bg) 80%, transparent)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p-ink-mute)] sm:text-[10px] sm:tracking-[0.14em] lg:text-[12px] lg:tracking-[0.16em]">EU-regulated</div>
                <div className="mt-1.5 font-sans text-2xl font-extrabold leading-none [letter-spacing:-0.03em] text-[var(--p-ink)] lg:text-3xl">Real equity</div>
              </div>
              <div
                className="absolute -left-4 bottom-[14%] z-10 rounded-2xl border border-[var(--p-ink-line)] px-4 py-3 sm:-left-10 sm:px-4 sm:py-3 lg:-left-16 lg:px-5 lg:py-4"
                style={{
                  background: "color-mix(in srgb, var(--p-bg) 80%, transparent)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--p-ink-mute)] sm:text-[10px] sm:tracking-[0.14em] lg:text-[12px] lg:tracking-[0.16em]">From</div>
                <div className="mt-1.5 font-sans text-2xl font-extrabold leading-none [letter-spacing:-0.03em] text-[var(--p-ink)] lg:text-3xl">€200</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}


const founders = [
  { name: "Antonio De Cinque", role: "Product & Design", initials: "AD", photo: "/founders/antonio.jpeg", linkedin: "https://www.linkedin.com/in/antonio-de-cinque/", desc: "Software Dev Engineer at Amazon Luxembourg, with a Master's in Computer Engineering from Politecnico di Torino. Antonio brings a passion for product vision and crafting experiences that are both functional and beautifully designed." },
  { name: "Bruno Carchia", role: "Strategy & Operations", initials: "BC", photo: "/founders/bruno.jpeg", linkedin: "https://www.linkedin.com/in/bruno-carchia/", desc: "AI and Data Analytics graduate from Politecnico di Torino and KTH Royal Institute of Technology. Currently based in Stockholm, Bruno works as a Software Engineer at Visa while driving the overall organization and technical execution of Parity." },
  { name: "Matteo Camellini", role: "AI & Engineering", initials: "MC", photo: "/founders/matteo.jpg", linkedin: "https://www.linkedin.com/in/matteo-camellini-209a28244/", desc: "With a Bachelor's in Computer Engineering from Politecnico di Milano, Matteo is currently pursuing a Master's in Data Science and Machine Learning at KTH. His interests span neural network architectures, quantitative finance and DJing." },
  { name: "Giangiacomo Zanni", role: "Finance & Markets", initials: "GZ", photo: null, linkedin: "https://www.linkedin.com/in/giangiacomo-zanni/", desc: "Giangiacomo brings expertise in structured finance and data-driven decision making, with a track record in portfolio management at BNP Paribas Asset Management backed by an ESCP MiM with specializations in AI and Applied Data Science." },
]

function Founders() {
  return (
    <section id="who-we-are" data-section="founders" className="scroll-mt-0 border-t border-[var(--p-ink-line)] bg-[var(--p-bg)] px-6 py-12 sm:px-10 lg:px-16 lg:py-16 xl:px-[88px]">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="font-sans text-[clamp(1.8rem,3.2vw,2.5rem)]/[1.12] font-extrabold text-[var(--p-ink)] [letter-spacing:-0.03em]">
          Who we are
        </h2>
        <p className="mt-4 text-[0.95rem] leading-[1.7] text-[var(--p-ink-soft)]">
          Four founders building the infrastructure for accessible private-market investing in Europe.
        </p>
        <div className="mt-14 grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {founders.map((f) => (
            <div
              key={f.initials}
              className="group flex flex-col items-start text-left lg:items-center lg:text-center"
            >
              <div className="mb-5 size-24 overflow-hidden rounded-full border border-[var(--p-ink-line)] transition-colors group-hover:border-[var(--p-accent)] sm:size-28">
                {f.photo ? (
                  <img src={f.photo} alt={f.name} className="size-full object-cover" />
                ) : (
                  <div className="grid size-full place-items-center bg-[var(--p-surface)] font-sans text-xl font-bold text-[var(--p-ink-mute)] group-hover:text-[var(--p-accent)]">
                    {f.initials}
                  </div>
                )}
              </div>
              <div className="font-sans text-[15px] font-semibold text-[var(--p-ink)]">{f.name}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--p-ink-mute)]">{f.role}</div>
              <div className="mt-3 text-[13px] leading-[1.6] text-[var(--p-ink-soft)]">{f.desc}</div>
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
      data-section={id}
      className="relative scroll-mt-0 overflow-hidden border-t border-[var(--p-ink-line)] bg-[var(--p-bg)] px-6 py-16 sm:px-10 lg:px-16 lg:py-24 xl:px-[88px]"
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
      data-section="join"
      className="relative scroll-mt-0 overflow-hidden bg-[var(--p-bg-alt)] px-6 py-16 text-center sm:px-10 lg:px-16 lg:py-24 xl:px-[88px]"
    >
      {theme.dark ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,color-mix(in_srgb,var(--p-accent)_28%,transparent)_0%,transparent_62%)]" />
      ) : null}
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-9 flex justify-center">
          <ParityMark size="small" href={`/${theme.key}`} />
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
          <WaitlistForm centered persona={theme.key} formLocation="closing" />
        </div>
      </div>
    </section>
  )
}

function Footer({ theme }: { theme: PersonaTheme }) {
  return (
    <footer className="bg-[var(--p-bg)] px-6 py-12 sm:px-10 lg:px-16 xl:px-[88px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 text-xs text-[var(--p-ink-mute)]">
        <ParityMark size="small" href={`/${theme.key}`} />
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
    <div style={{ ...themeVars(theme), background: theme.colors.bg }} className="min-h-screen bg-[var(--p-bg)] text-[var(--p-ink)]">
      <style>{`html,body{background-color:${theme.colors.bg}}`}</style>
      <PageAnalytics persona={theme.key} />
      <HashScroll />
      <Nav theme={theme} />
      <main className="overflow-x-hidden">
        <Hero theme={theme} />
        <Founders />

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
