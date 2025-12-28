import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-badge"
import type { PlankBadge } from "@/web-components/plank-badge"

/**
 * Visual tests for PlankBadge web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("PlankBadge (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<PlankBadge> {
    container.innerHTML = html
    await customElements.whenDefined("plank-badge")
    const badge = container.querySelector("plank-badge") as PlankBadge
    await badge.updateComplete
    return badge
  }

  it("default variant matches React", async () => {
    const badge = await renderAndWait(`<plank-badge>Badge</plank-badge>`)
    badge.setAttribute("data-testid", "badge")
    await expect(page.getByTestId("badge")).toMatchScreenshot("badge-default")
  })

  it("secondary variant matches React", async () => {
    const badge = await renderAndWait(
      `<plank-badge variant="secondary">Secondary</plank-badge>`
    )
    badge.setAttribute("data-testid", "badge")
    await expect(page.getByTestId("badge")).toMatchScreenshot("badge-secondary")
  })

  it("destructive variant matches React", async () => {
    const badge = await renderAndWait(
      `<plank-badge variant="destructive">Destructive</plank-badge>`
    )
    badge.setAttribute("data-testid", "badge")
    await expect(page.getByTestId("badge")).toMatchScreenshot(
      "badge-destructive"
    )
  })

  it("outline variant matches React", async () => {
    const badge = await renderAndWait(
      `<plank-badge variant="outline">Outline</plank-badge>`
    )
    badge.setAttribute("data-testid", "badge")
    await expect(page.getByTestId("badge")).toMatchScreenshot("badge-outline")
  })
})
