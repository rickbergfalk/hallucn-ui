import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-input-otp"

/**
 * Visual tests for plank-input-otp web component.
 *
 * These tests compare against the React component screenshots directly
 * (configured in vitest.config.ts via resolveScreenshotPath).
 * The React screenshots serve as the baseline/source of truth.
 */
describe("plank-input-otp visual", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.id = "test-container"
    container.setAttribute("data-testid", "container")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it("matches basic OTP input", async () => {
    container.innerHTML = `
      <div style="padding: 20px;">
        <plank-input-otp max-length="6">
          <plank-input-otp-group>
            <plank-input-otp-slot index="0"></plank-input-otp-slot>
            <plank-input-otp-slot index="1"></plank-input-otp-slot>
            <plank-input-otp-slot index="2"></plank-input-otp-slot>
          </plank-input-otp-group>
          <plank-input-otp-separator></plank-input-otp-separator>
          <plank-input-otp-group>
            <plank-input-otp-slot index="3"></plank-input-otp-slot>
            <plank-input-otp-slot index="4"></plank-input-otp-slot>
            <plank-input-otp-slot index="5"></plank-input-otp-slot>
          </plank-input-otp-group>
        </plank-input-otp>
      </div>
    `
    await customElements.whenDefined("plank-input-otp")
    const otp = container.querySelector("plank-input-otp")! as any
    await otp.updateComplete

    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-otp-basic"
    )
  })

  it("matches OTP with values filled", async () => {
    container.innerHTML = `
      <div style="padding: 20px;">
        <plank-input-otp max-length="6" value="123456">
          <plank-input-otp-group>
            <plank-input-otp-slot index="0"></plank-input-otp-slot>
            <plank-input-otp-slot index="1"></plank-input-otp-slot>
            <plank-input-otp-slot index="2"></plank-input-otp-slot>
          </plank-input-otp-group>
          <plank-input-otp-separator></plank-input-otp-separator>
          <plank-input-otp-group>
            <plank-input-otp-slot index="3"></plank-input-otp-slot>
            <plank-input-otp-slot index="4"></plank-input-otp-slot>
            <plank-input-otp-slot index="5"></plank-input-otp-slot>
          </plank-input-otp-group>
        </plank-input-otp>
      </div>
    `
    await customElements.whenDefined("plank-input-otp")
    const otp = container.querySelector("plank-input-otp")! as any
    await otp.updateComplete

    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-otp-filled"
    )
  })

  it("matches OTP with multiple separators", async () => {
    container.innerHTML = `
      <div style="padding: 20px;">
        <plank-input-otp max-length="6">
          <plank-input-otp-group>
            <plank-input-otp-slot index="0"></plank-input-otp-slot>
            <plank-input-otp-slot index="1"></plank-input-otp-slot>
          </plank-input-otp-group>
          <plank-input-otp-separator></plank-input-otp-separator>
          <plank-input-otp-group>
            <plank-input-otp-slot index="2"></plank-input-otp-slot>
            <plank-input-otp-slot index="3"></plank-input-otp-slot>
          </plank-input-otp-group>
          <plank-input-otp-separator></plank-input-otp-separator>
          <plank-input-otp-group>
            <plank-input-otp-slot index="4"></plank-input-otp-slot>
            <plank-input-otp-slot index="5"></plank-input-otp-slot>
          </plank-input-otp-group>
        </plank-input-otp>
      </div>
    `
    await customElements.whenDefined("plank-input-otp")
    const otp = container.querySelector("plank-input-otp")! as any
    await otp.updateComplete

    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-otp-separators"
    )
  })
})
