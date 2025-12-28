import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/collapsible"
import { Button } from "@/components/button"

describe("Collapsible (React) - Visual", () => {
  it("closed state", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Collapsible className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold">Toggle me</span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                Toggle
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-2 text-sm">
            Always visible
          </div>
          <CollapsibleContent className="flex flex-col gap-2">
            <div className="rounded-md border px-4 py-2 text-sm">
              Hidden content 1
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              Hidden content 2
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "collapsible-closed"
    )
  })

  it("open state", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Collapsible open className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold">Toggle me</span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                Toggle
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-2 text-sm">
            Always visible
          </div>
          <CollapsibleContent className="flex flex-col gap-2">
            <div className="rounded-md border px-4 py-2 text-sm">
              Hidden content 1
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              Hidden content 2
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "collapsible-open"
    )
  })
})
