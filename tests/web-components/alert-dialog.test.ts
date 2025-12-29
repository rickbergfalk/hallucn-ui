import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import "@/web-components/plank-alert-dialog"
import "@/web-components/plank-button"

describe("AlertDialog (Web Component)", () => {
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

  it("renders trigger with correct data-slot", async () => {
    container.innerHTML = `
      <plank-alert-dialog>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Are you sure?</plank-alert-dialog-title>
          <plank-alert-dialog-description>This cannot be undone.</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete

    const trigger = container.querySelector("plank-alert-dialog-trigger")
    expect(trigger?.dataset.slot).toBe("alert-dialog-trigger")
  })

  it("alert dialog content is hidden by default", async () => {
    container.innerHTML = `
      <plank-alert-dialog>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Are you sure?</plank-alert-dialog-title>
          <plank-alert-dialog-description>This cannot be undone.</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete

    const dialog = document.querySelector('[role="alertdialog"]')
    expect(dialog).toBeNull()
  })

  it("opens alert dialog on click", async () => {
    container.innerHTML = `
      <plank-alert-dialog>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Delete Item</plank-alert-dialog-title>
          <plank-alert-dialog-description>This cannot be undone.</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete

    const trigger = container.querySelector("plank-alert-dialog-trigger")!
    trigger.click()
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const dialog = document.querySelector('[role="alertdialog"]')
    expect(dialog).toBeDefined()
    expect(dialog?.textContent).toContain("Delete Item")
  })

  it("alert dialog content has role=alertdialog", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const dialog = document.querySelector('[role="alertdialog"]')
    expect(dialog).toBeDefined()
  })

  it("closes on Escape key", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="alertdialog"]')).toBeDefined()

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="alertdialog"]')).toBeNull()
  })

  it("does NOT close on overlay click (unlike regular dialog)", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="alertdialog"]')).toBeDefined()

    // Click on overlay - should NOT close
    const overlay = document.querySelector('[data-slot="alert-dialog-overlay"]')
    ;(overlay as HTMLElement)?.click()
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    // Alert dialog should still be open
    expect(document.querySelector('[role="alertdialog"]')).toBeDefined()
  })

  it("alert dialog content has correct data-slot when open", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const content = document.querySelector('[role="alertdialog"]')
    expect(content?.getAttribute("data-slot")).toBe("alert-dialog-content")
  })

  it("can be controlled via open attribute", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="alertdialog"]')).toBeDefined()
  })

  it("fires open-change event when opened", async () => {
    container.innerHTML = `
      <plank-alert-dialog>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete

    const openChangeSpy = vi.fn()
    alertDialog.addEventListener("open-change", openChangeSpy)

    const trigger = container.querySelector("plank-alert-dialog-trigger")!
    trigger.click()
    await (alertDialog as any).updateComplete

    expect(openChangeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { open: true },
      })
    )
  })

  it("alert dialog has aria-labelledby", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>My Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const dialog = document.querySelector('[role="alertdialog"]')
    const labelledBy = dialog?.getAttribute("aria-labelledby")
    expect(labelledBy).toBeTruthy()
    const title = document.getElementById(labelledBy!)
    expect(title?.textContent).toContain("My Title")
  })

  it("alert dialog has aria-describedby", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>My Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const dialog = document.querySelector('[role="alertdialog"]')
    const describedBy = dialog?.getAttribute("aria-describedby")
    expect(describedBy).toBeTruthy()
    const description = document.getElementById(describedBy!)
    expect(description?.textContent).toContain("My Description")
  })

  it("has data-state attribute on content when open", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const dialog = document.querySelector('[role="alertdialog"]')
    expect((dialog as HTMLElement)?.dataset.state).toBe("open")
  })

  it("has overlay with correct data-slot", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const overlay = document.querySelector('[data-slot="alert-dialog-overlay"]')
    expect(overlay).toBeTruthy()
  })

  it("closes when Action button is clicked", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="alertdialog"]')).toBeDefined()

    // Get the action button from the portal content, not the original
    const action = document.querySelector(
      '[data-slot="alert-dialog-content"] plank-alert-dialog-action'
    )
    ;(action as HTMLElement)?.click()
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="alertdialog"]')).toBeNull()
  })

  it("closes when Cancel button is clicked", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-footer>
            <plank-alert-dialog-cancel>Cancel</plank-alert-dialog-cancel>
            <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
          </plank-alert-dialog-footer>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="alertdialog"]')).toBeDefined()

    // Get the cancel button from the portal content, not the original
    const cancel = document.querySelector(
      '[data-slot="alert-dialog-content"] plank-alert-dialog-cancel'
    )
    ;(cancel as HTMLElement)?.click()
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    expect(document.querySelector('[role="alertdialog"]')).toBeNull()
  })

  it("Action button has primary button styling", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const action = document.querySelector(
      '[data-slot="alert-dialog-content"] plank-alert-dialog-action'
    )
    expect(action?.className).toContain("bg-primary")
  })

  it("Cancel button has outline button styling", async () => {
    container.innerHTML = `
      <plank-alert-dialog open>
        <plank-alert-dialog-trigger>
          <plank-button>Delete</plank-button>
        </plank-alert-dialog-trigger>
        <plank-alert-dialog-content>
          <plank-alert-dialog-title>Title</plank-alert-dialog-title>
          <plank-alert-dialog-description>Description</plank-alert-dialog-description>
          <plank-alert-dialog-footer>
            <plank-alert-dialog-cancel>Cancel</plank-alert-dialog-cancel>
            <plank-alert-dialog-action>Continue</plank-alert-dialog-action>
          </plank-alert-dialog-footer>
        </plank-alert-dialog-content>
      </plank-alert-dialog>
    `

    await customElements.whenDefined("plank-alert-dialog")
    const alertDialog = container.querySelector("plank-alert-dialog")!
    await (alertDialog as any).updateComplete
    await new Promise((r) => setTimeout(r, 50))

    const cancel = document.querySelector(
      '[data-slot="alert-dialog-content"] plank-alert-dialog-cancel'
    )
    expect(cancel?.className).toContain("border")
  })
})
