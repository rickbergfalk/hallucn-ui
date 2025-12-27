import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Same variant definitions as React component
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

/**
 * PlankBadge - a badge web component that mirrors shadcn/ui Badge
 *
 * Uses light DOM so Tailwind classes apply directly.
 */
@customElement("plank-badge")
export class PlankBadge extends LitElement {
  @property({ type: String })
  variant: BadgeVariant = "default"

  // Light DOM - no shadow root
  createRenderRoot() {
    return this
  }

  updated() {
    // Apply classes directly to the custom element
    const classes = cn(badgeVariants({ variant: this.variant }))
    this.className = classes

    // Set data attributes
    this.dataset.slot = "badge"
  }

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plank-badge": PlankBadge
  }
}
