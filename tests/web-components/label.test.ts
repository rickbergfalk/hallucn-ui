import { describe, it, expect, beforeEach } from "vitest"
import "@/web-components/plank-label"
import type { PlankLabel } from "@/web-components/plank-label"

describe("PlankLabel (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<PlankLabel> {
    container.innerHTML = html
    await customElements.whenDefined("plank-label")
    const label = container.querySelector("plank-label") as PlankLabel
    await label.updateComplete
    return label
  }

  it("renders with data-slot attribute", async () => {
    const labelEl = await renderAndWait(`<plank-label>Email</plank-label>`)
    expect(labelEl).toBeDefined()
    expect(labelEl.dataset.slot).toBe("label")
  })

  it("contains a native label element", async () => {
    const labelEl = await renderAndWait(`<plank-label>Username</plank-label>`)
    const nativeLabel = labelEl.querySelector("label")
    expect(nativeLabel).toBeDefined()
    // Content is projected via slot, so check the custom element's text
    expect(labelEl.textContent).toBe("Username")
  })

  it("has correct base classes", async () => {
    const labelEl = await renderAndWait(`<plank-label>Name</plank-label>`)
    expect(labelEl.classList.contains("text-sm")).toBe(true)
    expect(labelEl.classList.contains("font-medium")).toBe(true)
  })

  it("supports for attribute", async () => {
    const labelEl = await renderAndWait(
      `<plank-label for="email-input">Email</plank-label>`
    )
    const nativeLabel = labelEl.querySelector("label")
    expect(nativeLabel?.htmlFor).toBe("email-input")
  })

  it("clicking label focuses associated input", async () => {
    await renderAndWait(`
      <plank-label for="test-input">Test</plank-label>
      <input id="test-input" type="text" />
    `)
    const nativeLabel = container.querySelector("label")
    const input = container.querySelector("input")

    nativeLabel?.click()
    expect(document.activeElement).toBe(input)
  })
})
