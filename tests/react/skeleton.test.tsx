import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Skeleton } from "@/components/skeleton"

describe("Skeleton (React)", () => {
  it("renders with data-slot attribute", () => {
    render(<Skeleton data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toBeDefined()
    expect(skeleton.dataset.slot).toBe("skeleton")
  })

  it("has pulse animation class", () => {
    render(<Skeleton data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton.classList.contains("animate-pulse")).toBe(true)
  })

  it("has background and rounded classes", () => {
    render(<Skeleton data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton.classList.contains("bg-accent")).toBe(true)
    expect(skeleton.classList.contains("rounded-md")).toBe(true)
  })

  it("applies custom className", () => {
    render(<Skeleton className="h-4 w-32" data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton.classList.contains("h-4")).toBe(true)
    expect(skeleton.classList.contains("w-32")).toBe(true)
  })

  it("renders as a div element", () => {
    render(<Skeleton data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton.tagName.toLowerCase()).toBe("div")
  })
})
