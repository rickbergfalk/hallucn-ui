import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Input } from "@/components/input"

describe("Input (React)", () => {
  it("renders with data-slot attribute", () => {
    render(<Input data-testid="input" />)
    const input = screen.getByTestId("input")
    expect(input).toBeDefined()
    expect(input.dataset.slot).toBe("input")
  })

  it("renders as an input element", () => {
    render(<Input data-testid="input" />)
    const input = screen.getByTestId("input")
    expect(input.tagName.toLowerCase()).toBe("input")
  })

  it("supports type attribute", () => {
    render(<Input type="email" data-testid="input" />)
    const input = screen.getByTestId("input") as HTMLInputElement
    expect(input.type).toBe("email")
  })

  it("supports placeholder", () => {
    render(<Input placeholder="Enter text" data-testid="input" />)
    const input = screen.getByTestId("input") as HTMLInputElement
    expect(input.placeholder).toBe("Enter text")
  })

  it("can be disabled", () => {
    render(<Input disabled data-testid="input" />)
    const input = screen.getByTestId("input") as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it("applies custom className", () => {
    render(<Input className="custom-class" data-testid="input" />)
    const input = screen.getByTestId("input")
    expect(input.classList.contains("custom-class")).toBe(true)
  })
})
