"use client"

import { useEffect } from "react"

/**
 * Enhances the CSS :target-based value-prop modals with proper modal behaviour:
 *  1. Esc closes the open modal.
 *  2. Tab is trapped inside the open modal (focus can't reach the page behind).
 *  3. Closing does NOT scroll the page. The markup closes via href="#value",
 *     which makes the browser jump to the value section. We intercept the close
 *     and instead drop the :target by switching the fragment to a non-matching
 *     value (no element → no scroll), then tidy the URL.
 *
 * All of this is progressive enhancement: without JS the anchors still close
 * the modal (they just scroll, the old behaviour).
 */
const MODAL_PREFIX = "#value-"

export function ValueModalController() {
  useEffect(() => {
    function getOpenModal(): HTMLElement | null {
      const hash = window.location.hash
      if (!hash.startsWith(MODAL_PREFIX)) return null
      const el = document.getElementById(hash.slice(1))
      return el && el.classList.contains("vp-modal") ? el : null
    }

    function closeModal() {
      const modal = getOpenModal()
      if (!modal) return
      const openerId = modal.id.replace("value-", "")

      // Switch the fragment to a value that matches no element: this drops
      // :target (closing the modal) without scrolling anywhere.
      window.location.hash = "value-closed"
      // Tidy the URL back to the bare path (no scroll, no :target change).
      history.replaceState(null, "", window.location.pathname + window.location.search)

      // Return focus to the card that opened the modal, without scrolling.
      const opener = document.querySelector<HTMLElement>(`[data-value-id="${openerId}"]`)
      opener?.focus({ preventScroll: true })
    }

    function focusFirst(modal: HTMLElement) {
      const closeBtn = modal.querySelector<HTMLElement>(".vp-close")
      closeBtn?.focus({ preventScroll: true })
    }

    function onKeyDown(e: KeyboardEvent) {
      const modal = getOpenModal()
      if (!modal) return

      if (e.key === "Escape") {
        e.preventDefault()
        closeModal()
        return
      }

      if (e.key === "Tab") {
        const panel = modal.querySelector<HTMLElement>(".vp-modal-panel")
        if (!panel) return
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled"))
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement as HTMLElement | null

        if (e.shiftKey) {
          if (active === first || !panel.contains(active)) {
            e.preventDefault()
            last.focus({ preventScroll: true })
          }
        } else if (active === last || !panel.contains(active)) {
          e.preventDefault()
          first.focus({ preventScroll: true })
        }
      }
    }

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.closest(".vp-close, .vp-modal-backdrop") && getOpenModal()) {
        e.preventDefault()
        closeModal()
      }
    }

    function onHashChange() {
      const modal = getOpenModal()
      if (modal) focusFirst(modal)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("click", onClick)
    window.addEventListener("hashchange", onHashChange)

    // If the page loads directly on a modal hash, move focus in.
    onHashChange()

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("click", onClick)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  return null
}
