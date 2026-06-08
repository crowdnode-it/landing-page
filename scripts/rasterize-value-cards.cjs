// One-off: rasterize the value-card line-art SVGs into fixed-size PNGs.
// PNGs are static GPU textures, which avoids the per-frame vector
// re-rasterization that corrupts on mobile GPUs.
const fs = require("node:fs")
const path = require("node:path")
const sharp = require("sharp")

const dir = path.join(process.cwd(), "public", "value-cards")
const files = [
  "active_communication_during_investment.svg",
  "direct_communication_with_founders.svg",
  "help_startups_grow.svg",
  "invest_in_a_startup_etf.svg",
  "sell_your_equity_when_you_want.svg",
  "startup_equity_as_digital_tokens.svg",
]

const TARGET_W = 1400

const variants = [
  ["black", "#101010"],
  ["white", "#ffffff"],
]

;(async () => {
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8")
    const svg = raw.slice(raw.indexOf("<svg"))
    const vb = svg.match(/viewBox="([\d.\s]+)"/)
    const nums = vb[1].trim().split(/\s+/).map(Number)
    const vbW = nums[2]
    const vbH = nums[3]
    const targetH = Math.round((TARGET_W * vbH) / vbW)

    for (const [variant, color] of variants) {
      const markup = svg
        .replace(/<svg([^>]*?)>/, (_m, attrs) => {
          const cleaned = attrs
            .replace(/\swidth="[^"]*"/, "")
            .replace(/\sheight="[^"]*"/, "")
          return `<svg${cleaned} width="${TARGET_W}" height="${targetH}">`
        })
        .replace(/fill="currentColor"/g, `fill="${color}"`)

      const out = file.replace(/\.svg$/, `-${variant}.png`)
      await sharp(Buffer.from(markup))
        .resize({
          width: TARGET_W,
          height: targetH,
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(path.join(dir, out))
      console.log("wrote", out, `${TARGET_W}x${targetH}`)
    }
  }
})()
