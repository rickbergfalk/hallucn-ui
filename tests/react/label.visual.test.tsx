import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Label } from "@/components/label"

describe("Label (React) - Visual", () => {
  it("default label", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Label>Email address</Label>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "label-default"
    )
  })

  it("label with input", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className="border rounded px-2 py-1 text-sm"
        />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "label-with-input"
    )
  })
})
