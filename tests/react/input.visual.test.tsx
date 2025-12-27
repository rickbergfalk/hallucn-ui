import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Input } from "@/components/input"

describe("Input (React) - Visual", () => {
  it("default input", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "250px" }}>
        <Input placeholder="Enter text..." />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("input-default")
  })

  it("disabled input", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "250px" }}>
        <Input placeholder="Disabled" disabled />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("input-disabled")
  })

  it("input with value", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "250px" }}>
        <Input defaultValue="Hello world" />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("input-with-value")
  })
})
