import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { cn } from "@/lib/utils"

let collapsibleContentId = 0

/**
 * PlankCollapsible - Container component that manages open/closed state
 *
 * @fires open-change - Fired when the open state changes, with detail: { open: boolean }
 *
 * @example
 * ```html
 * <plank-collapsible>
 *   <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
 *   <plank-collapsible-content>Hidden content</plank-collapsible-content>
 * </plank-collapsible>
 * ```
 */
@customElement("plank-collapsible")
export class PlankCollapsible extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String }) class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "collapsible"
    this.dataset.state = this.open ? "open" : "closed"
    if (this.class) {
      this.className = cn(this.class)
    }
  }

  updated() {
    // Update child components when state changes
    this._updateChildren()
  }

  private _updateChildren() {
    const trigger = this.querySelector(
      "plank-collapsible-trigger"
    ) as PlankCollapsibleTrigger | null
    const content = this.querySelector(
      "plank-collapsible-content"
    ) as PlankCollapsibleContent | null

    if (trigger) {
      trigger._setOpen(this.open)
      if (content) {
        trigger._setContentId(content.id)
      }
    }
    if (content) {
      content._setOpen(this.open)
    }
  }

  toggle() {
    if (this.disabled) return
    this.open = !this.open
    this.dispatchEvent(
      new CustomEvent("open-change", {
        detail: { open: this.open },
        bubbles: true,
      })
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankCollapsibleTrigger - Button that toggles the collapsible
 */
@customElement("plank-collapsible-trigger")
export class PlankCollapsibleTrigger extends LitElement {
  private _open = false
  private _contentId = ""

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("click", this._handleClick)
    this.addEventListener("keydown", this._handleKeydown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("click", this._handleClick)
    this.removeEventListener("keydown", this._handleKeydown)
  }

  willUpdate() {
    this.dataset.slot = "collapsible-trigger"
    this.setAttribute("role", "button")
    this.setAttribute("tabindex", "0")
    this.setAttribute("aria-expanded", String(this._open))
    if (this._contentId) {
      this.setAttribute("aria-controls", this._contentId)
    }
  }

  _setOpen(open: boolean) {
    this._open = open
    this.requestUpdate()
  }

  _setContentId(id: string) {
    this._contentId = id
    this.requestUpdate()
  }

  private _handleClick = () => {
    const collapsible = this.closest("plank-collapsible") as PlankCollapsible
    collapsible?.toggle()
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const collapsible = this.closest("plank-collapsible") as PlankCollapsible
      collapsible?.toggle()
    }
  }

  render() {
    return html``
  }
}

/**
 * PlankCollapsibleContent - Content that is shown/hidden
 */
@customElement("plank-collapsible-content")
export class PlankCollapsibleContent extends LitElement {
  @property({ type: String }) class: string = ""
  private _open = false

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    // Assign unique ID if not present
    if (!this.id) {
      this.id = `plank-collapsible-content-${++collapsibleContentId}`
    }
  }

  willUpdate() {
    this.dataset.slot = "collapsible-content"
    this.dataset.state = this._open ? "open" : "closed"
    if (this._open) {
      this.removeAttribute("hidden")
    } else {
      this.setAttribute("hidden", "")
    }
    if (this.class) {
      this.className = cn(this.class)
    }
  }

  _setOpen(open: boolean) {
    this._open = open
    this.requestUpdate()
  }

  render() {
    return html``
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plank-collapsible": PlankCollapsible
    "plank-collapsible-trigger": PlankCollapsibleTrigger
    "plank-collapsible-content": PlankCollapsibleContent
  }
}
