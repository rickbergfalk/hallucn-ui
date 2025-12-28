import { describe, it, expect, beforeEach, afterEach } from "vitest"
import "@/web-components/plank-input"
import type { PlankInput } from "@/web-components/plank-input"

describe("PlankInput (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  async function renderAndWait(html: string): Promise<PlankInput> {
    container.innerHTML = html
    await customElements.whenDefined("plank-input")
    const input = container.querySelector("plank-input") as PlankInput
    await input.updateComplete
    return input
  }

  it("renders with data-slot attribute", async () => {
    const inputEl = await renderAndWait(`<plank-input></plank-input>`)
    expect(inputEl).toBeDefined()
    expect(inputEl.dataset.slot).toBe("input")
  })

  it("contains a native input element", async () => {
    const inputEl = await renderAndWait(`<plank-input></plank-input>`)
    const nativeInput = inputEl.querySelector("input")
    expect(nativeInput).toBeDefined()
  })

  it("supports type attribute", async () => {
    const inputEl = await renderAndWait(
      `<plank-input type="email"></plank-input>`
    )
    const nativeInput = inputEl.querySelector("input") as HTMLInputElement
    expect(nativeInput.type).toBe("email")
  })

  it("supports placeholder", async () => {
    const inputEl = await renderAndWait(
      `<plank-input placeholder="Enter text"></plank-input>`
    )
    const nativeInput = inputEl.querySelector("input") as HTMLInputElement
    expect(nativeInput.placeholder).toBe("Enter text")
  })

  it("can be disabled", async () => {
    const inputEl = await renderAndWait(`<plank-input disabled></plank-input>`)
    const nativeInput = inputEl.querySelector("input") as HTMLInputElement
    expect(nativeInput.disabled).toBe(true)
  })

  it("supports value property", async () => {
    const inputEl = await renderAndWait(`<plank-input></plank-input>`)
    inputEl.value = "test value"
    await inputEl.updateComplete
    const nativeInput = inputEl.querySelector("input") as HTMLInputElement
    expect(nativeInput.value).toBe("test value")
  })

  it("focuses input when associated label is clicked", async () => {
    container.innerHTML = `
      <label for="test-input">Label</label>
      <plank-input id="test-input"></plank-input>
    `
    await customElements.whenDefined("plank-input")
    const inputEl = container.querySelector("plank-input") as PlankInput
    await inputEl.updateComplete

    const label = container.querySelector("label")!
    const nativeInput = inputEl.querySelector("input") as HTMLInputElement

    label.click()

    expect(document.activeElement).toBe(nativeInput)
  })
})
