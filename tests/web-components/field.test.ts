import { describe, it, expect, beforeEach } from "vitest"
import "@/web-components/plank-field"
import type { PlankField } from "@/web-components/plank-field"

describe("PlankField (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    await customElements.whenDefined("plank-field")
    const elements = container.querySelectorAll("[data-slot]")
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankField).updateComplete)
    )
  }

  it("Field renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-field>Content</plank-field>`)
    const field = container.querySelector("plank-field")
    expect(field?.dataset.slot).toBe("field")
  })

  it("Field renders with role=group", async () => {
    await renderAndWait(`<plank-field>Content</plank-field>`)
    const field = container.querySelector("plank-field")
    expect(field?.getAttribute("role")).toBe("group")
  })

  it("Field defaults to vertical orientation", async () => {
    await renderAndWait(`<plank-field>Content</plank-field>`)
    const field = container.querySelector("plank-field")
    expect(field?.dataset.orientation).toBe("vertical")
  })

  it("Field supports horizontal orientation", async () => {
    await renderAndWait(
      `<plank-field orientation="horizontal">Content</plank-field>`
    )
    const field = container.querySelector("plank-field")
    expect(field?.dataset.orientation).toBe("horizontal")
  })

  it("FieldGroup renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-field-group>Content</plank-field-group>`)
    const group = container.querySelector("plank-field-group")
    expect(group?.dataset.slot).toBe("field-group")
  })

  it("FieldSet renders with role=group", async () => {
    await renderAndWait(`<plank-field-set>Content</plank-field-set>`)
    const fieldset = container.querySelector("plank-field-set")
    expect(fieldset?.dataset.slot).toBe("field-set")
    expect(fieldset?.getAttribute("role")).toBe("group")
  })

  it("FieldLegend renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-field-legend>Title</plank-field-legend>`)
    const legend = container.querySelector("plank-field-legend")
    expect(legend?.dataset.slot).toBe("field-legend")
    expect(legend?.textContent).toContain("Title")
  })

  it("FieldLegend supports variant attribute", async () => {
    await renderAndWait(
      `<plank-field-legend variant="label">Label Title</plank-field-legend>`
    )
    const legend = container.querySelector("plank-field-legend")
    expect(legend?.dataset.variant).toBe("label")
  })

  it("FieldLabel renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-field-label>Email</plank-field-label>`)
    const label = container.querySelector("plank-field-label")
    expect(label?.dataset.slot).toBe("field-label")
  })

  it("FieldTitle renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-field-title>Settings</plank-field-title>`)
    const title = container.querySelector("plank-field-title")
    expect(title?.dataset.slot).toBe("field-label")
  })

  it("FieldContent renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-field-content>Content</plank-field-content>`)
    const content = container.querySelector("plank-field-content")
    expect(content?.dataset.slot).toBe("field-content")
  })

  it("FieldDescription renders with data-slot attribute", async () => {
    await renderAndWait(
      `<plank-field-description>Help text</plank-field-description>`
    )
    const desc = container.querySelector("plank-field-description")
    expect(desc?.dataset.slot).toBe("field-description")
    expect(desc?.textContent).toContain("Help text")
  })

  it("FieldError renders with role=alert", async () => {
    await renderAndWait(`<plank-field-error>Error message</plank-field-error>`)
    const error = container.querySelector("plank-field-error")
    expect(error?.dataset.slot).toBe("field-error")
    expect(error?.getAttribute("role")).toBe("alert")
  })

  it("FieldSeparator renders with data-slot attribute", async () => {
    await renderAndWait(`<plank-field-separator></plank-field-separator>`)
    const separator = container.querySelector("plank-field-separator")
    expect(separator?.dataset.slot).toBe("field-separator")
  })

  it("FieldSeparator supports content", async () => {
    await renderAndWait(`<plank-field-separator>or</plank-field-separator>`)
    const separator = container.querySelector("plank-field-separator")
    expect(separator?.dataset.content).toBe("true")
    expect(separator?.textContent).toContain("or")
  })

  it("renders full field composition", async () => {
    await renderAndWait(`
      <plank-field-group>
        <plank-field>
          <plank-field-label>Email</plank-field-label>
          <input type="email" placeholder="email@example.com" />
          <plank-field-description>Your email address</plank-field-description>
        </plank-field>
      </plank-field-group>
    `)
    const group = container.querySelector("plank-field-group")
    expect(group?.textContent).toContain("Email")
    expect(group?.textContent).toContain("Your email address")
  })
})
