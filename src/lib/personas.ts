export type PersonaKey = "lara" | "johann" | "bob"

export type DisplayStyle = "serif" | "inter" | "space"

export type VisualVariant = "deal" | "portfolio" | "orderbook" | "chart"

type PersonaColors = {
  bg: string
  bgAlt: string
  surface: string
  surfaceWarm: string
  ink: string
  inkSoft: string
  inkMute: string
  inkLine: string
  accent: string
  accent2: string
  ctaBg: string
  ctaText: string
}

export type PersonaSection = {
  num: string
  label: string
  title: string
  body: string
  imageLabel: string
  variant: VisualVariant
}

export type PersonaTheme = {
  key: PersonaKey
  name: string
  persona: string
  tagline: string
  display: DisplayStyle
  dark?: boolean
  colors: PersonaColors
  eyebrow: string
  title: string[]
  titleAccentWords: string[]
  subtitle: string
  cta: string
  ctaSecondary: string
  personaNote: string
  proofPoints: string[]
  sections: PersonaSection[]
  closingTitle: string[]
  closingSub: string
  closingCta: string
  lineColors: string[]
  rollingWord: string
  rollingOptions: string[]
}

const SHARED_SUBTITLE =
  "With Parity, everyday people can buy real equity in new startups from €200, and easily sell those shares at any time"

const SECTION_SECONDARY_BODY =
  "Every other startup investment comes with the same fine print: **see you in a decade**. We took that part out.\n\nList your stake on the secondary market and let another investor pick it up, or browse rounds that have already closed and buy in from someone exiting early.\n\nTrades settle on a blockchain, which in practice means: when someone buys your shares, the transfer is **final, instant, and visible** to both of you. No back-office, no paperwork, no waiting."

const SECTION_STARTKIT_LARA =
  "Back the companies you believe in. **All of them.**\n\nStartKit lets you back several in a single transaction: pick the companies, set the weights, and own **real shares** in each.\n\nNo fund manager picking for you. No €25,000 minimum per company. Just your portfolio, built by you."

const SECTION_STARTKIT_JOHANN =
  "Back six startups. Or eight. Or twelve.\n\n**Real diversification** in private markets used to require half a million euros, twenty companies at €25,000 each.\n\nNow you can back six startups with **€1,200** and own a real piece of each one."

const SECTION_AFTER_LARA =
  "Backing a company shouldn't end when the round closes.\n\nMost startup investments **go dark** after the round closes. You wire the money and you wait. We built the opposite: **regular updates** from founders, real performance metrics from the companies you back, and live prices from every trade on our secondary market.\n\nYou'll know what's happening to your money for as long as you hold it."

const SECTION_AFTER_JOHANN =
  "Most startup investments **go dark** after the round closes. You wire the money and you wait.\n\nWe built the opposite: **regular updates** from founders, real performance metrics from the companies you back, and live prices from every trade on our secondary market.\n\nYou'll know what's happening to your money for as long as you hold it."

export const personaKeys = ["lara", "johann", "bob"] as const

