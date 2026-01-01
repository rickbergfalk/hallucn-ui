import { describe, it, expect, beforeEach, afterEach } from "vitest"
import "@/web-components/plank-input-group"
import type {
  PlankInputGroup,
  PlankInputGroupAddon,
  PlankInputGroupButton,
  PlankInputGroupText,
  PlankInputGroupInput,
  PlankInputGroupTextarea,
} from "@/web-components/plank-input-group"

describe("plank-input-group", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.id = "test-container"
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe("basic rendering", () => {
    it("renders with default classes", async () => {
      container.innerHTML = `<plank-input-group></plank-input-group>`
      await customElements.whenDefined("plank-input-group")
      const group = container.querySelector(
        "plank-input-group"
      )! as PlankInputGroup
      await group.updateComplete

      expect(group.className).toContain("flex")
      expect(group.className).toContain("border")
      expect(group.className).toContain("rounded-md")
      expect(group.getAttribute("role")).toBe("group")
      expect(group.dataset.slot).toBe("input-group")
    })

    it("applies disabled state", async () => {
      container.innerHTML = `<plank-input-group disabled></plank-input-group>`
      await customElements.whenDefined("plank-input-group")
      const group = container.querySelector(
        "plank-input-group"
      )! as PlankInputGroup
      await group.updateComplete

      expect(group.className).toContain("opacity-50")
      expect(group.className).toContain("pointer-events-none")
      expect(group.dataset.disabled).toBe("true")
    })
  })

  describe("with input", () => {
    it("renders input inside group", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-input placeholder="Search..."></plank-input-group-input>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group")
      await customElements.whenDefined("plank-input-group-input")
      const input = container.querySelector(
        "plank-input-group-input"
      )! as PlankInputGroupInput
      await input.updateComplete

      const nativeInput = input.querySelector("input")
      expect(nativeInput).toBeTruthy()
      expect(nativeInput?.placeholder).toBe("Search...")
    })

    it("handles input value changes", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-input></plank-input-group-input>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group-input")
      const input = container.querySelector(
        "plank-input-group-input"
      )! as PlankInputGroupInput
      await input.updateComplete

      const nativeInput = input.querySelector("input")!
      nativeInput.value = "test value"
      nativeInput.dispatchEvent(new Event("input", { bubbles: true }))

      expect(input.value).toBe("test value")
    })

    it("dispatches input event", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-input></plank-input-group-input>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group-input")
      const input = container.querySelector(
        "plank-input-group-input"
      )! as PlankInputGroupInput
      await input.updateComplete

      let eventFired = false
      let eventValue = ""
      input.addEventListener("input", ((e: CustomEvent) => {
        // Only capture our custom event with detail
        if (e.detail && e.detail.value !== undefined) {
          eventFired = true
          eventValue = e.detail.value
        }
      }) as EventListener)

      const nativeInput = input.querySelector("input")!
      nativeInput.value = "test"
      nativeInput.dispatchEvent(new Event("input", { bubbles: true }))

      expect(eventFired).toBe(true)
      expect(eventValue).toBe("test")
    })

    it("supports disabled state on input", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-input disabled></plank-input-group-input>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group-input")
      const input = container.querySelector(
        "plank-input-group-input"
      )! as PlankInputGroupInput
      await input.updateComplete

      const nativeInput = input.querySelector("input")!
      expect(nativeInput.disabled).toBe(true)
    })

    it("supports readonly state", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-input readonly></plank-input-group-input>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group-input")
      const input = container.querySelector(
        "plank-input-group-input"
      )! as PlankInputGroupInput
      await input.updateComplete

      const nativeInput = input.querySelector("input")!
      expect(nativeInput.readOnly).toBe(true)
    })

    it("supports invalid state", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-input invalid></plank-input-group-input>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group-input")
      const input = container.querySelector(
        "plank-input-group-input"
      )! as PlankInputGroupInput
      await input.updateComplete

      const nativeInput = input.querySelector("input")!
      expect(nativeInput.getAttribute("aria-invalid")).toBe("true")
    })

    it("supports different input types", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-input type="email"></plank-input-group-input>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group-input")
      const input = container.querySelector(
        "plank-input-group-input"
      )! as PlankInputGroupInput
      await input.updateComplete

      const nativeInput = input.querySelector("input")!
      expect(nativeInput.type).toBe("email")
    })
  })

  describe("with textarea", () => {
    it("renders textarea inside group", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-textarea placeholder="Enter message..."></plank-input-group-textarea>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group")
      await customElements.whenDefined("plank-input-group-textarea")
      const textarea = container.querySelector(
        "plank-input-group-textarea"
      )! as PlankInputGroupTextarea
      await textarea.updateComplete

      const nativeTextarea = textarea.querySelector("textarea")
      expect(nativeTextarea).toBeTruthy()
      expect(nativeTextarea?.placeholder).toBe("Enter message...")
    })

    it("handles textarea value changes", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-textarea></plank-input-group-textarea>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group-textarea")
      const textarea = container.querySelector(
        "plank-input-group-textarea"
      )! as PlankInputGroupTextarea
      await textarea.updateComplete

      const nativeTextarea = textarea.querySelector("textarea")!
      nativeTextarea.value = "test message"
      nativeTextarea.dispatchEvent(new Event("input", { bubbles: true }))

      expect(textarea.value).toBe("test message")
    })

    it("supports rows attribute", async () => {
      container.innerHTML = `
        <plank-input-group>
          <plank-input-group-textarea rows="5"></plank-input-group-textarea>
        </plank-input-group>
      `
      await customElements.whenDefined("plank-input-group-textarea")
      const textarea = container.querySelector(
        "plank-input-group-textarea"
      )! as PlankInputGroupTextarea
      await textarea.updateComplete

      const nativeTextarea = textarea.querySelector("textarea")!
      expect(nativeTextarea.rows).toBe(5)
    })
  })
})

