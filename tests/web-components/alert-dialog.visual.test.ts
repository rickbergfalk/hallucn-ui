import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-alert-dialog"
import "@/web-components/plank-button"

describe("AlertDialog (Web Component) - Visual", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    // Clean up any portaled content
    document
      .querySelectorAll('[data-slot="alert-dialog-portal"]')
      .forEach((el) => el.remove())
    document
      .querySelectorAll('[data-slot="alert-dialog-overlay"]')
      .forEach((el) => el.remove())
    document
      .querySelectorAll('[data-slot="alert-dialog-content"]')
      .forEach((el) => el.remove())
    document
      .querySelectorAll('[role="alertdialog"]')
      .forEach((el) => el.remove())
  })

  it("alert dialog with confirmation", async () => {
    container.innerHTML = `
      <div data-testid="container" style="width: 800px; height: 600px; position: relative;">
        <plank-alert-dialog open>
          <plank-alert-dialog-content>
            <plank-alert-dialog-header>
              <plank-alert-dialog-title>Are you absolutely sure?</plank-alert-dialog-title>
              <plank-alert-dialog-description>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </plank-alert-dialog-description>
            </plank-alert-dialog-header>
            <plank-alert-dialog-footer>
              <plank-alert-dialog-cancel>Cancel</plank-alert-dialog-cancel>
              <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
            </plank-alert-dialog-footer>
          </plank-alert-dialog-content>
        </plank-alert-dialog>
      </div>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-dialog-confirmation"
    )
  })

  it("alert dialog simple", async () => {
    container.innerHTML = `
      <div data-testid="container" style="width: 800px; height: 400px; position: relative;">
        <plank-alert-dialog open>
          <plank-alert-dialog-content>
            <plank-alert-dialog-header>
              <plank-alert-dialog-title>Delete Item</plank-alert-dialog-title>
              <plank-alert-dialog-description>
                Are you sure you want to delete this item?
              </plank-alert-dialog-description>
            </plank-alert-dialog-header>
            <plank-alert-dialog-footer>
              <plank-alert-dialog-cancel>No</plank-alert-dialog-cancel>
              <plank-alert-dialog-action>Yes</plank-alert-dialog-action>
            </plank-alert-dialog-footer>
          </plank-alert-dialog-content>
        </plank-alert-dialog>
      </div>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-dialog-simple"
    )
  })
})