export const personas: Record<PersonaKey, PersonaTheme> = {
  lara: {
    key: "lara",
    name: "Lara",
    persona: "The Expert & Pink Quota",
    tagline: "Idea-led. Creative. Community-trust.",
    display: "serif",
    colors: {
      bg: "#0C2222",
      bgAlt: "#194D4A",
      surface: "#194D4A",
      surfaceWarm: "#263836",
      ink: "#F5F0E6",
      inkSoft: "#D7CFBC",
      inkMute: "rgba(245, 240, 230, 0.55)",
      inkLine: "#263836",
      accent: "#D4A373",
      accent2: "#194D4A",
      ctaBg: "#F5F0E6",
      ctaText: "#0C2222",
    },
    eyebrow: "For people who fund ideas",
    title: [
      "Support the ideas",
      "of tomorrow,",
      "powered by the",
      "community of today.",
    ],
    titleAccentWords: ["ideas", "community"],
    subtitle: SHARED_SUBTITLE,
    cta: "Join the Waitlist",
    ctaSecondary: "How it works",
    personaNote:
      "For experts who want to back technology they understand, follow the work closely, and help the right communities form around it.",
    proofPoints: ["Deep project detail", "Founder updates", "Sector communities"],
    sections: [
      {
        num: "01",
        label: "StartKit",
        title: "Back the companies you believe in. All of them.",
        body: SECTION_STARTKIT_LARA,
        imageLabel: "STARTKIT - BASKET BUILDER",
        variant: "portfolio",
      },
      {
        num: "02",
        label: "Secondary Market",
        title: "Sell when you're ready. Not in ten years.",
        body: SECTION_SECONDARY_BODY,
        imageLabel: "SECONDARY MARKET - ORDER BOOK",
        variant: "orderbook",
      },
      {
        num: "03",
        label: "After Investment",
        title: "Stay close to what you back.",
        body: SECTION_AFTER_LARA,
        imageLabel: "FOUNDER UPDATES - LIVE FEED",
        variant: "chart",
      },
    ],
    closingTitle: ["The next startup you", "believe in is waiting."],
    closingSub: "Be there at €200. Stay as long as you want. Sell when you choose.",
    closingCta: "Join the Waitlist",
    lineColors: ["#D4A373", "#7FB6A8", "#B393C9", "#E3935F"],
    rollingWord: "Support",
    rollingOptions: ["Believe in", "Invest in", "Support"],
  },
  johann: {
    key: "johann",
    name: "Johann",
    persona: "The Aspiring VC",
    tagline: "Institutional. Data-led. Status.",
    display: "inter",
    colors: {
      bg: "#F0F2F5",
      bgAlt: "#D5D8DC",
      surface: "#FFFFFF",
      surfaceWarm: "#D5D8DC",
      ink: "#101010",
      inkSoft: "#2A2A2A",
      inkMute: "rgba(16, 16, 16, 0.58)",
      inkLine: "#D5D8DC",
      accent: "#A61B24",
      accent2: "#8C1118",
      ctaBg: "#8C1118",
      ctaText: "#F0F2F5",
    },
    eyebrow: "For the smart money",
    title: [
      "Support the next",
      "great startup.",
      "Sell your stake",
      "when you're ready,",
      "not in ten years.",
    ],
    titleAccentWords: ["startup", "ten", "years"],
    subtitle: SHARED_SUBTITLE,
    cta: "Join the Waitlist",
    ctaSecondary: "See the thesis",
    personaNote:
      "For investors who want the discipline, portfolio logic, and status of private markets without the traditional entry ticket.",
    proofPoints: ["Portfolio construction", "Direct founder signal", "A way out"],
    sections: [
      {
        num: "01",
        label: "Portfolio Builder",
        title: "Real diversification, finally accessible.",
        body: SECTION_STARTKIT_JOHANN,
        imageLabel: "PORTFOLIO BUILDER - ALLOCATION",
        variant: "portfolio",
      },
      {
        num: "02",
        label: "Secondary Market",
        title: "Private equity, liquid at last.",
        body: SECTION_SECONDARY_BODY,
        imageLabel: "SECONDARY MARKET - ORDER BOOK",
        variant: "orderbook",
      },
      {
        num: "03",
        label: "After Investment",
        title: "Track your investment over time.",
        body: SECTION_AFTER_JOHANN,
        imageLabel: "PERFORMANCE - METRICS DASHBOARD",
        variant: "chart",
      },
    ],
    closingTitle: ["The next startup you", "believe in is waiting."],
    closingSub: "Real equity. EU-regulated. From €200. Exit when you choose.",
    closingCta: "Join the Waitlist",
    lineColors: ["#a61b24", "#e07a86", "#9b5fa3", "#e07e3a"],
    rollingWord: "Support",
    rollingOptions: ["Back", "Invest in", "Believe in", "Support"],
  },
  bob: {
    key: "bob",
    name: "Bob",
    persona: "The FOMO Investor",
    tagline: "Catchy. Loud. Hype-aware.",
    display: "space",
    dark: true,
    colors: {
      bg: "#080C14",
      bgAlt: "#101929",
      surface: "#101929",
      surfaceWarm: "#1A2F4C",
      ink: "#F0F8FF",
      inkSoft: "#C8D6E8",
      inkMute: "rgba(240, 248, 255, 0.52)",
      inkLine: "rgba(240, 248, 255, 0.10)",
      accent: "#00F0FF",
      accent2: "#1A2F4C",
      ctaBg: "#00F0FF",
      ctaText: "#080C14",
    },
    eyebrow: "Live now - Europe's new rounds",
    title: ["Europe's best", "startups are", "raising now.", "Get in."],
    titleAccentWords: ["now", "in"],
    subtitle: SHARED_SUBTITLE,
    cta: "Join the Waitlist",
    ctaSecondary: "What's hot",
    personaNote:
      "For impulse-led investors who want social proof, fresh rounds, visible momentum, and a clear signal that something is happening now.",
    proofPoints: ["Trending rounds", "Live market pulse", "Instant ownership"],
    sections: [
      {
        num: "01",
        label: "StartKit",
        title: "Spot the next big thing. Bet on a basket of them.",
        body:
          "See what the community is backing right now.\n\nBuild a portfolio of **Europe's most hyped startups** in one transaction. No fund manager, no €25k minimum, no waiting list.\n\nPick the companies, set the weights, and own **real shares** in each.",
        imageLabel: "TRENDING - STARTKIT HEATMAP",
        variant: "portfolio",
      },
      {
        num: "02",
        label: "Secondary Market",
        title: "Trade when you want. Not in ten years.",
        body:
          "Cash out, double down, or rotate into the next hyped round **whenever you feel like it**.\n\nOur secondary market lets you buy and sell shares without the traditional ten-year lock-up.\n\nTrades settle on a blockchain. **Final, instant, visible.**",
        imageLabel: "ORDER BOOK - LIVE TRADES",
        variant: "orderbook",
      },
      {
        num: "03",
        label: "Live Feed",
        title: "Watch what the smart money is doing.",
        body:
          "Founder drops, fresh rounds, exits, and every trade on the secondary market, **streamed live**.\n\nKnow who's buying, who's selling, and who's getting in early.\n\nYour money doesn't go dark after the round closes. **It glows.**",
        imageLabel: "LIVE FEED - MARKET PULSE",
        variant: "chart",
      },
    ],
    closingTitle: ["The next 100x startup", "is one tap away."],
    closingSub: "€200 gets you in. The next round closes in 3 days.",
    closingCta: "Join the Waitlist",
    lineColors: ["#FF5470", "#FF8FA8", "#B58CFF", "#FF9647"],
    rollingWord: "Europe's",
    rollingOptions: ["Italy's", "Spain's", "Europe's"],
  },
}

export function getPersonaTheme(persona: string) {
  return personas[persona as PersonaKey]
}
