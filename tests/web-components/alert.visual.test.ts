import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-alert"
import type { PlankAlert } from "@/web-components/plank-alert"

/**
 * Visual tests for PlankAlert web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("PlankAlert (Web Component) - Visual", () => {
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
    await customElements.whenDefined("plank-alert")
    const alertElements = [
      "plank-alert",
      "plank-alert-title",
      "plank-alert-description",
    ]
    await Promise.all(
      alertElements.map((el) => customElements.whenDefined(el).catch(() => {}))
    )
    const elements = container.querySelectorAll(
      "plank-alert, plank-alert-title, plank-alert-description"
    )
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankAlert).updateComplete)
    )
  }

  it("default alert with icon, title, and description matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 450px;">
        <plank-alert>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          <plank-alert-title>Success! Your changes have been saved</plank-alert-title>
          <plank-alert-description>This is an alert with icon, title and description.</plank-alert-description>
        </plank-alert>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-default-full"
    )
  })

  it("alert with only icon and title matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 450px;">
        <plank-alert>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M21 7.5h-4"/><path d="M21 16.5h-4"/><path d="M17 3v18"/></svg>
          <plank-alert-title>This Alert has a title and an icon. No description.</plank-alert-title>
        </plank-alert>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-title-only"
    )
  })

  it("destructive alert matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 450px;">
        <plank-alert variant="destructive">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          <plank-alert-title>Error</plank-alert-title>
          <plank-alert-description>Your session has expired. Please log in again.</plank-alert-description>
        </plank-alert>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-destructive"
    )
  })
})
