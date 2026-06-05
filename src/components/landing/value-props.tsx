"use client"

import { ChevronDown, Plus } from "lucide-react"
import Image from "next/image"
import { useState, type CSSProperties } from "react"

import { cn } from "@/lib/utils"
import type { PersonaKey } from "@/lib/personas"

type ValueProp = {
  num: string
  title: string
  body: string
  tint: string
  images: Record<PersonaKey, string>
  featured?: boolean
}

type TileStyle = CSSProperties & {
  "--tile-tint": string
  "--tile-card": string
}

const mediaBackground =
  "radial-gradient(120% 100% at 30% 0%, color-mix(in srgb, var(--tile-tint) 78%, #fff) 0%, transparent 55%), repeating-linear-gradient(135deg, rgba(245,240,230,0.13) 0 1px, transparent 1px 14px), linear-gradient(150deg, var(--tile-tint), color-mix(in srgb, var(--tile-tint) 48%, #000))"

function getTileStyle(item: ValueProp): TileStyle {
  return {
    "--tile-tint": item.tint,
    "--tile-card": `color-mix(in srgb, ${item.tint} 16%, var(--p-surface))`,
  }
}

const valueProps: ValueProp[] = [
  {
    num: "01",
    featured: true,
    tint: "var(--p-accent)",
    images: {
      lara: "/value-cards/lara/card-01.png",
      johann: "/value-cards/johann/card-01.png",
      bob: "/value-cards/bob/card-01.png",
    },
    title: "Startup Equity as Digital Tokens",
    body:
      "Our platform turns ownership into secure digital tokens, making it easier than ever to hold a stake in promising companies. You can finally own a real piece of a startup with the same simplicity as buying a stock online.",
  },
  {
    num: "02",
    tint: "color-mix(in srgb, var(--p-accent) 52%, var(--p-accent-2))",
    images: {
      lara: "/value-cards/lara/card-02.png",
      johann: "/value-cards/johann/card-02.png",
      bob: "/value-cards/bob/card-02.png",
    },
    title: 'Invest in a Startup "ETF"',
    body:
      "Instead of betting on just one company, you can easily spread your investment across a basket of different startups. This helps you build a balanced, diversified portfolio while reducing your overall risk.",
  },
  {
    num: "03",
    featured: true,
    tint: "color-mix(in srgb, var(--p-accent) 58%, var(--p-surface-warm))",
    images: {
      lara: "/value-cards/lara/card-03.png",
      johann: "/value-cards/johann/card-03.png",
      bob: "/value-cards/bob/card-03.png",
    },
    title: "Sell Your Equity When You Want",
    body:
      "Traditional startup investments are usually locked away for years, but we are changing that. Our platform provides a secondary market, giving you the freedom to trade or sell your shares whenever it suits your personal financial goals.",
  },
  {
    num: "04",
    tint: "color-mix(in srgb, var(--p-accent) 42%, var(--p-bg-alt))",
    images: {
      lara: "/value-cards/lara/card-04.png",
      johann: "/value-cards/johann/card-04.png",
      bob: "/value-cards/bob/card-04.png",
    },
    title: "Direct Communication with Founders",
    body:
      "You aren't just a number in a spreadsheet; you are a partner. Our platform opens a direct line to the people building the business, allowing you to ask questions and stay informed directly from the source.",
  },
  {
    num: "05",
    tint: "color-mix(in srgb, var(--p-accent) 36%, var(--p-surface))",
    images: {
      lara: "/value-cards/lara/card-05.png",
      johann: "/value-cards/johann/card-05.png",
      bob: "/value-cards/bob/card-05.png",
    },
    title: "Active Communication During Investment",
    body:
      "We keep you in the loop throughout the entire journey, not just during the initial purchase. You will receive consistent updates on key milestones, challenges, and wins as the company evolves.",
  },
  {
    num: "06",
    tint: "color-mix(in srgb, var(--p-accent) 30%, var(--p-accent-2))",
    images: {
      lara: "/value-cards/lara/card-06.png",
      johann: "/value-cards/johann/card-06.png",
      bob: "/value-cards/bob/card-06.png",
    },
    title: "Help Startups Grow",
    body:
      "Your investment does more than just provide capital. It provides a voice. You can share your insights and expertise to help the companies you believe in succeed and reach their full potential.",
  },
]

