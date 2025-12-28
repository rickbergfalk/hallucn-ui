import { describe, it, expect, beforeEach, afterEach } from "vitest"
import "@/web-components/plank-alert"
import type { PlankAlert } from "@/web-components/plank-alert"

describe("PlankAlert (Web Component)", () => {
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
    await customElements.whenDefined("plank-alert")
    const elements = container.querySelectorAll("[data-slot]")
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankAlert).updateComplete)
    )
  }

  describe("PlankAlert", () => {
    it("renders with data-slot attribute", async () => {
      await renderAndWait(`<plank-alert>Content</plank-alert>`)
      const alert = container.querySelector("plank-alert")
      expect(alert?.dataset.slot).toBe("alert")
    })

    it("has role='alert' for accessibility", async () => {
      await renderAndWait(`<plank-alert>Content</plank-alert>`)
      const alert = container.querySelector("plank-alert")
      expect(alert?.getAttribute("role")).toBe("alert")
    })

    it("should not have tabindex (alerts are passive, not focusable)", async () => {
      await renderAndWait(`<plank-alert>Content</plank-alert>`)
      const alert = container.querySelector("plank-alert")
      // Alerts should NOT receive focus - they are live regions that announce passively
      expect(alert?.hasAttribute("tabindex")).toBe(false)
    })

    it("renders with default variant classes", async () => {
      await renderAndWait(`<plank-alert>Content</plank-alert>`)
      const alert = container.querySelector("plank-alert")
      expect(alert?.classList.contains("bg-card")).toBe(true)
      expect(alert?.classList.contains("text-card-foreground")).toBe(true)
    })

    it("renders with destructive variant classes", async () => {
      await renderAndWait(
        `<plank-alert variant="destructive">Content</plank-alert>`
      )
      const alert = container.querySelector("plank-alert")
      expect(alert?.classList.contains("text-destructive")).toBe(true)
    })

    it("preserves children content", async () => {
      await renderAndWait(`<plank-alert>Test Content</plank-alert>`)
      const alert = container.querySelector("plank-alert")
      expect(alert?.textContent).toContain("Test Content")
    })
  })

  describe("PlankAlertTitle", () => {
    it("renders with data-slot attribute", async () => {
      await renderAndWait(
        `<plank-alert-title>Title Content</plank-alert-title>`
      )
      const title = container.querySelector("plank-alert-title")
      expect(title?.dataset.slot).toBe("alert-title")
    })

    it("preserves children content", async () => {
      await renderAndWait(
        `<plank-alert-title>Title Content</plank-alert-title>`
      )
      const title = container.querySelector("plank-alert-title")
      expect(title?.textContent).toContain("Title Content")
    })
  })

  describe("PlankAlertDescription", () => {
    it("renders with data-slot attribute", async () => {
      await renderAndWait(
        `<plank-alert-description>Description Content</plank-alert-description>`
      )
      const desc = container.querySelector("plank-alert-description")
      expect(desc?.dataset.slot).toBe("alert-description")
    })

    it("preserves children content", async () => {
      await renderAndWait(
        `<plank-alert-description>Description Content</plank-alert-description>`
      )
      const desc = container.querySelector("plank-alert-description")
      expect(desc?.textContent).toContain("Description Content")
    })
  })

  describe("Full composition", () => {
    it("renders complete alert with icon, title, and description", async () => {
      await renderAndWait(`
        <plank-alert>
          <svg>icon</svg>
          <plank-alert-title>Success!</plank-alert-title>
          <plank-alert-description>Your changes have been saved.</plank-alert-description>
        </plank-alert>
      `)
      const alert = container.querySelector("plank-alert")
      expect(alert?.textContent).toContain("Success!")
      expect(alert?.textContent).toContain("Your changes have been saved.")
      expect(alert?.querySelector("svg")).toBeTruthy()
    })

    it("renders destructive alert composition", async () => {
      await renderAndWait(`
        <plank-alert variant="destructive">
          <svg>icon</svg>
          <plank-alert-title>Error</plank-alert-title>
          <plank-alert-description>Something went wrong.</plank-alert-description>
        </plank-alert>
      `)
      const alert = container.querySelector("plank-alert")
      expect(alert?.classList.contains("text-destructive")).toBe(true)
      expect(alert?.textContent).toContain("Error")
      expect(alert?.textContent).toContain("Something went wrong.")
    })
  })
})
