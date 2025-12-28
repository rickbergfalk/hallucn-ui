import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { cn } from "@/lib/utils"

// Same classes as React component
const switchTrackClasses =
  "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"

const switchThumbClasses =
  "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"

/**
 * PlankSwitch - a switch/toggle web component that mirrors shadcn/ui Switch
 *
 * Uses light DOM so Tailwind classes apply directly.
 * Renders a thumb element inside that slides on state change.
 */
@customElement("plank-switch")
export class PlankSwitch extends LitElement {
  @property({ type: Boolean, reflect: true })
  checked = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  // Light DOM - no shadow root
  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    // Set up accessibility
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "switch")
    }
    if (!this.hasAttribute("tabindex") && !this.disabled) {
      this.setAttribute("tabindex", "0")
    }
    // Handle interactions
    this.addEventListener("click", this._handleClick)
    this.addEventListener("keydown", this._handleKeydown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("click", this._handleClick)
    this.removeEventListener("keydown", this._handleKeydown)
  }

  private _handleClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault()
      return
    }
    this._toggle()
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      if (!this.disabled) {
        e.preventDefault()
        this._toggle()
      }
    }
  }

  private _toggle() {
    this.checked = !this.checked
    this.dispatchEvent(
      new CustomEvent("checked-change", {
        detail: this.checked,
        bubbles: true,
        composed: true,
      })
    )
  }

  willUpdate(changedProperties: Map<string, unknown>) {
    // Update tabindex and aria-disabled when disabled changes
    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.setAttribute("tabindex", "-1")
        this.setAttribute("aria-disabled", "true")
      } else {
        this.setAttribute("tabindex", "0")
        this.removeAttribute("aria-disabled")
      }
    }

    // Update aria-checked and data-state when checked changes
    const state = this.checked ? "checked" : "unchecked"
    this.setAttribute("aria-checked", String(this.checked))
    this.dataset.state = state

    // Style the track (the element itself)
    this.className = cn(
      switchTrackClasses,
      this.disabled && "pointer-events-none opacity-50"
    )

    // Set data-slot for styling hooks
    this.dataset.slot = "switch"
  }

  render() {
    const state = this.checked ? "checked" : "unchecked"
    return html`
      <span
        class=${switchThumbClasses}
        data-slot="switch-thumb"
        data-state=${state}
      ></span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plank-switch": PlankSwitch
  }
}
