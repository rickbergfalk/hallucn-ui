import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Badge } from "@/components/badge"

describe("Badge (React) - Visual", () => {
  it("default variant", async () => {
    render(<Badge data-testid="badge">Badge</Badge>)
    await expect(page.getByTestId("badge")).toMatchScreenshot("badge-default")
  })

  it("secondary variant", async () => {
    render(
      <Badge variant="secondary" data-testid="badge">
        Secondary
      </Badge>
    )
    await expect(page.getByTestId("badge")).toMatchScreenshot("badge-secondary")
  })

  it("destructive variant", async () => {
    render(
      <Badge variant="destructive" data-testid="badge">
        Destructive
      </Badge>
    )
    await expect(page.getByTestId("badge")).toMatchScreenshot(
      "badge-destructive"
    )
  })

  it("outline variant", async () => {
    render(
      <Badge variant="outline" data-testid="badge">
        Outline
      </Badge>
    )
    await expect(page.getByTestId("badge")).toMatchScreenshot("badge-outline")
  })
})
