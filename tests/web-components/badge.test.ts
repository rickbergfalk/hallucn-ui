import { describe, it, expect, beforeEach } from "vitest"
import "@/web-components/plank-badge"
import type { PlankBadge } from "@/web-components/plank-badge"

describe("PlankBadge (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<PlankBadge> {
    container.innerHTML = html
    await customElements.whenDefined("plank-badge")
    const badge = container.querySelector("plank-badge") as PlankBadge
    await badge.updateComplete
    return badge
  }

  it("renders with default variant", async () => {
    const badge = await renderAndWait(`<plank-badge>New</plank-badge>`)
    expect(badge).toBeDefined()
    expect(badge.textContent).toBe("New")
    expect(badge.dataset.slot).toBe("badge")
  })

  it("renders with secondary variant", async () => {
    const badge = await renderAndWait(`<plank-badge variant="secondary">Secondary</plank-badge>`)
    expect(badge).toBeDefined()
    expect(badge.textContent).toBe("Secondary")
  })

  it("renders with destructive variant", async () => {
    const badge = await renderAndWait(`<plank-badge variant="destructive">Error</plank-badge>`)
    expect(badge).toBeDefined()
    expect(badge.textContent).toBe("Error")
  })

  it("renders with outline variant", async () => {
    const badge = await renderAndWait(`<plank-badge variant="outline">Outline</plank-badge>`)
    expect(badge).toBeDefined()
    expect(badge.textContent).toBe("Outline")
  })

  it("applies variant classes", async () => {
    const badge = await renderAndWait(`<plank-badge>Tag</plank-badge>`)
    expect(badge.classList.contains("bg-primary")).toBe(true)
    expect(badge.classList.contains("text-primary-foreground")).toBe(true)
  })
})
