import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "../../src/web-components/plank-collapsible"
import "../../src/web-components/plank-button"
import type { PlankCollapsible } from "../../src/web-components/plank-collapsible"

describe("plank-collapsible - Visual", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
    return () => {
      container.remove()
    }
  })

  it("closed state", async () => {
    container.innerHTML = `
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-collapsible class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm font-semibold">Toggle me</span>
            <plank-collapsible-trigger>
              <plank-button variant="ghost" size="sm">Toggle</plank-button>
            </plank-collapsible-trigger>
          </div>
          <div class="rounded-md border px-4 py-2 text-sm">
            Always visible
          </div>
          <plank-collapsible-content class="flex flex-col gap-2">
            <div class="rounded-md border px-4 py-2 text-sm">
              Hidden content 1
            </div>
            <div class="rounded-md border px-4 py-2 text-sm">
              Hidden content 2
            </div>
          </plank-collapsible-content>
        </plank-collapsible>
      </div>
    `
    await customElements.whenDefined("plank-collapsible")
    const collapsible = container.querySelector(
      "plank-collapsible"
    ) as PlankCollapsible
    await collapsible.updateComplete

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "collapsible-closed"
    )
  })

  it("open state", async () => {
    container.innerHTML = `
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-collapsible open class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm font-semibold">Toggle me</span>
            <plank-collapsible-trigger>
              <plank-button variant="ghost" size="sm">Toggle</plank-button>
            </plank-collapsible-trigger>
          </div>
          <div class="rounded-md border px-4 py-2 text-sm">
            Always visible
          </div>
          <plank-collapsible-content class="flex flex-col gap-2">
            <div class="rounded-md border px-4 py-2 text-sm">
              Hidden content 1
            </div>
            <div class="rounded-md border px-4 py-2 text-sm">
              Hidden content 2
            </div>
          </plank-collapsible-content>
        </plank-collapsible>
      </div>
    `
    await customElements.whenDefined("plank-collapsible")
    const collapsible = container.querySelector(
      "plank-collapsible"
    ) as PlankCollapsible
    await collapsible.updateComplete

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "collapsible-open"
    )
  })
})
