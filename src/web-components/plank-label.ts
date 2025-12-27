import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { cn } from "@/lib/utils"

/**
 * PlankLabel - a label web component that mirrors shadcn/ui Label
 *
 * Uses light DOM so Tailwind classes apply directly.
 * Renders as a native <label> element for proper form association.
 */
@customElement("plank-label")
export class PlankLabel extends LitElement {
  @property({ type: String, reflect: true })
  for: string = ""

  // Light DOM - no shadow root
  createRenderRoot() {
    return this
  }

  updated() {
    // Apply classes directly to the custom element
    const classes = cn(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
    )
    this.className = classes

    // Set data attribute
    this.dataset.slot = "label"
  }

  render() {
    // Render as a native label element for proper form association
    return html`<label .htmlFor=${this.for}><slot></slot></label>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plank-label": PlankLabel
  }
}
