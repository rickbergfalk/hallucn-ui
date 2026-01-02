import { describe, it, expect, beforeEach, afterEach } from "vitest"
import "@/web-components/plank-button-group"
import "@/web-components/plank-button"
import "@/web-components/plank-separator"
import type { PlankButtonGroup } from "@/web-components/plank-button-group"

describe("PlankButtonGroup", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  async function renderAndWait(html: string): Promise<PlankButtonGroup> {
    container.innerHTML = html
    await customElements.whenDefined("plank-button-group")
    const element = container.querySelector(
      "plank-button-group"
    ) as PlankButtonGroup
    await element.updateComplete
    return element
  }

  describe("attributes", () => {
    it("should have default horizontal orientation", async () => {
      const element = await renderAndWait(`
        <plank-button-group>
          <plank-button>Test</plank-button>
        </plank-button-group>
      `)
      expect(element.orientation).toBe("horizontal")
      expect(element.getAttribute("data-orientation")).toBe("horizontal")
    })

    it("should support vertical orientation", async () => {
      const element = await renderAndWait(`
        <plank-button-group orientation="vertical">
          <plank-button>Test</plank-button>
        </plank-button-group>
      `)
      expect(element.orientation).toBe("vertical")
      expect(element.getAttribute("data-orientation")).toBe("vertical")
    })

    it("should have role=group", async () => {
      const element = await renderAndWait(`
        <plank-button-group>
          <plank-button>Test</plank-button>
        </plank-button-group>
      `)
      expect(element.getAttribute("role")).toBe("group")
    })

    it("should have data-slot=button-group", async () => {
      const element = await renderAndWait(`
        <plank-button-group>
          <plank-button>Test</plank-button>
        </plank-button-group>
      `)
      expect(element.dataset.slot).toBe("button-group")
    })

    it("should apply appropriate classes for horizontal orientation", async () => {
      const element = await renderAndWait(`
        <plank-button-group>
          <plank-button>Test</plank-button>
        </plank-button-group>
      `)
      expect(element.className).toContain("flex")
      expect(element.className).toContain("items-stretch")
    })

    it("should apply flex-col for vertical orientation", async () => {
      const element = await renderAndWait(`
        <plank-button-group orientation="vertical">
          <plank-button>Test</plank-button>
        </plank-button-group>
      `)
      expect(element.className).toContain("flex-col")
    })
  })

  describe("children preservation", () => {
    it("should preserve button children", async () => {
      await renderAndWait(`
        <plank-button-group>
          <plank-button>First</plank-button>
          <plank-button>Second</plank-button>
          <plank-button>Third</plank-button>
        </plank-button-group>
      `)
      const buttons = container.querySelectorAll("plank-button")
      expect(buttons.length).toBe(3)
      expect(buttons[0].textContent).toBe("First")
      expect(buttons[1].textContent).toBe("Second")
      expect(buttons[2].textContent).toBe("Third")
    })
  })
})

describe("PlankButtonGroupText", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("should render text content", async () => {
    container.innerHTML = `
      <plank-button-group-text>Label Text</plank-button-group-text>
    `
    await customElements.whenDefined("plank-button-group-text")
    const element = container.querySelector("plank-button-group-text")!
    expect(element.textContent).toContain("Label Text")
  })

  it("should have muted background styling", async () => {
    container.innerHTML = `
      <plank-button-group-text>Label</plank-button-group-text>
    `
    await customElements.whenDefined("plank-button-group-text")
    const element = container.querySelector(
      "plank-button-group-text"
    ) as HTMLElement
    await (element as any).updateComplete
    expect(element.className).toContain("bg-muted")
  })
})

describe("PlankButtonGroupSeparator", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("should have default vertical orientation", async () => {
    container.innerHTML = `
      <plank-button-group-separator></plank-button-group-separator>
    `
    await customElements.whenDefined("plank-button-group-separator")
    const element = container.querySelector(
      "plank-button-group-separator"
    ) as HTMLElement
    await (element as any).updateComplete
    expect(element.getAttribute("data-orientation")).toBe("vertical")
  })

  it("should have data-slot=button-group-separator", async () => {
    container.innerHTML = `
      <plank-button-group-separator></plank-button-group-separator>
    `
    await customElements.whenDefined("plank-button-group-separator")
    const element = container.querySelector(
      "plank-button-group-separator"
    ) as HTMLElement
    await (element as any).updateComplete
    expect(element.dataset.slot).toBe("button-group-separator")
  })

  it("should have bg-input class", async () => {
    container.innerHTML = `
      <plank-button-group-separator></plank-button-group-separator>
    `
    await customElements.whenDefined("plank-button-group-separator")
    const element = container.querySelector(
      "plank-button-group-separator"
    ) as HTMLElement
    await (element as any).updateComplete
    expect(element.className).toContain("bg-input")
  })
})
