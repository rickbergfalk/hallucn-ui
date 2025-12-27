import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { cn } from "@/lib/utils"

/**
 * PlankCard - a card container web component that mirrors shadcn/ui Card
 *
 * Uses light DOM so Tailwind classes apply directly.
 * Compose with plank-card-header, plank-card-content, plank-card-footer, etc.
 */
@customElement("plank-card")
export class PlankCard extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "card"
    this.className = cn(
      "block bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankCardHeader - header section of a card
 */
@customElement("plank-card-header")
export class PlankCardHeader extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "card-header"
    this.className = cn(
      "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankCardTitle - title text inside card header
 */
@customElement("plank-card-title")
export class PlankCardTitle extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "card-title"
    this.className = cn("leading-none font-semibold", this.class)
  }

  render() {
    return html``
  }
}

/**
 * PlankCardDescription - description text inside card header
 */
@customElement("plank-card-description")
export class PlankCardDescription extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "card-description"
    this.className = cn("text-muted-foreground text-sm", this.class)
  }

  render() {
    return html``
  }
}

/**
 * PlankCardAction - action area inside card header (positioned top-right)
 */
@customElement("plank-card-action")
export class PlankCardAction extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "card-action"
    this.className = cn(
      "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankCardContent - main content area of a card
 */
@customElement("plank-card-content")
export class PlankCardContent extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "card-content"
    this.className = cn("px-6", this.class)
  }

  render() {
    return html``
  }
}

/**
 * PlankCardFooter - footer section of a card
 */
@customElement("plank-card-footer")
export class PlankCardFooter extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "card-footer"
    this.className = cn("flex items-center px-6 [.border-t]:pt-6", this.class)
  }

  render() {
    return html``
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plank-card": PlankCard
    "plank-card-header": PlankCardHeader
    "plank-card-title": PlankCardTitle
    "plank-card-description": PlankCardDescription
    "plank-card-action": PlankCardAction
    "plank-card-content": PlankCardContent
    "plank-card-footer": PlankCardFooter
  }
}