describe("plank-input-group-addon", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.id = "test-container"
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("renders with default inline-start alignment", async () => {
    container.innerHTML = `<plank-input-group-addon>Icon</plank-input-group-addon>`
    await customElements.whenDefined("plank-input-group-addon")
    const addon = container.querySelector(
      "plank-input-group-addon"
    )! as PlankInputGroupAddon
    await addon.updateComplete

    expect(addon.dataset.align).toBe("inline-start")
    expect(addon.className).toContain("order-first")
  })

  it("supports inline-end alignment", async () => {
    container.innerHTML = `<plank-input-group-addon align="inline-end">USD</plank-input-group-addon>`
    await customElements.whenDefined("plank-input-group-addon")
    const addon = container.querySelector(
      "plank-input-group-addon"
    )! as PlankInputGroupAddon
    await addon.updateComplete

    expect(addon.dataset.align).toBe("inline-end")
    expect(addon.className).toContain("order-last")
  })

  it("supports block-start alignment", async () => {
    container.innerHTML = `<plank-input-group-addon align="block-start">Header</plank-input-group-addon>`
    await customElements.whenDefined("plank-input-group-addon")
    const addon = container.querySelector(
      "plank-input-group-addon"
    )! as PlankInputGroupAddon
    await addon.updateComplete

    expect(addon.dataset.align).toBe("block-start")
    expect(addon.className).toContain("order-first")
    expect(addon.className).toContain("w-full")
  })

  it("supports block-end alignment", async () => {
    container.innerHTML = `<plank-input-group-addon align="block-end">Footer</plank-input-group-addon>`
    await customElements.whenDefined("plank-input-group-addon")
    const addon = container.querySelector(
      "plank-input-group-addon"
    )! as PlankInputGroupAddon
    await addon.updateComplete

    expect(addon.dataset.align).toBe("block-end")
    expect(addon.className).toContain("order-last")
    expect(addon.className).toContain("w-full")
  })

  it("focuses input when clicked", async () => {
    container.innerHTML = `
      <plank-input-group>
        <plank-input-group-addon>$</plank-input-group-addon>
        <plank-input-group-input></plank-input-group-input>
      </plank-input-group>
    `
    await customElements.whenDefined("plank-input-group")
    await customElements.whenDefined("plank-input-group-addon")
    await customElements.whenDefined("plank-input-group-input")
    const addon = container.querySelector(
      "plank-input-group-addon"
    )! as PlankInputGroupAddon
    const inputEl = container.querySelector(
      "plank-input-group-input"
    )! as PlankInputGroupInput
    await inputEl.updateComplete

    const nativeInput = inputEl.querySelector("input")!

    addon.click()
    await new Promise((r) => setTimeout(r, 50))

    expect(document.activeElement).toBe(nativeInput)
  })
})

describe("plank-input-group-button", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.id = "test-container"
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("renders with default ghost variant", async () => {
    container.innerHTML = `<plank-input-group-button>Click</plank-input-group-button>`
    await customElements.whenDefined("plank-input-group-button")
    const button = container.querySelector(
      "plank-input-group-button"
    )! as PlankInputGroupButton
    await button.updateComplete

    const nativeButton = button.querySelector("button")!
    expect(nativeButton.className).toContain("hover:bg-accent")
  })

  it("supports different variants", async () => {
    container.innerHTML = `<plank-input-group-button variant="secondary">Click</plank-input-group-button>`
    await customElements.whenDefined("plank-input-group-button")
    const button = container.querySelector(
      "plank-input-group-button"
    )! as PlankInputGroupButton
    await button.updateComplete

    const nativeButton = button.querySelector("button")!
    expect(nativeButton.className).toContain("bg-secondary")
  })

  it("supports different sizes", async () => {
    container.innerHTML = `<plank-input-group-button size="sm">Click</plank-input-group-button>`
    await customElements.whenDefined("plank-input-group-button")
    const button = container.querySelector(
      "plank-input-group-button"
    )! as PlankInputGroupButton
    await button.updateComplete

    const nativeButton = button.querySelector("button")!
    expect(nativeButton.className).toContain("h-8")
  })

  it("supports icon sizes", async () => {
    container.innerHTML = `<plank-input-group-button size="icon-xs">X</plank-input-group-button>`
    await customElements.whenDefined("plank-input-group-button")
    const button = container.querySelector(
      "plank-input-group-button"
    )! as PlankInputGroupButton
    await button.updateComplete

    const nativeButton = button.querySelector("button")!
    expect(nativeButton.className).toContain("size-6")
  })

  it("supports disabled state", async () => {
    container.innerHTML = `<plank-input-group-button disabled>Click</plank-input-group-button>`
    await customElements.whenDefined("plank-input-group-button")
    const button = container.querySelector(
      "plank-input-group-button"
    )! as PlankInputGroupButton
    await button.updateComplete

    const nativeButton = button.querySelector("button")!
    expect(nativeButton.disabled).toBe(true)
    expect(nativeButton.className).toContain("opacity-50")
  })

  it("renders native button element", async () => {
    container.innerHTML = `<plank-input-group-button>Click</plank-input-group-button>`
    await customElements.whenDefined("plank-input-group-button")
    const button = container.querySelector(
      "plank-input-group-button"
    )! as PlankInputGroupButton
    await button.updateComplete

    const nativeButton = button.querySelector("button")
    expect(nativeButton).toBeTruthy()
    expect(nativeButton?.type).toBe("button")
  })
})

