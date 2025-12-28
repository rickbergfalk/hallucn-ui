import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Toggle } from "@/components/toggle"

describe("Toggle (React) - Visual", () => {
  it("default unpressed", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Toggle aria-label="Toggle">B</Toggle>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "toggle-default-unpressed"
    )
  })

  it("default pressed", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Toggle aria-label="Toggle" pressed>
          B
        </Toggle>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "toggle-default-pressed"
    )
  })

  it("outline variant", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Toggle variant="outline" aria-label="Toggle">
          B
        </Toggle>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "toggle-outline"
    )
  })

  it("size sm", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Toggle size="sm" aria-label="Toggle">
          B
        </Toggle>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("toggle-sm")
  })

  it("size lg", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Toggle size="lg" aria-label="Toggle">
          B
        </Toggle>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("toggle-lg")
  })

  it("disabled", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Toggle aria-label="Toggle" disabled>
          B
        </Toggle>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "toggle-disabled"
    )
  })
})
