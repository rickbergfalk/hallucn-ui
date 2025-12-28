import { describe, it, expect, beforeEach } from "vitest"
import "@/web-components/plank-skeleton"
import type { PlankSkeleton } from "@/web-components/plank-skeleton"

describe("PlankSkeleton (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<PlankSkeleton> {
    container.innerHTML = html
    await customElements.whenDefined("plank-skeleton")
    const skeleton = container.querySelector("plank-skeleton") as PlankSkeleton
    await skeleton.updateComplete
    return skeleton
  }

  it("renders with data-slot attribute", async () => {
    const skeleton = await renderAndWait(`<plank-skeleton></plank-skeleton>`)
    expect(skeleton).toBeDefined()
    expect(skeleton.dataset.slot).toBe("skeleton")
  })

  it("has pulse animation class", async () => {
    const skeleton = await renderAndWait(`<plank-skeleton></plank-skeleton>`)
    expect(skeleton.classList.contains("animate-pulse")).toBe(true)
  })

  it("has background and rounded classes", async () => {
    const skeleton = await renderAndWait(`<plank-skeleton></plank-skeleton>`)
    expect(skeleton.classList.contains("bg-accent")).toBe(true)
    expect(skeleton.classList.contains("rounded-md")).toBe(true)
  })

  it("preserves custom classes", async () => {
    const skeleton = await renderAndWait(
      `<plank-skeleton class="h-4 w-32"></plank-skeleton>`
    )
    expect(skeleton.classList.contains("h-4")).toBe(true)
    expect(skeleton.classList.contains("w-32")).toBe(true)
    // Also has base classes
    expect(skeleton.classList.contains("animate-pulse")).toBe(true)
  })

  it("is display block", async () => {
    const skeleton = await renderAndWait(`<plank-skeleton></plank-skeleton>`)
    expect(skeleton.classList.contains("block")).toBe(true)
  })
})
