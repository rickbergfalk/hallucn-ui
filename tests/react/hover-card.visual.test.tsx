import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/hover-card"
import { Button } from "@/components/button"
import { Avatar, AvatarFallback } from "@/components/avatar"

describe("HoverCard (React) - Visual", () => {
  it("hover card open below trigger", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <HoverCard open={true}>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between gap-4">
              <Avatar>
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="text-muted-foreground text-xs">
                  Joined December 2021
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    )
    // Wait for positioning to complete
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "hover-card-bottom"
    )
  })

  it("hover card with different alignments", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "80px 120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <HoverCard open={true}>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent align="start">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">The React Framework</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "hover-card-align-start"
    )
  })

  it("hover card with custom width", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <HoverCard open={true}>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-4">
              <Avatar>
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="text-muted-foreground text-xs">
                  Joined December 2021
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "hover-card-w-80"
    )
  })
})
