import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-skeleton"
import type { PlankSkeleton } from "@/web-components/plank-skeleton"

/**
 * Visual tests for PlankSkeleton web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("PlankSkeleton (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-skeleton")
    const skeletons = container.querySelectorAll("plank-skeleton")
    await Promise.all(
      Array.from(skeletons).map((s) => (s as PlankSkeleton).updateComplete)
    )
  }

  it("text skeleton matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px;">
        <plank-skeleton class="h-4 w-48"></plank-skeleton>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("skeleton-text")
  })

  it("avatar skeleton matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px;">
        <plank-skeleton class="h-12 w-12 rounded-full"></plank-skeleton>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("skeleton-avatar")
  })

  it("card skeleton matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 300px;">
        <div class="flex items-center space-x-4">
          <plank-skeleton class="h-12 w-12 rounded-full"></plank-skeleton>
          <div class="space-y-2">
            <plank-skeleton class="h-4 w-48"></plank-skeleton>
            <plank-skeleton class="h-4 w-32"></plank-skeleton>
          </div>
        </div>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("skeleton-card")
  })
})
