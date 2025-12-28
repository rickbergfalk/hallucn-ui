import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-input"
import type { PlankInput } from "@/web-components/plank-input"

/**
 * Visual tests for PlankInput web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("PlankInput (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-input")
    const inputs = container.querySelectorAll("plank-input")
    await Promise.all(
      Array.from(inputs).map((i) => (i as PlankInput).updateComplete)
    )
  }

  it("default input matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 250px;">
        <plank-input placeholder="Enter text..."></plank-input>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-default"
    )
  })

  it("disabled input matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 250px;">
        <plank-input placeholder="Disabled" disabled></plank-input>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-disabled"
    )
  })

  it("input with value matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 250px;">
        <plank-input value="Hello world"></plank-input>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-with-value"
    )
  })
})
