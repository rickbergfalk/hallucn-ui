import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Avatar, AvatarFallback } from "@/components/avatar"

describe("Avatar (React) - Visual", () => {
  it("with fallback only", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "avatar-fallback"
    )
  })

  it("with custom rounded-lg", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Avatar className="rounded-lg">
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "avatar-rounded-lg"
    )
  })

  it("multiple avatars stacked", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <div className="flex -space-x-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </div>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "avatar-stacked"
    )
  })
})
