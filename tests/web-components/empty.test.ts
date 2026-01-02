import { describe, it, expect, beforeEach } from "vitest"
import "@/web-components/plank-empty"
import type { PlankEmpty } from "@/web-components/plank-empty"

describe("PlankEmpty (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-empty")
    const elements = container.querySelectorAll("[data-slot]")
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankEmpty).updateComplete)
    )
  }

  it("Empty renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-empty>Content</plank-empty>`)
    const empty = container.querySelector("plank-empty")
    expect(empty?.dataset.slot).toBe("empty")
  })

  it("EmptyHeader renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-empty-header>Header</plank-empty-header>`)
    const header = container.querySelector("plank-empty-header")
    expect(header?.dataset.slot).toBe("empty-header")
  })

  it("EmptyMedia renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-empty-media>Media</plank-empty-media>`)
    const media = container.querySelector("plank-empty-media")
    expect(media?.dataset.slot).toBe("empty-icon")
  })

  it("EmptyMedia renders with default variant", async () => {
    await renderAndWait(`<plank-empty-media>Media</plank-empty-media>`)
    const media = container.querySelector("plank-empty-media")
    expect(media?.dataset.variant).toBe("default")
  })

  it("EmptyMedia renders with icon variant", async () => {
    await renderAndWait(
      `<plank-empty-media variant="icon">Media</plank-empty-media>`
    )
    const media = container.querySelector("plank-empty-media")
    expect(media?.dataset.variant).toBe("icon")
  })

  it("EmptyTitle renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-empty-title>Title</plank-empty-title>`)
    const title = container.querySelector("plank-empty-title")
    expect(title?.dataset.slot).toBe("empty-title")
  })

  it("EmptyDescription renders with data-slot attribute", async () => {
    await renderAndWait(
      `<plank-empty-description>Description</plank-empty-description>`
    )
    const desc = container.querySelector("plank-empty-description")
    expect(desc?.dataset.slot).toBe("empty-description")
  })

  it("EmptyContent renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-empty-content>Content</plank-empty-content>`)
    const content = container.querySelector("plank-empty-content")
    expect(content?.dataset.slot).toBe("empty-content")
  })

  it("renders full empty composition", async () => {
    await renderAndWait(`
      <plank-empty>
        <plank-empty-header>
          <plank-empty-media variant="icon">Icon</plank-empty-media>
          <plank-empty-title>Title</plank-empty-title>
          <plank-empty-description>Description</plank-empty-description>
        </plank-empty-header>
        <plank-empty-content>Actions here</plank-empty-content>
      </plank-empty>
    `)
    const empty = container.querySelector("plank-empty")
    expect(empty?.textContent).toContain("Title")
    expect(empty?.textContent).toContain("Description")
    expect(empty?.textContent).toContain("Actions here")
  })
})
