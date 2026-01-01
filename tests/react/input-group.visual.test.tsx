import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/input-group"

describe("InputGroup (React) - Visual", () => {
  it("with icon addon", async () => {
    render(
      <div style={{ padding: 20, width: 300 }} data-testid="container">
        <InputGroup>
          <InputGroupAddon>
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-group-icon"
    )
  })

  it("with text addons", async () => {
    render(
      <div style={{ padding: 20, width: 300 }} data-testid="container">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-group-text"
    )
  })

  it("with button addon", async () => {
    render(
      <div style={{ padding: 20, width: 300 }} data-testid="container">
        <InputGroup>
          <InputGroupInput placeholder="Type to search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-group-button"
    )
  })

  it("with textarea and block addon", async () => {
    render(
      <div style={{ padding: 20, width: 300 }} data-testid="container">
        <InputGroup>
          <InputGroupTextarea placeholder="Enter message..." />
          <InputGroupAddon align="block-end">
            <InputGroupText>120 characters left</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-group-textarea"
    )
  })
})
