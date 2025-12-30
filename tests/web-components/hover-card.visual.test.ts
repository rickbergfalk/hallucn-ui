import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-hover-card"
import "@/web-components/plank-button"
import "@/web-components/plank-avatar"

describe("plank-hover-card - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    // Clean up any portaled content
    document
      .querySelectorAll('body > div[style*="position: fixed"]')
      .forEach((el) => {
        el.remove()
      })
  })

  it("hover card open below trigger", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 60px; display: flex; justify-content: center; align-items: flex-start;"
      >
        <plank-hover-card open>
          <plank-hover-card-trigger>
            <plank-button variant="link">@nextjs</plank-button>
          </plank-hover-card-trigger>
          <plank-hover-card-content>
            <div class="flex justify-between gap-4">
              <plank-avatar>
                <plank-avatar-fallback>VC</plank-avatar-fallback>
              </plank-avatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">@nextjs</h4>
                <p class="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div class="text-muted-foreground text-xs">
                  Joined December 2021
                </div>
              </div>
            </div>
          </plank-hover-card-content>
        </plank-hover-card>
      </div>
    `

    await customElements.whenDefined("plank-hover-card")
    const hoverCard = container.querySelector("plank-hover-card")!
    await (hoverCard as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "hover-card-bottom"
    )
  })

  it("hover card with different alignments", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 80px 120px; display: flex; justify-content: center; align-items: flex-start;"
      >
        <plank-hover-card open>
          <plank-hover-card-trigger>
            <plank-button variant="link">@nextjs</plank-button>
          </plank-hover-card-trigger>
          <plank-hover-card-content align="start">
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">@nextjs</h4>
              <p class="text-sm">The React Framework</p>
            </div>
          </plank-hover-card-content>
        </plank-hover-card>
      </div>
    `

    await customElements.whenDefined("plank-hover-card")
    const hoverCard = container.querySelector("plank-hover-card")!
    await (hoverCard as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "hover-card-align-start"
    )
  })

  it("hover card with custom width", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 60px; display: flex; justify-content: center; align-items: flex-start;"
      >
        <plank-hover-card open>
          <plank-hover-card-trigger>
            <plank-button variant="link">@nextjs</plank-button>
          </plank-hover-card-trigger>
          <plank-hover-card-content class="w-80">
            <div class="flex justify-between gap-4">
              <plank-avatar>
                <plank-avatar-fallback>VC</plank-avatar-fallback>
              </plank-avatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">@nextjs</h4>
                <p class="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div class="text-muted-foreground text-xs">
                  Joined December 2021
                </div>
              </div>
            </div>
          </plank-hover-card-content>
        </plank-hover-card>
      </div>
    `

    await customElements.whenDefined("plank-hover-card")
    const hoverCard = container.querySelector("plank-hover-card")!
    await (hoverCard as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "hover-card-w-80"
    )
  })
})
