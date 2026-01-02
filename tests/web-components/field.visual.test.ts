import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-field"
import "@/web-components/plank-input"
import "@/web-components/plank-checkbox"
import type { PlankField } from "@/web-components/plank-field"

describe("PlankField (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  async function renderAndWait(html: string): Promise<void> {
    container.innerHTML = html
    // Wait for all field-related elements
    const fieldElements = [
      "plank-field",
      "plank-field-group",
      "plank-field-set",
      "plank-field-legend",
      "plank-field-label",
      "plank-field-title",
      "plank-field-content",
      "plank-field-description",
      "plank-field-error",
      "plank-field-separator",
      "plank-input",
      "plank-checkbox",
    ]
    await Promise.all(
      fieldElements.map((el) => customElements.whenDefined(el).catch(() => {}))
    )
    const elements = container.querySelectorAll(
      fieldElements.map((e) => e).join(", ")
    )
    await Promise.all(
      Array.from(elements).map((el) => (el as PlankField).updateComplete)
    )
  }

  it("basic vertical field matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-field>
          <plank-field-label>Email</plank-field-label>
          <plank-input type="email" placeholder="email@example.com"></plank-input>
        </plank-field>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-basic-vertical"
    )
  })

  it("field with description matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-field>
          <plank-field-label>Username</plank-field-label>
          <plank-input placeholder="johndoe"></plank-input>
          <plank-field-description>
            This will be your public display name.
          </plank-field-description>
        </plank-field>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-with-description"
    )
  })

  it("field with error matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-field data-invalid="true">
          <plank-field-label>Password</plank-field-label>
          <plank-input type="password"></plank-input>
          <plank-field-error>Password must be at least 8 characters.</plank-field-error>
        </plank-field>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-with-error"
    )
  })

  it("horizontal field matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-field orientation="horizontal">
          <plank-checkbox id="terms"></plank-checkbox>
          <plank-field-content>
            <plank-field-label for="terms">Accept terms and conditions</plank-field-label>
            <plank-field-description>
              You agree to our Terms of Service and Privacy Policy.
            </plank-field-description>
          </plank-field-content>
        </plank-field>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-horizontal"
    )
  })

  it("field group matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-field-group>
          <plank-field>
            <plank-field-label>First name</plank-field-label>
            <plank-input placeholder="John"></plank-input>
          </plank-field>
          <plank-field>
            <plank-field-label>Last name</plank-field-label>
            <plank-input placeholder="Doe"></plank-input>
          </plank-field>
        </plank-field-group>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("field-group")
  })

  it("fieldset with legend matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-field-set>
          <plank-field-legend>Personal Information</plank-field-legend>
          <plank-field-description>Please fill in your details below.</plank-field-description>
          <plank-field-group>
            <plank-field>
              <plank-field-label>Name</plank-field-label>
              <plank-input placeholder="Your name"></plank-input>
            </plank-field>
            <plank-field>
              <plank-field-label>Email</plank-field-label>
              <plank-input type="email" placeholder="email@example.com"></plank-input>
            </plank-field>
          </plank-field-group>
        </plank-field-set>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-fieldset"
    )
  })

  it("field separator matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-field-group>
          <plank-field>
            <plank-field-label>Email</plank-field-label>
            <plank-input type="email" placeholder="email@example.com"></plank-input>
          </plank-field>
          <plank-field-separator>or</plank-field-separator>
          <plank-field>
            <plank-field-label>Phone</plank-field-label>
            <plank-input type="tel" placeholder="+1 (555) 000-0000"></plank-input>
          </plank-field>
        </plank-field-group>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-separator"
    )
  })

  it("field with title matches React", async () => {
    await renderAndWait(`
      <div data-testid="container" style="padding: 8px; width: 350px;">
        <plank-field>
          <plank-field-title>Notification Settings</plank-field-title>
          <plank-field-description>
            Choose how you want to receive notifications.
          </plank-field-description>
        </plank-field>
      </div>
    `)
    await expect(page.getByTestId("container")).toMatchScreenshot("field-title")
  })
})
