import { describe, it, expect, beforeEach } from "vitest"
import "@/web-components/plank-card"
import type { PlankCard } from "@/web-components/plank-card"

describe("PlankCard (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-card")
    const elements = container.querySelectorAll("[data-slot]")
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankCard).updateComplete)
    )
  }

  it("Card renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-card>Content</plank-card>`)
    const card = container.querySelector("plank-card")
    expect(card?.dataset.slot).toBe("card")
  })

  it("CardHeader renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-card-header>Header</plank-card-header>`)
    const header = container.querySelector("plank-card-header")
    expect(header?.dataset.slot).toBe("card-header")
  })

  it("CardTitle renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-card-title>Title</plank-card-title>`)
    const title = container.querySelector("plank-card-title")
    expect(title?.dataset.slot).toBe("card-title")
  })

  it("CardDescription renders with data-slot attribute", async () => {
    await renderAndWait(
      `<plank-card-description>Description</plank-card-description>`
    )
    const desc = container.querySelector("plank-card-description")
    expect(desc?.dataset.slot).toBe("card-description")
  })

  it("CardAction renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-card-action>Action</plank-card-action>`)
    const action = container.querySelector("plank-card-action")
    expect(action?.dataset.slot).toBe("card-action")
  })

  it("CardContent renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-card-content>Content</plank-card-content>`)
    const content = container.querySelector("plank-card-content")
    expect(content?.dataset.slot).toBe("card-content")
  })

  it("CardFooter renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-card-footer>Footer</plank-card-footer>`)
    const footer = container.querySelector("plank-card-footer")
    expect(footer?.dataset.slot).toBe("card-footer")
  })

  it("renders full card composition", async () => {
    await renderAndWait(`
      <plank-card>
        <plank-card-header>
          <plank-card-title>Title</plank-card-title>
          <plank-card-description>Description</plank-card-description>
        </plank-card-header>
        <plank-card-content>Content here</plank-card-content>
        <plank-card-footer>Footer here</plank-card-footer>
      </plank-card>
    `)
    const card = container.querySelector("plank-card")
    expect(card?.textContent).toContain("Title")
    expect(card?.textContent).toContain("Description")
    expect(card?.textContent).toContain("Content here")
    expect(card?.textContent).toContain("Footer here")
  })
})
