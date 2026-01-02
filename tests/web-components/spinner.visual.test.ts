import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-spinner"
import type { PlankSpinner } from "@/web-components/plank-spinner"

/**
 * Visual tests for PlankSpinner web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("PlankSpinner (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-spinner")
    const spinners = container.querySelectorAll("plank-spinner")
    await Promise.all(
      Array.from(spinners).map((s) => (s as PlankSpinner).updateComplete)
    )
  }

  it("default spinner matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 16px;">
        <plank-spinner></plank-spinner>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "spinner-default"
    )
  })

  it("spinner with custom size matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 16px;">
        <plank-spinner class="size-8"></plank-spinner>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "spinner-size-8"
    )
  })

  it("spinner with custom color matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 16px;">
        <plank-spinner class="text-primary"></plank-spinner>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "spinner-primary"
    )
  })
})
