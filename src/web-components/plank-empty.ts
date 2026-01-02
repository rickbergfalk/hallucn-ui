import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { cn } from "@/lib/utils"

/**
 * PlankEmpty - an empty state container web component that mirrors shadcn/ui Empty
 *
 * Uses light DOM so Tailwind classes apply directly.
 * Compose with plank-empty-header, plank-empty-media, plank-empty-title, etc.
 */
@customElement("plank-empty")
export class PlankEmpty extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "empty"
    this.className = cn(
      "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankEmptyHeader - header section of an empty state
 */
@customElement("plank-empty-header")
export class PlankEmptyHeader extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "empty-header"
    this.className = cn(
      "flex max-w-sm flex-col items-center gap-2 text-center",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankEmptyMedia - icon/media section of an empty state
 */
@customElement("plank-empty-media")
export class PlankEmptyMedia extends LitElement {
  @property({ type: String })
  variant: "default" | "icon" = "default"

  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "empty-icon"
    this.dataset.variant = this.variant

    const baseClasses =
      "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0"
    const variantClasses =
      this.variant === "icon"
        ? "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
        : "bg-transparent"

    this.className = cn(baseClasses, variantClasses, this.class)
  }

  render() {
    return html``
  }
}

/**
 * PlankEmptyTitle - title text inside empty header
 */
@customElement("plank-empty-title")
export class PlankEmptyTitle extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "empty-title"
    this.className = cn("text-lg font-medium tracking-tight", this.class)
  }

  render() {
    return html``
  }
}

/**
 * PlankEmptyDescription - description text inside empty header
 */
@customElement("plank-empty-description")
export class PlankEmptyDescription extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "empty-description"
    this.className = cn(
      "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankEmptyContent - content/action area of an empty state
 */
@customElement("plank-empty-content")
export class PlankEmptyContent extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "empty-content"
    this.className = cn(
      "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
      this.class
    )
  }

  render() {
    return html``
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plank-empty": PlankEmpty
    "plank-empty-header": PlankEmptyHeader
    "plank-empty-media": PlankEmptyMedia
    "plank-empty-title": PlankEmptyTitle
    "plank-empty-description": PlankEmptyDescription
    "plank-empty-content": PlankEmptyContent
  }
}
