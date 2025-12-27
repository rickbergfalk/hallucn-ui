import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Label } from "@/components/label"

describe("Label (React)", () => {
  it("renders with data-slot attribute", () => {
    render(<Label>Email</Label>)
    const label = screen.getByText("Email")
    expect(label).toBeDefined()
    expect(label.dataset.slot).toBe("label")
  })

  it("renders as a label element", () => {
    render(<Label>Username</Label>)
    const label = screen.getByText("Username")
    expect(label.tagName.toLowerCase()).toBe("label")
  })

  it("has correct base classes", () => {
    render(<Label>Name</Label>)
    const label = screen.getByText("Name")
    expect(label.classList.contains("text-sm")).toBe(true)
    expect(label.classList.contains("font-medium")).toBe(true)
  })

  it("applies custom className", () => {
    render(<Label className="custom-class">Custom</Label>)
    const label = screen.getByText("Custom")
    expect(label.classList.contains("custom-class")).toBe(true)
  })

  it("supports htmlFor attribute", () => {
    render(<Label htmlFor="email-input">Email</Label>)
    const label = screen.getByText("Email")
    expect(label.getAttribute("for")).toBe("email-input")
  })
})
