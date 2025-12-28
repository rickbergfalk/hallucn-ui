import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { cn } from "@/lib/utils"

/**
 * PlankAvatar - container for avatar image and fallback
 *
 * Uses light DOM so Tailwind classes apply directly.
 */
@customElement("plank-avatar")
export class PlankAvatar extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "avatar"
    this.className = cn(
      "relative flex size-8 shrink-0 overflow-hidden rounded-full",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankAvatarImage - the avatar image
 *
 * Renders an img element. In a full implementation, this would
 * hide the fallback when the image loads successfully.
 */
@customElement("plank-avatar-image")
export class PlankAvatarImage extends LitElement {
  @property({ type: String })
  src: string = ""

  @property({ type: String })
  alt: string = ""

  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "avatar-image"
    this.style.display = "contents"
  }

  render() {
    return html`
      <img
        src=${this.src}
        alt=${this.alt}
        class=${cn("aspect-square size-full", this.class)}
      />
    `
  }
}

/**
 * PlankAvatarFallback - fallback content when image is not available
 *
 * Shows initials or other placeholder content.
 */
@customElement("plank-avatar-fallback")
export class PlankAvatarFallback extends LitElement {
  @property({ type: String })
  class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "avatar-fallback"
    this.className = cn(
      "bg-muted flex size-full items-center justify-center rounded-full",
      this.class
    )
  }

  render() {
    return html``
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plank-avatar": PlankAvatar
    "plank-avatar-image": PlankAvatarImage
    "plank-avatar-fallback": PlankAvatarFallback
  }
}
