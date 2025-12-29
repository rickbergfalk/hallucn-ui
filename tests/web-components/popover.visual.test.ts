import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-popover"
import "@/web-components/plank-button"

describe("Popover (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    document
      .querySelectorAll('body > div[style*="position: fixed"]')
      .forEach((el) => {
        el.remove()
      })
  })

  it("popover open below button", async () => {
    container.innerHTML = `
      <div data-testid="container" style="padding: 100px; display: flex; justify-content: center; align-items: flex-start;">
        <plank-popover open>
          <plank-popover-trigger>
            <plank-button variant="outline">Open popover</plank-button>
          </plank-popover-trigger>
          <plank-popover-content>
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="leading-none font-medium">Dimensions</h4>
                <p class="text-muted-foreground text-sm">
                  Set the dimensions for the layer.
                </p>
              </div>
            </div>
          </plank-popover-content>
        </plank-popover>
      </div>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "popover-bottom"
    )
  })

  it("popover with align start", async () => {
    container.innerHTML = `
      <div data-testid="container" style="padding: 100px; display: flex; justify-content: center; align-items: flex-start;">
        <plank-popover open>
          <plank-popover-trigger>
            <plank-button variant="outline">Open popover</plank-button>
          </plank-popover-trigger>
          <plank-popover-content align="start">
            <p class="text-sm">Aligned to start</p>
          </plank-popover-content>
        </plank-popover>
      </div>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "popover-align-start"
    )
  })

  it("popover with align end", async () => {
    container.innerHTML = `
      <div data-testid="container" style="padding: 100px; display: flex; justify-content: center; align-items: flex-start;">
        <plank-popover open>
          <plank-popover-trigger>
            <plank-button variant="outline">Open popover</plank-button>
          </plank-popover-trigger>
          <plank-popover-content align="end">
            <p class="text-sm">Aligned to end</p>
          </plank-popover-content>
        </plank-popover>
      </div>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "popover-align-end"
    )
  })
})
