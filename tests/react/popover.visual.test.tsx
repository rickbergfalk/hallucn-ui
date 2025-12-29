import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/popover"
import { Button } from "@/components/button"

describe("Popover (React) - Visual", () => {
  it("popover open below button", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Dimensions</h4>
                <p className="text-muted-foreground text-sm">
                  Set the dimensions for the layer.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "popover-bottom"
    )
  })

  it("popover with align start", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p className="text-sm">Aligned to start</p>
          </PopoverContent>
        </Popover>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "popover-align-start"
    )
  })

  it("popover with align end", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <p className="text-sm">Aligned to end</p>
          </PopoverContent>
        </Popover>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "popover-align-end"
    )
  })
})
