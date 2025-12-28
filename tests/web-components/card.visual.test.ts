import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-card"
import type { PlankCard } from "@/web-components/plank-card"

/**
 * Visual tests for PlankCard web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("PlankCard (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-card")
    // Wait for all card-related elements to be defined and updated
    const cardElements = [
      "plank-card",
      "plank-card-header",
      "plank-card-title",
      "plank-card-description",
      "plank-card-content",
      "plank-card-footer",
    ]
    await Promise.all(
      cardElements.map((el) => customElements.whenDefined(el).catch(() => {}))
    )
    const elements = container.querySelectorAll(
      "plank-card, plank-card-header, plank-card-title, plank-card-description, plank-card-content, plank-card-footer"
    )
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankCard).updateComplete)
    )
  }

  it("basic card matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-card>
          <plank-card-header>
            <plank-card-title>Card Title</plank-card-title>
            <plank-card-description>Card description goes here.</plank-card-description>
          </plank-card-header>
          <plank-card-content>
            <p>This is the card content area.</p>
          </plank-card-content>
          <plank-card-footer>
            <p>Footer content</p>
          </plank-card-footer>
        </plank-card>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("card-basic")
  })

  it("card without footer matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-card>
          <plank-card-header>
            <plank-card-title>Simple Card</plank-card-title>
            <plank-card-description>A card without a footer.</plank-card-description>
          </plank-card-header>
          <plank-card-content>
            <p>Just some content here.</p>
          </plank-card-content>
        </plank-card>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "card-no-footer"
    )
  })

  it("card with only content matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-card>
          <plank-card-content>
            <p>Minimal card with just content.</p>
          </plank-card-content>
        </plank-card>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "card-content-only"
    )
  })
})
