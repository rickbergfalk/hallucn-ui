import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-button-group"
import "@/web-components/plank-button"
import "@/web-components/plank-separator"
import type { PlankButtonGroup } from "@/web-components/plank-button-group"

/**
 * Visual tests for PlankButtonGroup web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("PlankButtonGroup (Web Component) - Visual", () => {
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
    const elements = [
      "plank-button-group",
      "plank-button-group-text",
      "plank-button-group-separator",
      "plank-button",
    ]
    await Promise.all(
      elements.map((el) => customElements.whenDefined(el).catch(() => {}))
    )
    const allElements = container.querySelectorAll(
      "plank-button-group, plank-button-group-text, plank-button-group-separator, plank-button"
    )
    await Promise.all(
      Array.from(allElements).map(
        (el) => (el as PlankButtonGroup).updateComplete
      )
    )
  }

  it("horizontal button group matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px;">
        <plank-button-group>
          <plank-button variant="outline">Left</plank-button>
          <plank-button variant="outline">Center</plank-button>
          <plank-button variant="outline">Right</plank-button>
        </plank-button-group>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-horizontal"
    )
  })

  it("vertical button group matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px;">
        <plank-button-group orientation="vertical">
          <plank-button variant="outline">Top</plank-button>
          <plank-button variant="outline">Middle</plank-button>
          <plank-button variant="outline">Bottom</plank-button>
        </plank-button-group>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-vertical"
    )
  })

  it("button group with text matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px;">
        <plank-button-group>
          <plank-button-group-text>Label</plank-button-group-text>
          <plank-button variant="outline">Action</plank-button>
        </plank-button-group>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-with-text"
    )
  })

  it("button group with separator matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px;">
        <plank-button-group>
          <plank-button variant="outline">Save</plank-button>
          <plank-button-group-separator></plank-button-group-separator>
          <plank-button variant="outline">Cancel</plank-button>
        </plank-button-group>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-with-separator"
    )
  })

  it("button group with icon buttons matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px;">
        <plank-button-group>
          <plank-button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </plank-button>
          <plank-button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </plank-button>
          <plank-button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </plank-button>
        </plank-button-group>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-icons"
    )
  })

  it("button group mixed sizes matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px;">
        <plank-button-group>
          <plank-button variant="outline" size="sm">Small</plank-button>
          <plank-button variant="outline">Default</plank-button>
          <plank-button variant="outline" size="lg">Large</plank-button>
        </plank-button-group>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-mixed-sizes"
    )
  })
})
