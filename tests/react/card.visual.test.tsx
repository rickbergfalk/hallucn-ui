import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/card"

describe("Card (React) - Visual", () => {
  it("basic card", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content area.</p>
          </CardContent>
          <CardFooter>
            <p>Footer content</p>
          </CardFooter>
        </Card>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("card-basic")
  })

  it("card without footer", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Card>
          <CardHeader>
            <CardTitle>Simple Card</CardTitle>
            <CardDescription>A card without a footer.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Just some content here.</p>
          </CardContent>
        </Card>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("card-no-footer")
  })

  it("card with only content", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Card>
          <CardContent>
            <p>Minimal card with just content.</p>
          </CardContent>
        </Card>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("card-content-only")
  })
})
