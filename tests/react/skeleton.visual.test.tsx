import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Skeleton } from "@/components/skeleton"

describe("Skeleton (React) - Visual", () => {
  it("text skeleton", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Skeleton className="h-4 w-48" />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "skeleton-text"
    )
  })

  it("avatar skeleton", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px" }}>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "skeleton-avatar"
    )
  })

  it("card skeleton", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "300px" }}>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "skeleton-card"
    )
  })
})
