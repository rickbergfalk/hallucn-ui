import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-avatar"
import type { PlankAvatar } from "@/web-components/plank-avatar"

describe("PlankAvatar (Web Component) - Visual", () => {
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
    await customElements.whenDefined("plank-avatar")
    await customElements.whenDefined("plank-avatar-fallback")
    const elements = container.querySelectorAll("plank-avatar")
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankAvatar).updateComplete)
    )
  }

  it("with fallback only", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <plank-avatar>
          <plank-avatar-fallback>CN</plank-avatar-fallback>
        </plank-avatar>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "avatar-fallback"
    )
  })

  it("with custom rounded-lg", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <plank-avatar class="rounded-lg">
          <plank-avatar-fallback>ER</plank-avatar-fallback>
        </plank-avatar>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "avatar-rounded-lg"
    )
  })

  it("multiple avatars stacked", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px">
        <div class="flex -space-x-2">
          <plank-avatar>
            <plank-avatar-fallback>A</plank-avatar-fallback>
          </plank-avatar>
          <plank-avatar>
            <plank-avatar-fallback>B</plank-avatar-fallback>
          </plank-avatar>
          <plank-avatar>
            <plank-avatar-fallback>C</plank-avatar-fallback>
          </plank-avatar>
        </div>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "avatar-stacked"
    )
  })
})
