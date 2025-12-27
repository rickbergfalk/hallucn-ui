import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/card"

describe("Card (React)", () => {
  it("Card renders with data-slot attribute", () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId("card")
    expect(card.dataset.slot).toBe("card")
  })

  it("CardHeader renders with data-slot attribute", () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId("header")
    expect(header.dataset.slot).toBe("card-header")
  })

  it("CardTitle renders with data-slot attribute", () => {
    render(<CardTitle data-testid="title">Title</CardTitle>)
    const title = screen.getByTestId("title")
    expect(title.dataset.slot).toBe("card-title")
  })

  it("CardDescription renders with data-slot attribute", () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>)
    const desc = screen.getByTestId("desc")
    expect(desc.dataset.slot).toBe("card-description")
  })

  it("CardAction renders with data-slot attribute", () => {
    render(<CardAction data-testid="action">Action</CardAction>)
    const action = screen.getByTestId("action")
    expect(action.dataset.slot).toBe("card-action")
  })

  it("CardContent renders with data-slot attribute", () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    const content = screen.getByTestId("content")
    expect(content.dataset.slot).toBe("card-content")
  })

  it("CardFooter renders with data-slot attribute", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId("footer")
    expect(footer.dataset.slot).toBe("card-footer")
  })

  it("Card applies custom className", () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    const card = screen.getByTestId("card")
    expect(card.classList.contains("custom-class")).toBe(true)
  })

  it("renders full card composition", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
        <CardFooter>Footer here</CardFooter>
      </Card>
    )
    const card = screen.getByTestId("card")
    expect(card.textContent).toContain("Title")
    expect(card.textContent).toContain("Description")
    expect(card.textContent).toContain("Content here")
    expect(card.textContent).toContain("Footer here")
  })
})
