import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import "@/web-components/plank-popover"
import "@/web-components/plank-button"

describe("Popover (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    // Clean up any portaled content
    document
      .querySelectorAll('body > div[style*="position: fixed"]')
      .forEach((el) => {
        el.remove()
      })
  })

  it("renders trigger with correct data-slot", async () => {
    container.innerHTML = `
      <plank-popover>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete

    const trigger = container.querySelector("plank-popover-trigger")
    expect(trigger?.dataset.slot).toBe("popover-trigger")
  })

  it("popover content is hidden by default", async () => {
    container.innerHTML = `
      <plank-popover>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete

    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeNull()
  })

  it("opens popover on click", async () => {
    container.innerHTML = `
      <plank-popover>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Popover content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete

    const trigger = container.querySelector("plank-popover-trigger")!
    trigger.click()
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeDefined()
    expect(dialog?.textContent).toContain("Popover content")
  })

  it("closes popover on second click", async () => {
    container.innerHTML = `
      <plank-popover>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete

    const trigger = container.querySelector("plank-popover-trigger")!
    trigger.click()
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="dialog"]')).toBeDefined()

    trigger.click()
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })

  it("popover content has correct data-slot", async () => {
    container.innerHTML = `
      <plank-popover open>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const content = document.querySelector('[role="dialog"]')
    expect(content?.getAttribute("data-slot")).toBe("popover-content")
  })

  it("trigger has aria-haspopup and aria-expanded", async () => {
    container.innerHTML = `
      <plank-popover>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete

    const button = container.querySelector("plank-button")!
    expect(button.getAttribute("aria-haspopup")).toBe("dialog")
    expect(button.getAttribute("aria-expanded")).toBe("false")

    const trigger = container.querySelector("plank-popover-trigger")!
    trigger.click()
    await (popover as any).updateComplete

    expect(button.getAttribute("aria-expanded")).toBe("true")
  })

  it("can be controlled via open attribute", async () => {
    container.innerHTML = `
      <plank-popover open>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="dialog"]')).toBeDefined()
  })

  it("fires open-change event when opened", async () => {
    container.innerHTML = `
      <plank-popover>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete

    const openChangeSpy = vi.fn()
    popover.addEventListener("open-change", openChangeSpy)

    const trigger = container.querySelector("plank-popover-trigger")!
    trigger.click()
    await (popover as any).updateComplete

    expect(openChangeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { open: true },
      })
    )
  })

  it("closes on Escape key", async () => {
    container.innerHTML = `
      <plank-popover open>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="dialog"]')).toBeDefined()

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })

  it("has data-side attribute on content", async () => {
    container.innerHTML = `
      <plank-popover open>
        <plank-popover-trigger>
          <plank-button>Open</plank-button>
        </plank-popover-trigger>
        <plank-popover-content>Content</plank-popover-content>
      </plank-popover>
    `

    await customElements.whenDefined("plank-popover")
    const popover = container.querySelector("plank-popover")!
    await (popover as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const content = document.querySelector('[role="dialog"]')
    expect(content?.getAttribute("data-side")).toBeDefined()
  })
})