function ValueTile({
  item,
  persona,
  open,
  onToggle,
}: {
  item: ValueProp
  persona: PersonaKey
  open: boolean
  onToggle: () => void
}) {
  const tileStyle = getTileStyle(item)
  const spanClassByNum: Record<string, string> = {
    "01": "lg:col-span-4",
    "02": "lg:col-span-2",
    "03": "lg:col-span-2",
    "04": "lg:col-span-4",
    "05": "lg:col-span-4",
    "06": "lg:col-span-2",
  }
  const spanClass = spanClassByNum[item.num] ?? "lg:col-span-3"
  const heightClass = "h-[520px] md:h-[580px]"
  const panelClass = "h-[166px] group-open:h-[300px] sm:group-open:h-[360px] md:h-[190px] md:group-open:h-[410px]"
  const imageSrc = item.images[persona]

  return (
    <details
      open={open}
      className={cn(
        "bsp-product-card group block overflow-hidden bg-[var(--tile-card)] text-left text-[var(--p-ink)] transition-transform duration-150 hover:-translate-y-1",
        spanClass,
        heightClass
      )}
      style={tileStyle}
    >
      <summary
        aria-expanded={open}
        className="relative block h-full cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-accent)] [&::-webkit-details-marker]:hidden"
        onClick={(event) => {
          event.preventDefault()
          onToggle()
        }}
      >
        <div
          className={cn(
            "absolute inset-0 overflow-hidden"
          )}
          style={{ background: mediaBackground }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center opacity-95 saturate-[0.98] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_18%,transparent_0%,transparent_42%,color-mix(in_srgb,var(--tile-tint)_18%,transparent)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_54%,color-mix(in_srgb,var(--tile-card)_18%,transparent)_75%,color-mix(in_srgb,var(--tile-card)_44%,transparent)_100%)]" />
        </div>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end bg-[linear-gradient(to_bottom,transparent_0%,color-mix(in_srgb,var(--tile-card)_72%,transparent)_60px,var(--tile-card)_130px)] p-6 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:justify-start md:px-10 md:py-9",
            panelClass
          )}
        >
          <div className="relative flex items-start justify-between gap-5">
            <h3 className="text-balance font-sans text-[22px]/[1.26] font-medium tracking-[-0.02em] md:text-[28px]/[1.18] md:tracking-[-0.03em]">
              {item.title}
            </h3>
            <span
              className="grid size-9 shrink-0 place-items-center rounded-full border border-transparent bg-[color-mix(in_srgb,var(--p-ink)_7%,transparent)] text-[var(--p-accent)] transition-transform duration-300 group-open:rotate-45"
              aria-hidden="true"
            >
              <Plus className="size-4" />
            </span>
          </div>

          <div className="relative mt-0 h-0 flex-none overflow-hidden transition-[height,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:mt-4 group-open:min-h-0 group-open:flex-1">
            <p className="bsp-body absolute inset-x-0 top-0 translate-y-7 text-[var(--p-ink-soft)] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:translate-y-0 group-open:opacity-100">
              {item.body}
            </p>
          </div>

          <span className="bsp-mono-label mt-6 inline-flex items-center gap-2 self-start text-[11px] uppercase text-[var(--p-accent)]">
            <span className="group-open:hidden">Show more</span>
            <span className="hidden group-open:inline">Show less</span>
            <ChevronDown className="size-3.5 transition-transform duration-300 group-open:rotate-180" />
          </span>
        </div>
      </summary>
    </details>
  )
}

export function ValueProps({ persona }: { persona: PersonaKey }) {
  const [openTile, setOpenTile] = useState<string | null>(null)

  return (
    <section
      id="value"
      data-section="value"
      className="border-t border-[var(--p-ink-line)] bg-[var(--p-bg)] px-6 py-20 sm:px-10 md:py-[7.5rem] lg:px-16 xl:px-[88px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <h2 className="bsp-section-title max-w-3xl text-[var(--p-ink)]">
            How it works
          </h2>
          <p className="bsp-section-subtitle mt-5 max-w-2xl text-[var(--p-ink-soft)]">
            Six reasons to hold a real stake.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-10">
          {valueProps.map((item) => (
            <ValueTile
              key={item.num}
              item={item}
              persona={persona}
              open={openTile === item.num}
              onToggle={() => setOpenTile((current) => (current === item.num ? null : item.num))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
