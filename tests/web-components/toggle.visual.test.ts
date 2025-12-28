import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-toggle"
import type { PlankToggle } from "@/web-components/plank-toggle"

describe("PlankToggle (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-toggle")
    const elements = container.querySelectorAll("plank-toggle")
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankToggle).updateComplete)
    )
  }

  it("default unpressed", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <plank-toggle aria-label="Toggle">B</plank-toggle>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "toggle-default-unpressed"
    )
  })

  it("default pressed", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <plank-toggle aria-label="Toggle" pressed>B</plank-toggle>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "toggle-default-pressed"
    )
  })

  it("outline variant", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <plank-toggle variant="outline" aria-label="Toggle">B</plank-toggle>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "toggle-outline"
    )
  })

  it("size sm", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <plank-toggle size="sm" aria-label="Toggle">B</plank-toggle>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("toggle-sm")
  })

  it("size lg", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <plank-toggle size="lg" aria-label="Toggle">B</plank-toggle>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("toggle-lg")
  })

  it("disabled", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <plank-toggle aria-label="Toggle" disabled>B</plank-toggle>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "toggle-disabled"
    )
  })
})
