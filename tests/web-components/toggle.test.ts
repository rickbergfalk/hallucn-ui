import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import "@/web-components/plank-toggle"
import type { PlankToggle } from "@/web-components/plank-toggle"

describe("PlankToggle (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("renders with default unpressed state", async () => {
    container.innerHTML = `<plank-toggle>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle).toBeDefined()
    expect(toggle.dataset.slot).toBe("toggle")
    expect(toggle.dataset.state).toBe("off")
    expect(toggle.getAttribute("role")).toBe("button")
    expect(toggle.getAttribute("aria-pressed")).toBe("false")
  })

  it("renders in pressed state when pressed attribute present", async () => {
    container.innerHTML = `<plank-toggle pressed>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.dataset.state).toBe("on")
    expect(toggle.getAttribute("aria-pressed")).toBe("true")
  })

  it("can be disabled", async () => {
    container.innerHTML = `<plank-toggle disabled>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.hasAttribute("disabled")).toBe(true)
    expect(toggle.getAttribute("aria-disabled")).toBe("true")
  })

  it("toggles state on click", async () => {
    container.innerHTML = `<plank-toggle>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.dataset.state).toBe("off")

    toggle.click()
    await toggle.updateComplete

    expect(toggle.dataset.state).toBe("on")
    expect(toggle.getAttribute("aria-pressed")).toBe("true")
  })

  it("toggles state on Space key", async () => {
    container.innerHTML = `<plank-toggle>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.dataset.state).toBe("off")

    const event = new KeyboardEvent("keydown", { key: " ", bubbles: true })
    toggle.dispatchEvent(event)
    await toggle.updateComplete

    expect(toggle.dataset.state).toBe("on")
  })

  it("toggles state on Enter key", async () => {
    container.innerHTML = `<plank-toggle>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.dataset.state).toBe("off")

    const event = new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
    toggle.dispatchEvent(event)
    await toggle.updateComplete

    expect(toggle.dataset.state).toBe("on")
  })

  it("fires pressed-change event on toggle", async () => {
    container.innerHTML = `<plank-toggle>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    const handler = vi.fn()
    toggle.addEventListener("pressed-change", handler)

    toggle.click()
    await toggle.updateComplete

    expect(handler).toHaveBeenCalledTimes(1)
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toBe(true)
  })

  it("does not toggle when disabled", async () => {
    container.innerHTML = `<plank-toggle disabled>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    const handler = vi.fn()
    toggle.addEventListener("pressed-change", handler)

    toggle.click()
    await toggle.updateComplete

    expect(toggle.dataset.state).toBe("off")
    expect(handler).not.toHaveBeenCalled()
  })

  it("is keyboard accessible", async () => {
    container.innerHTML = `<plank-toggle>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.getAttribute("role")).toBe("button")
    expect(toggle.getAttribute("tabindex")).toBe("0")
  })

  it("has tabindex -1 when disabled", async () => {
    container.innerHTML = `<plank-toggle disabled>Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.getAttribute("tabindex")).toBe("-1")
  })

  it("supports outline variant", async () => {
    container.innerHTML = `<plank-toggle variant="outline">Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.classList.contains("border")).toBe(true)
  })

  it("supports size sm", async () => {
    container.innerHTML = `<plank-toggle size="sm">Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.classList.contains("h-8")).toBe(true)
  })

  it("supports size lg", async () => {
    container.innerHTML = `<plank-toggle size="lg">Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.classList.contains("h-10")).toBe(true)
  })

  it("applies custom class", async () => {
    container.innerHTML = `<plank-toggle class="custom-class">Toggle</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.classList.contains("custom-class")).toBe(true)
  })

  it("preserves children content", async () => {
    container.innerHTML = `<plank-toggle><span>Icon</span> Text</plank-toggle>`
    await customElements.whenDefined("plank-toggle")
    const toggle = container.querySelector("plank-toggle") as PlankToggle
    await toggle.updateComplete

    expect(toggle.textContent).toContain("Icon")
    expect(toggle.textContent).toContain("Text")
  })
})
