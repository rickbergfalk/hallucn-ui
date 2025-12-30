import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-sheet"
import "@/web-components/plank-button"
import "@/web-components/plank-input"
import "@/web-components/plank-label"

// Small pixel variance allowed for sheet tests:
// - React Button is a native <button> element
// - plank-button is a custom element with role="button"
// - This causes minor subpixel rendering differences in borders (~1% of image)
const SHEET_SCREENSHOT_OPTIONS = {
  comparatorOptions: { allowedMismatchedPixelRatio: 0.015 },
}

describe("Sheet (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    document
      .querySelectorAll('[data-slot="sheet-overlay"]')
      .forEach((el) => el.remove())
    document
      .querySelectorAll('[data-slot="sheet-content"]')
      .forEach((el) => el.remove())
    document.querySelectorAll('[role="dialog"]').forEach((el) => el.remove())
  })

  it("sheet open from right (default)", async () => {
    container.innerHTML = `
      <div data-testid="container" style="width: 800px; height: 600px; position: relative;">
        <plank-sheet open>
          <plank-sheet-content>
            <plank-sheet-header>
              <plank-sheet-title>Edit profile</plank-sheet-title>
              <plank-sheet-description>
                Make changes to your profile here. Click save when you're done.
              </plank-sheet-description>
            </plank-sheet-header>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <plank-label for="name" class="text-right">Name</plank-label>
                <plank-input id="name" value="John Doe" class="col-span-3"></plank-input>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <plank-label for="username" class="text-right">Username</plank-label>
                <plank-input id="username" value="@johndoe" class="col-span-3"></plank-input>
              </div>
            </div>
            <plank-sheet-footer>
              <plank-button type="submit">Save changes</plank-button>
            </plank-sheet-footer>
          </plank-sheet-content>
        </plank-sheet>
      </div>
    `

    await customElements.whenDefined("plank-sheet")
    const sheet = container.querySelector("plank-sheet")!
    await (sheet as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sheet-right",
      SHEET_SCREENSHOT_OPTIONS
    )
  })

  it("sheet open from left", async () => {
    container.innerHTML = `
      <div data-testid="container" style="width: 800px; height: 600px; position: relative;">
        <plank-sheet open>
          <plank-sheet-content side="left">
            <plank-sheet-header>
              <plank-sheet-title>Navigation</plank-sheet-title>
              <plank-sheet-description>
                Access the main navigation menu.
              </plank-sheet-description>
            </plank-sheet-header>
            <div class="py-4">
              <nav class="flex flex-col gap-2">
                <a href="#" class="text-sm hover:underline">Home</a>
                <a href="#" class="text-sm hover:underline">About</a>
                <a href="#" class="text-sm hover:underline">Services</a>
                <a href="#" class="text-sm hover:underline">Contact</a>
              </nav>
            </div>
          </plank-sheet-content>
        </plank-sheet>
      </div>
    `

    await customElements.whenDefined("plank-sheet")
    const sheet = container.querySelector("plank-sheet")!
    await (sheet as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sheet-left",
      SHEET_SCREENSHOT_OPTIONS
    )
  })

  it("sheet open from top", async () => {
    container.innerHTML = `
      <div data-testid="container" style="width: 800px; height: 600px; position: relative;">
        <plank-sheet open>
          <plank-sheet-content side="top">
            <plank-sheet-header>
              <plank-sheet-title>Notification Banner</plank-sheet-title>
              <plank-sheet-description>
                Important announcements will appear here.
              </plank-sheet-description>
            </plank-sheet-header>
            <div class="py-2">
              <p class="text-sm">Welcome to our new website! Check out our latest features.</p>
            </div>
          </plank-sheet-content>
        </plank-sheet>
      </div>
    `

    await customElements.whenDefined("plank-sheet")
    const sheet = container.querySelector("plank-sheet")!
    await (sheet as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sheet-top",
      SHEET_SCREENSHOT_OPTIONS
    )
  })

  it("sheet open from bottom", async () => {
    container.innerHTML = `
      <div data-testid="container" style="width: 800px; height: 600px; position: relative;">
        <plank-sheet open>
          <plank-sheet-content side="bottom">
            <plank-sheet-header>
              <plank-sheet-title>Cookie Preferences</plank-sheet-title>
              <plank-sheet-description>
                Manage your cookie settings below.
              </plank-sheet-description>
            </plank-sheet-header>
            <div class="py-4 flex gap-4">
              <plank-button variant="outline">Reject All</plank-button>
              <plank-button>Accept All</plank-button>
            </div>
          </plank-sheet-content>
        </plank-sheet>
      </div>
    `

    await customElements.whenDefined("plank-sheet")
    const sheet = container.querySelector("plank-sheet")!
    await (sheet as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sheet-bottom",
      SHEET_SCREENSHOT_OPTIONS
    )
  })

  it("sheet with only title", async () => {
    container.innerHTML = `
      <div data-testid="container" style="width: 800px; height: 400px; position: relative;">
        <plank-sheet open>
          <plank-sheet-content>
            <plank-sheet-header>
              <plank-sheet-title>Simple Sheet</plank-sheet-title>
            </plank-sheet-header>
            <p class="text-sm">This is a simple sheet with just a title.</p>
          </plank-sheet-content>
        </plank-sheet>
      </div>
    `

    await customElements.whenDefined("plank-sheet")
    const sheet = container.querySelector("plank-sheet")!
    await (sheet as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sheet-simple",
      SHEET_SCREENSHOT_OPTIONS
    )
  })
})
