import { describe, it, expect, beforeEach, afterEach } from "vitest"
import "@/web-components/plank-input-group"
import type {
  PlankInputGroup,
  PlankInputGroupTextarea,
} from "@/web-components/plank-input-group"

describe("plank-input-group visual", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.id = "test-container"
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("matches input with icon addon appearance", async () => {
    container.innerHTML = `
      <div style="padding: 20px; width: 300px;">
        <plank-input-group>
          <plank-input-group-addon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </plank-input-group-addon>
          <plank-input-group-input placeholder="Search..."></plank-input-group-input>
        </plank-input-group>
      </div>
    `
    await customElements.whenDefined("plank-input-group")
    await customElements.whenDefined("plank-input-group-addon")
    await customElements.whenDefined("plank-input-group-input")
    const group = container.querySelector(
      "plank-input-group"
    )! as PlankInputGroup
    await group.updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(container).toMatchFileSnapshot(
      `__snapshots__/input-group-icon-chromium.png`
    )
  })

  it("matches input with text addons appearance", async () => {
    container.innerHTML = `
      <div style="padding: 20px; width: 300px;">
        <plank-input-group>
          <plank-input-group-addon>
            <plank-input-group-text>$</plank-input-group-text>
          </plank-input-group-addon>
          <plank-input-group-input placeholder="0.00"></plank-input-group-input>
          <plank-input-group-addon align="inline-end">
            <plank-input-group-text>USD</plank-input-group-text>
          </plank-input-group-addon>
        </plank-input-group>
      </div>
    `
    await customElements.whenDefined("plank-input-group")
    await customElements.whenDefined("plank-input-group-addon")
    await customElements.whenDefined("plank-input-group-input")
    await customElements.whenDefined("plank-input-group-text")
    const group = container.querySelector(
      "plank-input-group"
    )! as PlankInputGroup
    await group.updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(container).toMatchFileSnapshot(
      `__snapshots__/input-group-text-chromium.png`
    )
  })

  it("matches input with button addon appearance", async () => {
    container.innerHTML = `
      <div style="padding: 20px; width: 300px;">
        <plank-input-group>
          <plank-input-group-input placeholder="Type to search..."></plank-input-group-input>
          <plank-input-group-addon align="inline-end">
            <plank-input-group-button variant="secondary">Search</plank-input-group-button>
          </plank-input-group-addon>
        </plank-input-group>
      </div>
    `
    await customElements.whenDefined("plank-input-group")
    await customElements.whenDefined("plank-input-group-addon")
    await customElements.whenDefined("plank-input-group-input")
    await customElements.whenDefined("plank-input-group-button")
    const group = container.querySelector(
      "plank-input-group"
    )! as PlankInputGroup
    await group.updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(container).toMatchFileSnapshot(
      `__snapshots__/input-group-button-chromium.png`
    )
  })

  it("matches textarea with block addon appearance", async () => {
    container.innerHTML = `
      <div style="padding: 20px; width: 300px;">
        <plank-input-group>
          <plank-input-group-textarea placeholder="Enter message..."></plank-input-group-textarea>
          <plank-input-group-addon align="block-end">
            <plank-input-group-text>120 characters left</plank-input-group-text>
          </plank-input-group-addon>
        </plank-input-group>
      </div>
    `
    await customElements.whenDefined("plank-input-group")
    await customElements.whenDefined("plank-input-group-addon")
    await customElements.whenDefined("plank-input-group-textarea")
    await customElements.whenDefined("plank-input-group-text")
    const textarea = container.querySelector(
      "plank-input-group-textarea"
    )! as PlankInputGroupTextarea
    await textarea.updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(container).toMatchFileSnapshot(
      `__snapshots__/input-group-textarea-chromium.png`
    )
  })
})