describe("plank-input-group-text", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.id = "test-container"
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("renders with proper styling", async () => {
    container.innerHTML = `<plank-input-group-text>https://</plank-input-group-text>`
    await customElements.whenDefined("plank-input-group-text")
    const text = container.querySelector(
      "plank-input-group-text"
    )! as PlankInputGroupText
    await text.updateComplete

    expect(text.className).toContain("text-muted-foreground")
    expect(text.className).toContain("text-sm")
    expect(text.dataset.slot).toBe("input-group-text")
  })

  it("renders children content", async () => {
    container.innerHTML = `<plank-input-group-text>USD</plank-input-group-text>`
    await customElements.whenDefined("plank-input-group-text")
    const text = container.querySelector(
      "plank-input-group-text"
    )! as PlankInputGroupText
    await text.updateComplete

    expect(text.textContent).toContain("USD")
  })
})

describe("complete input group composition", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.id = "test-container"
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("renders a complete input group with icon and text", async () => {
    container.innerHTML = `
      <plank-input-group>
        <plank-input-group-addon>
          <svg width="16" height="16"></svg>
        </plank-input-group-addon>
        <plank-input-group-input placeholder="Search..."></plank-input-group-input>
        <plank-input-group-addon align="inline-end">
          <plank-input-group-text>12 results</plank-input-group-text>
        </plank-input-group-addon>
      </plank-input-group>
    `
    await customElements.whenDefined("plank-input-group")
    await customElements.whenDefined("plank-input-group-addon")
    await customElements.whenDefined("plank-input-group-input")
    await customElements.whenDefined("plank-input-group-text")

    const group = container.querySelector(
      "plank-input-group"
    )! as PlankInputGroup
    await group.updateComplete

    const addons = container.querySelectorAll("plank-input-group-addon")
    expect(addons.length).toBe(2)

    const input = container.querySelector("plank-input-group-input")!
    expect(input).toBeTruthy()

    const text = container.querySelector("plank-input-group-text")!
    expect(text.textContent).toContain("12 results")
  })

  it("renders input group with buttons", async () => {
    container.innerHTML = `
      <plank-input-group>
        <plank-input-group-input placeholder="Search..."></plank-input-group-input>
        <plank-input-group-addon align="inline-end">
          <plank-input-group-button variant="secondary">Search</plank-input-group-button>
        </plank-input-group-addon>
      </plank-input-group>
    `
    await customElements.whenDefined("plank-input-group")
    await customElements.whenDefined("plank-input-group-addon")
    await customElements.whenDefined("plank-input-group-input")
    await customElements.whenDefined("plank-input-group-button")

    const button = container.querySelector(
      "plank-input-group-button"
    )! as PlankInputGroupButton
    await button.updateComplete

    const nativeButton = button.querySelector("button")!
    expect(nativeButton).toBeTruthy()
  })

  it("renders textarea with block addons", async () => {
    container.innerHTML = `
      <plank-input-group>
        <plank-input-group-textarea placeholder="Enter message..."></plank-input-group-textarea>
        <plank-input-group-addon align="block-end">
          <plank-input-group-text>120 characters left</plank-input-group-text>
        </plank-input-group-addon>
      </plank-input-group>
    `
    await customElements.whenDefined("plank-input-group")
    await customElements.whenDefined("plank-input-group-addon")
    await customElements.whenDefined("plank-input-group-textarea")
    await customElements.whenDefined("plank-input-group-text")

    const textarea = container.querySelector(
      "plank-input-group-textarea"
    )! as PlankInputGroupTextarea
    await textarea.updateComplete

    const nativeTextarea = textarea.querySelector("textarea")!
    expect(nativeTextarea).toBeTruthy()

    const addon = container.querySelector(
      "plank-input-group-addon"
    )! as PlankInputGroupAddon
    expect(addon.dataset.align).toBe("block-end")
  })
})
