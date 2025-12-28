import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import "@/web-components/plank-switch"
import type { PlankSwitch } from "@/web-components/plank-switch"

describe("PlankSwitch (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("renders with default unchecked state", async () => {
    container.innerHTML = `<plank-switch></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl).toBeDefined()
    expect(switchEl.dataset.slot).toBe("switch")
    expect(switchEl.dataset.state).toBe("unchecked")
    expect(switchEl.getAttribute("role")).toBe("switch")
    expect(switchEl.getAttribute("aria-checked")).toBe("false")
  })

  it("renders in checked state when checked attribute present", async () => {
    container.innerHTML = `<plank-switch checked></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl.dataset.state).toBe("checked")
    expect(switchEl.getAttribute("aria-checked")).toBe("true")
  })

  it("can be disabled", async () => {
    container.innerHTML = `<plank-switch disabled></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl.hasAttribute("disabled")).toBe(true)
    expect(switchEl.getAttribute("aria-disabled")).toBe("true")
  })

  it("toggles state on click", async () => {
    container.innerHTML = `<plank-switch></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl.dataset.state).toBe("unchecked")

    switchEl.click()
    await switchEl.updateComplete

    expect(switchEl.dataset.state).toBe("checked")
    expect(switchEl.getAttribute("aria-checked")).toBe("true")
  })

  it("toggles state on Space key", async () => {
    container.innerHTML = `<plank-switch></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl.dataset.state).toBe("unchecked")

    const event = new KeyboardEvent("keydown", { key: " ", bubbles: true })
    switchEl.dispatchEvent(event)
    await switchEl.updateComplete

    expect(switchEl.dataset.state).toBe("checked")
  })

  it("toggles state on Enter key", async () => {
    container.innerHTML = `<plank-switch></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl.dataset.state).toBe("unchecked")

    const event = new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
    switchEl.dispatchEvent(event)
    await switchEl.updateComplete

    expect(switchEl.dataset.state).toBe("checked")
  })

  it("fires checked-change event on toggle", async () => {
    container.innerHTML = `<plank-switch></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    const handler = vi.fn()
    switchEl.addEventListener("checked-change", handler)

    switchEl.click()
    await switchEl.updateComplete

    expect(handler).toHaveBeenCalledTimes(1)
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toBe(true)
  })

  it("does not toggle when disabled", async () => {
    container.innerHTML = `<plank-switch disabled></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    const handler = vi.fn()
    switchEl.addEventListener("checked-change", handler)

    switchEl.click()
    await switchEl.updateComplete

    expect(switchEl.dataset.state).toBe("unchecked")
    expect(handler).not.toHaveBeenCalled()
  })

  it("has a thumb element with correct data-slot", async () => {
    container.innerHTML = `<plank-switch></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    const thumb = switchEl.querySelector('[data-slot="switch-thumb"]')
    expect(thumb).toBeDefined()
  })

  it("thumb has correct data-state", async () => {
    container.innerHTML = `<plank-switch></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    let thumb = switchEl.querySelector('[data-slot="switch-thumb"]')
    expect(thumb?.getAttribute("data-state")).toBe("unchecked")

    switchEl.click()
    await switchEl.updateComplete

    thumb = switchEl.querySelector('[data-slot="switch-thumb"]')
    expect(thumb?.getAttribute("data-state")).toBe("checked")
  })

  it("is keyboard accessible", async () => {
    container.innerHTML = `<plank-switch></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl.getAttribute("role")).toBe("switch")
    expect(switchEl.getAttribute("tabindex")).toBe("0")
  })

  it("has tabindex -1 when disabled", async () => {
    container.innerHTML = `<plank-switch disabled></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl.getAttribute("tabindex")).toBe("-1")
  })

  it("forwards id attribute", async () => {
    container.innerHTML = `<plank-switch id="my-switch"></plank-switch>`
    await customElements.whenDefined("plank-switch")
    const switchEl = container.querySelector("plank-switch") as PlankSwitch
    await switchEl.updateComplete

    expect(switchEl.id).toBe("my-switch")
  })
})
