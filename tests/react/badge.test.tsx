import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Badge } from "@/components/badge"

describe("Badge (React)", () => {
  it("renders with default variant", () => {
    render(<Badge>New</Badge>)
    const badge = screen.getByText("New")
    expect(badge).toBeDefined()
    expect(badge.dataset.slot).toBe("badge")
  })

  it("renders with secondary variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    const badge = screen.getByText("Secondary")
    expect(badge).toBeDefined()
  })

  it("renders with destructive variant", () => {
    render(<Badge variant="destructive">Error</Badge>)
    const badge = screen.getByText("Error")
    expect(badge).toBeDefined()
  })

  it("renders with outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>)
    const badge = screen.getByText("Outline")
    expect(badge).toBeDefined()
  })

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText("Custom")
    expect(badge.classList.contains("custom-class")).toBe(true)
  })

  it("renders as a span element", () => {
    render(<Badge>Tag</Badge>)
    const badge = screen.getByText("Tag")
    expect(badge.tagName.toLowerCase()).toBe("span")
  })
})
