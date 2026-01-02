import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Spinner } from "@/components/spinner"

describe("Spinner (React) - Visual", () => {
  it("default spinner", async () => {
    render(
      <div data-testid="container" style={{ padding: "16px" }}>
        <Spinner />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "spinner-default"
    )
  })

  it("spinner with custom size", async () => {
    render(
      <div data-testid="container" style={{ padding: "16px" }}>
        <Spinner className="size-8" />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "spinner-size-8"
    )
  })

  it("spinner with custom color", async () => {
    render(
      <div data-testid="container" style={{ padding: "16px" }}>
        <Spinner className="text-primary" />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "spinner-primary"
    )
  })
})
