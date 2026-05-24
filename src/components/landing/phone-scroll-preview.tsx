import { BarChart3, Clock3, Compass, Home, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import type { PersonaKey, PersonaTheme } from "@/lib/personas"

type PhoneMetric = {
  label: string
  value: string
}

type PhoneImpact = {
  strong: string
  text: string
}

type HeadlinePart = {
  text: string
  highlight?: boolean
}

type PhoneCard = {
  sector: string
  stage: string
  label: string
  headline: HeadlinePart[]
  description: string
  quote: string
  who: string
  metrics: PhoneMetric[]
  impact: PhoneImpact[]
  verb: string
  startup: string
  mark: string
}

const phoneCards: Record<PersonaKey, PhoneCard[]> = {
  lara: [
    {
      sector: "Climate · Energy",
      stage: "Seed",
      label: "Thesis",
      headline: [{ text: "Apartment scale batteries for buildings that cannot install solar." }],
      description:
        "HelioNest turns the night into the new daytime, storing off peak energy where most Europeans actually live: dense urban housing.",
      quote: "We are not selling green. We are selling a smaller bill, and the climate math comes for free.",
      who: "Sara M. · Founder & CEO",
      metrics: [
        { label: "Ticket", value: "€250" },
        { label: "Raising", value: "€400K" },
        { label: "Instrument", value: "SAFE" },
      ],
      impact: [
        { strong: "Defensibility.", text: " Two filed patents on cell cycle balancing, verified at TU Delft." },
        { strong: "Why now.", text: " EU regulation forces utilities to pay for grid balancing from 2026." },
      ],
      verb: "Building",
      startup: "HelioNest",
      mark: "h",
    },
    {
      sector: "Fintech · Access",
      stage: "Pre seed",
      label: "Thesis",
      headline: [{ text: "Private markets, finally open to the people who fund the public ones." }],
      description:
        "CrowdNode lets a teacher in Lyon take the same SAFE a Sand Hill associate writes, at a ticket size that respects a real salary.",
      quote: "The capital ladder has a missing rung. We are not climbing it. We are building it.",
      who: "Ana & Ravi · Co-founders",
      metrics: [
        { label: "Ticket", value: "€250" },
        { label: "Raising", value: "€750K" },
        { label: "Instrument", value: "SAFE" },
      ],
      impact: [
        { strong: "Regulatory edge.", text: " ESMA crowdfunding license in three jurisdictions including Germany." },
        { strong: "Why now.", text: " Private market liquidity sits at a 12 year low." },
      ],
      verb: "Building",
      startup: "CrowdNode",
      mark: "c",
    },
    {
      sector: "Deep tech · AI infra",
      stage: "Series A",
      label: "Thesis",
      headline: [{ text: "The testing layer every production language model is missing." }],
      description:
        "Forge AI is the post launch monitoring stack, the difference between shipping a demo and running a model in front of paying customers.",
      quote:
        "You do not notice eval until something breaks. We make the breaking visible, and fixable, before users do.",
      who: "Marco V. · Founder, ex DeepMind",
      metrics: [
        { label: "Ticket", value: "€500" },
        { label: "Raising", value: "€1.2M" },
        { label: "Instrument", value: "SAFE" },
      ],
      impact: [
        { strong: "Customers.", text: " Three Fortune 500 design partners in production." },
        { strong: "Why now.", text: " Model output is a regulated artifact in the EU AI Act." },
      ],
      verb: "Building",
      startup: "Forge AI",
      mark: "f",
    },
  ],
  johann: [
    {
      sector: "Climate · Energy",
      stage: "Seed",
      label: "Deal note",
      headline: [{ text: "Apartment scale batteries for buildings that cannot install solar." }],
      description:
        "HelioNest stores off peak energy for residential blocks and earns utility offtake when the grid pays for balancing.",
      quote: "We are not selling green. We are selling a smaller bill, and the climate math comes for free.",
      who: "Sara M. · Founder & CEO",
      metrics: [
        { label: "Ticket", value: "€250" },
        { label: "Raising", value: "€400K" },
        { label: "Instrument", value: "SAFE" },
      ],
      impact: [
        { strong: "Lead.", text: " 2150 Energy. EIB grant secured." },
        { strong: "Target IRR.", text: " 28 percent. Pro rata reserved 18 months." },
      ],
      verb: "Investing in",
      startup: "HelioNest",
      mark: "h",
    },
    {
      sector: "Fintech · Access",
      stage: "Pre seed",
      label: "Deal note",
      headline: [{ text: "A regulated rail for retail access to the private markets." }],
      description:
        "CrowdNode fractionalizes the same SAFE the lead writes. Licensed in three EU jurisdictions including Germany.",
      quote: "The capital ladder has a missing rung. We are not climbing it. We are building it.",
      who: "Ana & Ravi · Co-founders",
      metrics: [
        { label: "Pre money", value: "€8.5M" },
        { label: "Round", value: "€750K" },
        { label: "Min", value: "€250" },
      ],
      impact: [
        { strong: "Lead.", text: " Index Ventures. Four institutional co invest." },
        { strong: "Target MOIC.", text: " 4.2 times. Pro rata reserved 12 months." },
      ],
      verb: "Investing in",
      startup: "CrowdNode",
      mark: "c",
    },
    {
      sector: "Deep tech · AI infra",
      stage: "Series A",
      label: "Deal note",
      headline: [{ text: "Evaluation infrastructure for production language models." }],
      description:
        "Forge AI sits between model output and paying customers. Three Fortune 500 design partners already in production.",
      quote:
        "You do not notice eval until something breaks. We make the breaking visible, and fixable, before users do.",
      who: "Marco V. · Founder, ex DeepMind",
      metrics: [
        { label: "Pre money", value: "€22M" },
        { label: "Round", value: "€1.2M" },
        { label: "Min", value: "€500" },
      ],
      impact: [
        { strong: "Lead.", text: " Sequoia Arc. Three strategics on the cap table." },
        { strong: "Target MOIC.", text: " 8 times. Gross margin 84 percent." },
      ],
      verb: "Investing in",
      startup: "Forge AI",
      mark: "f",
    },
  ],
  bob: [
    {
      sector: "Climate · Energy",
      stage: "Trending",
      label: "Next big",
      headline: [{ text: "Batteries for buildings. " }, { text: "10x", highlight: true }, { text: " potential." }],
      description:
        "HelioNest is the climate play with revenue. Pilot live on three Berlin towers and the room is filling up fast.",
      quote: "This is the kind of climate bet that actually pencils. Wrote a ticket this morning.",
      who: "@chamath · 1.7M followers",
      metrics: [
        { label: "Ticket", value: "€200" },
        { label: "Funded", value: "91%" },
        { label: "Closes", value: "06d" },
      ],
      impact: [
        { strong: "312 new", text: " investors in the last 24 hours." },
        { strong: "41 people", text: " are looking at this card right now." },
      ],
      verb: "Backing",
      startup: "HelioNest",
      mark: "h",
    },
    {
      sector: "Fintech · Access",
      stage: "Hot",
      label: "Don't miss",
      headline: [{ text: "The retail SAFE " }, { text: "everyone's", highlight: true }, { text: " piling into." }],
      description:
        "CrowdNode is what your group chat will be talking about next week. Bigger names than yours are already in.",
      quote: "CrowdNode is going to be the AngelList of Europe. I am in. Do not sleep on this one.",
      who: "@packym · 184K followers",
      metrics: [
        { label: "Ticket", value: "€250" },
        { label: "Funded", value: "72%" },
        { label: "Closes", value: "47h" },
      ],
      impact: [
        { strong: "147 new", text: " investors in the last 24 hours." },
        { strong: "23 people", text: " are looking at this card right now." },
      ],
      verb: "Backing",
      startup: "CrowdNode",
      mark: "c",
    },
    {
      sector: "AI · Infrastructure",
      stage: "Just launched",
      label: "Next big",
      headline: [{ text: "The " }, { text: "AI infra", highlight: true }, { text: " bet the VCs already took." }],
      description:
        "Forge AI is the eval stack inside three Fortune 500 companies. You can still get in before Series B.",
      quote: "Eval is the picks and shovels play of 2026. Forge is the team I would back.",
      who: "@sahilbloom · 1.1M followers",
      metrics: [
        { label: "Ticket", value: "€500" },
        { label: "Funded", value: "64%" },
        { label: "Closes", value: "11d" },
      ],
      impact: [
        { strong: "208 new", text: " investors in the last 24 hours." },
        { strong: "17 people", text: " are looking at this card right now." },
      ],
      verb: "Backing",
      startup: "Forge AI",
      mark: "f",
    },
  ],
}

const tabs = [
  { label: "Home", icon: Home, active: true },
  { label: "Explore", icon: Compass },
  { label: "Portfolio", icon: Clock3 },
  { label: "Market", icon: BarChart3 },
  { label: "Community", icon: Users },
]

function StatusIcons() {
  return (
    <div className="parity-phone-status-icons">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
        <rect x="1" y="7" width="3" height="4" rx="0.7" fill="currentColor" />
        <rect x="5.7" y="5" width="3" height="6" rx="0.7" fill="currentColor" />
        <rect x="10.4" y="3" width="3" height="8" rx="0.7" fill="currentColor" />
        <rect x="15.1" y="1" width="3" height="10" rx="0.7" fill="currentColor" />
      </svg>
      <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
        <path
          d="M8.5 10.4l1.15-1.18a1.62 1.62 0 0 0-2.3 0L8.5 10.4zm-4-4.05 1.18 1.17a4 4 0 0 1 5.64 0l1.18-1.17a5.66 5.66 0 0 0-8 0zm-2.55-2.6 1.17 1.18a7.62 7.62 0 0 1 10.76 0l1.17-1.18a9.28 9.28 0 0 0-13.1 0z"
          fill="currentColor"
        />
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
        <rect x=".8" y="1.3" width="20.7" height="9.4" rx="2.6" stroke="currentColor" strokeWidth="1.3" />
        <rect x="3" y="3.2" width="16.1" height="5.6" rx="1.4" fill="currentColor" />
        <rect x="22.2" y="4" width="1.7" height="4" rx=".8" fill="currentColor" />
      </svg>
    </div>
  )
}

function PhoneCardView({ card }: { card: PhoneCard }) {
  return (
    <article className="parity-phone-card">
      <div className="parity-phone-card-top">
        <span className="parity-phone-sector">
          <span />
          {card.sector}
        </span>
        <span className="parity-phone-round-stage">{card.stage}</span>
      </div>
      <div className="parity-phone-thesis-label">{card.label}</div>
      <h2 className="parity-phone-headline">
        {card.headline.map((part, index) => (
          <span key={`${part.text}-${index}`} className={part.highlight ? "parity-phone-highlight" : undefined}>
            {part.text}
          </span>
        ))}
      </h2>
      <p className="parity-phone-description">{card.description}</p>
      <div className="parity-phone-quote">
        <p>{card.quote}</p>
        <div>{card.who}</div>
      </div>
      <div className="parity-phone-spacer" />
      <div className="parity-phone-meta">
        {card.metrics.map((metric) => (
          <div key={metric.label}>
            <div>{metric.label}</div>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
      <div className="parity-phone-impact">
        {card.impact.map((row) => (
          <div key={row.strong}>
            <span>
              <b>{row.strong}</b>
              {row.text}
            </span>
          </div>
        ))}
      </div>
      <div className="parity-phone-card-foot">
        <div className="parity-phone-mark">{card.mark}</div>
        <div>
          {card.verb}
          <b>{card.startup}</b>
        </div>
      </div>
    </article>
  )
}

export function PhoneScrollPreview({ theme }: { theme: PersonaTheme }) {
  const cards = phoneCards[theme.key]
  const loopCards = [...cards, cards[0]]

  return (
    <div className="parity-phone-stage" aria-label={`${theme.name} app preview`}>
      <div className={cn("parity-phone", `parity-phone-${theme.key}`)}>
        <div className="parity-phone-screen">
          <div className="parity-phone-statusbar" aria-hidden="true">
            <span>9:41</span>
            <StatusIcons />
          </div>
          <div className="parity-phone-island" aria-hidden="true" />

          <header className="parity-phone-header">
            <h2>
              {theme.key === "bob" ? "parity" : "Parity"}
              <span>.</span>
            </h2>
            <div>{theme.name.charAt(0)}</div>
          </header>

          <div className="parity-phone-scroll" aria-hidden="true">
            <div className="parity-phone-scroll-track">
              {loopCards.map((card, index) => (
                <PhoneCardView key={`${card.startup}-${index}`} card={card} />
              ))}
            </div>
          </div>

          <nav className="parity-phone-tabbar" aria-hidden="true">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <span key={tab.label} className={cn("parity-phone-tab", tab.active && "active")}>
                  <Icon />
                  <span>{tab.label}</span>
                </span>
              )
            })}
          </nav>
          <div className="parity-phone-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
