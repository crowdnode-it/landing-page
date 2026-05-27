export function RotatingText({ words }: { words: string[] }) {
  if (words.length <= 1) {
    return <span>{words[0] ?? ""}</span>
  }

  const n = words.length
  const dur = n * 2.5
  const pctShow = 100 / n
  const fadeIn = pctShow * 0.1
  const visible = pctShow * 0.8
  const fadeOut = pctShow * 0.9

  const keyframes = `@keyframes _rw{0%,${fadeIn}%{opacity:0}${fadeIn + 1}%,${visible}%{opacity:1}${fadeOut}%,100%{opacity:0}}`

  return (
    <span className="inline-grid whitespace-nowrap" style={{ verticalAlign: "bottom" }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      {words.map((w) => (
        <span key={`measure-${w}`} className="invisible [grid-area:1/1]">
          {w}
        </span>
      ))}
      {words.map((w, i) => (
        <span
          key={w}
          className="[grid-area:1/1]"
          style={{
            opacity: 0,
            animation: `_rw ${dur}s ${i * 2.5}s infinite`,
          }}
        >
          {w}
        </span>
      ))}
    </span>
  )
}
