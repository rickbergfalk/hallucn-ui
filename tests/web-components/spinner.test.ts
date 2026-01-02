import { describe, it, expect, beforeEach, afterEach } from "vitest"
import "@/web-components/plank-spinner"
import type { PlankSpinner } from "@/web-components/plank-spinner"

describe("PlankSpinner (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  async function renderAndWait(html: string): Promise<PlankSpinner> {
    container.innerHTML = html
    await customElements.whenDefined("plank-spinner")
    const spinner = container.querySelector("plank-spinner") as PlankSpinner
    await spinner.updateComplete
    return spinner
  }

  it("renders with data-slot attribute", async () => {
    const spinner = await renderAndWait(`<plank-spinner></plank-spinner>`)
    expect(spinner).toBeDefined()
    expect(spinner.dataset.slot).toBe("spinner")
  })

  it("contains an SVG element", async () => {
    const spinner = await renderAndWait(`<plank-spinner></plank-spinner>`)
    const svg = spinner.querySelector("svg")
    expect(svg).toBeTruthy()
  })

  it("has role=status for accessibility", async () => {
    const spinner = await renderAndWait(`<plank-spinner></plank-spinner>`)
    const svg = spinner.querySelector("svg")
    expect(svg?.getAttribute("role")).toBe("status")
  })

  it("has aria-label for accessibility", async () => {
    const spinner = await renderAndWait(`<plank-spinner></plank-spinner>`)
    const svg = spinner.querySelector("svg")
    expect(svg?.getAttribute("aria-label")).toBe("Loading")
  })

  it("has animate-spin class", async () => {
    const spinner = await renderAndWait(`<plank-spinner></plank-spinner>`)
    const svg = spinner.querySelector("svg")
    expect(svg?.classList.contains("animate-spin")).toBe(true)
  })

  it("supports custom class attribute", async () => {
    const spinner = await renderAndWait(
      `<plank-spinner class="size-8"></plank-spinner>`
    )
    const svg = spinner.querySelector("svg")
    expect(svg?.classList.contains("size-8")).toBe(true)
  })
})
