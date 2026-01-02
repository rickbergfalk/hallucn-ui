import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-empty"
import type { PlankEmpty } from "@/web-components/plank-empty"

// Simple SVG icons for tests (same as React)
const InboxIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
`

const SearchIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
`

/**
 * Visual tests for PlankEmpty web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("PlankEmpty (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-empty")
    // Wait for all empty-related elements to be defined and updated
    const emptyElements = [
      "plank-empty",
      "plank-empty-header",
      "plank-empty-media",
      "plank-empty-title",
      "plank-empty-description",
      "plank-empty-content",
    ]
    await Promise.all(
      emptyElements.map((el) => customElements.whenDefined(el).catch(() => {}))
    )
    const elements = container.querySelectorAll(
      "plank-empty, plank-empty-header, plank-empty-media, plank-empty-title, plank-empty-description, plank-empty-content"
    )
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankEmpty).updateComplete)
    )
  }

  it("basic empty state matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 500px;">
        <plank-empty class="border">
          <plank-empty-header>
            <plank-empty-media variant="icon">
              ${InboxIcon}
            </plank-empty-media>
            <plank-empty-title>No messages</plank-empty-title>
            <plank-empty-description>
              You don't have any messages yet. When you receive messages,
              they will appear here.
            </plank-empty-description>
          </plank-empty-header>
        </plank-empty>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("empty-basic")
  })

  it("empty state with content matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 500px;">
        <plank-empty class="border">
          <plank-empty-header>
            <plank-empty-media variant="icon">
              ${SearchIcon}
            </plank-empty-media>
            <plank-empty-title>No results found</plank-empty-title>
            <plank-empty-description>
              We couldn't find what you're looking for. Try adjusting
              your search or filters.
            </plank-empty-description>
          </plank-empty-header>
          <plank-empty-content>
            <button class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Clear filters
            </button>
          </plank-empty-content>
        </plank-empty>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "empty-with-content"
    )
  })

  it("empty state with default media variant matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 500px;">
        <plank-empty class="border">
          <plank-empty-header>
            <plank-empty-media>
              ${InboxIcon}
            </plank-empty-media>
            <plank-empty-title>Empty inbox</plank-empty-title>
            <plank-empty-description>
              Your inbox is empty. New messages will show up here.
            </plank-empty-description>
          </plank-empty-header>
        </plank-empty>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "empty-media-default"
    )
  })

  it("empty state minimal matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 500px;">
        <plank-empty class="border">
          <plank-empty-header>
            <plank-empty-title>Nothing here yet</plank-empty-title>
          </plank-empty-header>
        </plank-empty>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "empty-minimal"
    )
  })
})
