import { describe, it, expect, beforeEach } from "vitest"
import "../../src/web-components/plank-collapsible"
import type {
  PlankCollapsible,
  PlankCollapsibleTrigger,
  PlankCollapsibleContent,
} from "../../src/web-components/plank-collapsible"

describe("plank-collapsible", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
    return () => {
      container.remove()
    }
  })

  describe("PlankCollapsible", () => {
    it("renders with data-slot attribute", async () => {
      container.innerHTML = `<plank-collapsible></plank-collapsible>`
      await customElements.whenDefined("plank-collapsible")
      const el = container.querySelector("plank-collapsible")!
      await (el as PlankCollapsible).updateComplete
      expect(el.dataset.slot).toBe("collapsible")
    })

    it("defaults to closed state (open=false)", async () => {
      container.innerHTML = `<plank-collapsible></plank-collapsible>`
      await customElements.whenDefined("plank-collapsible")
      const el = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await el.updateComplete
      expect(el.open).toBe(false)
      expect(el.dataset.state).toBe("closed")
    })

    it("can be initialized with open attribute", async () => {
      container.innerHTML = `<plank-collapsible open></plank-collapsible>`
      await customElements.whenDefined("plank-collapsible")
      const el = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await el.updateComplete
      expect(el.open).toBe(true)
      expect(el.dataset.state).toBe("open")
    })

    it("applies custom class", async () => {
      container.innerHTML = `<plank-collapsible class="custom-class"></plank-collapsible>`
      await customElements.whenDefined("plank-collapsible")
      const el = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await el.updateComplete
      expect(el.classList.contains("custom-class")).toBe(true)
    })
  })

  describe("PlankCollapsibleTrigger", () => {
    it("renders with data-slot attribute", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible-trigger")
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete
      expect(trigger.dataset.slot).toBe("collapsible-trigger")
    })

    it("has button role", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible-trigger")
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete
      expect(trigger.getAttribute("role")).toBe("button")
    })

    it("has tabindex=0 for keyboard focus", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible-trigger")
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete
      expect(trigger.getAttribute("tabindex")).toBe("0")
    })

    it("has aria-expanded=false when closed", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete
      expect(trigger.getAttribute("aria-expanded")).toBe("false")
    })

    it("has aria-expanded=true when open", async () => {
      container.innerHTML = `
        <plank-collapsible open>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete
      expect(trigger.getAttribute("aria-expanded")).toBe("true")
    })

    it("has aria-controls pointing to content id", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      const content = container.querySelector(
        "plank-collapsible-content"
      ) as PlankCollapsibleContent
      await trigger.updateComplete
      await content.updateComplete
      expect(trigger.getAttribute("aria-controls")).toBe(content.id)
    })

    it("toggles collapsible on click", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete

      expect(collapsible.open).toBe(false)
      trigger.click()
      await collapsible.updateComplete
      expect(collapsible.open).toBe(true)
      trigger.click()
      await collapsible.updateComplete
      expect(collapsible.open).toBe(false)
    })

    it("toggles collapsible on Enter key", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete

      expect(collapsible.open).toBe(false)
      trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))
      await collapsible.updateComplete
      expect(collapsible.open).toBe(true)
    })

    it("toggles collapsible on Space key", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete

      expect(collapsible.open).toBe(false)
      trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " " }))
      await collapsible.updateComplete
      expect(collapsible.open).toBe(true)
    })

    it("does not toggle when disabled", async () => {
      container.innerHTML = `
        <plank-collapsible disabled>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete

      expect(collapsible.open).toBe(false)
      trigger.click()
      await collapsible.updateComplete
      expect(collapsible.open).toBe(false)
    })
  })

  describe("PlankCollapsibleContent", () => {
    it("renders with data-slot attribute", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible-content")
      const content = container.querySelector(
        "plank-collapsible-content"
      ) as PlankCollapsibleContent
      await content.updateComplete
      expect(content.dataset.slot).toBe("collapsible-content")
    })

    it("has auto-generated id for aria-controls", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible-content")
      const content = container.querySelector(
        "plank-collapsible-content"
      ) as PlankCollapsibleContent
      await content.updateComplete
      expect(content.id).toMatch(/^plank-collapsible-content-/)
    })

    it("is hidden when closed", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const content = container.querySelector(
        "plank-collapsible-content"
      ) as PlankCollapsibleContent
      await content.updateComplete
      expect(content.hasAttribute("hidden")).toBe(true)
    })

    it("is visible when open", async () => {
      container.innerHTML = `
        <plank-collapsible open>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const content = container.querySelector(
        "plank-collapsible-content"
      ) as PlankCollapsibleContent
      await content.updateComplete
      expect(content.hasAttribute("hidden")).toBe(false)
    })

    it("has data-state reflecting open state", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const content = container.querySelector(
        "plank-collapsible-content"
      ) as PlankCollapsibleContent
      await content.updateComplete
      expect(content.dataset.state).toBe("closed")

      collapsible.open = true
      await collapsible.updateComplete
      await content.updateComplete
      expect(content.dataset.state).toBe("open")
    })
  })

  describe("Events", () => {
    it("fires open-change event when toggled", async () => {
      container.innerHTML = `
        <plank-collapsible>
          <plank-collapsible-trigger>Toggle</plank-collapsible-trigger>
          <plank-collapsible-content>Content</plank-collapsible-content>
        </plank-collapsible>
      `
      await customElements.whenDefined("plank-collapsible")
      const collapsible = container.querySelector(
        "plank-collapsible"
      ) as PlankCollapsible
      await collapsible.updateComplete
      const trigger = container.querySelector(
        "plank-collapsible-trigger"
      ) as PlankCollapsibleTrigger
      await trigger.updateComplete

      const events: CustomEvent[] = []
      collapsible.addEventListener("open-change", (e) =>
        events.push(e as CustomEvent)
      )

      trigger.click()
      await collapsible.updateComplete
      expect(events.length).toBe(1)
      expect(events[0].detail.open).toBe(true)

      trigger.click()
      await collapsible.updateComplete
      expect(events.length).toBe(2)
      expect(events[1].detail.open).toBe(false)
    })
  })
})
