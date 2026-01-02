import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/button-group"
import { Button } from "@/components/button"

describe("ButtonGroup (React) - Visual", () => {
  it("horizontal button group", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-horizontal"
    )
  })

  it("vertical button group", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-vertical"
    )
  })

  it("button group with text", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <ButtonGroup>
          <ButtonGroupText>Label</ButtonGroupText>
          <Button variant="outline">Action</Button>
        </ButtonGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-with-text"
    )
  })

  it("button group with separator", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <ButtonGroup>
          <Button variant="outline">Save</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-with-separator"
    )
  })

  it("button group with icon buttons", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Button>
          <Button variant="outline" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </Button>
          <Button variant="outline" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </Button>
        </ButtonGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-icons"
    )
  })

  it("button group mixed sizes", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <ButtonGroup>
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="outline">Default</Button>
          <Button variant="outline" size="lg">
            Large
          </Button>
        </ButtonGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "button-group-mixed-sizes"
    )
  })
})
