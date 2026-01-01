import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Toaster } from "@/components/sonner"
import { toast } from "sonner"

// Mock next-themes since we're testing in browser without Next.js
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}))

describe("Sonner (React) - Visual", () => {
  beforeEach(() => {
    // Clear any existing toasts
    toast.dismiss()
  })

  afterEach(() => {
    toast.dismiss()
  })

  it("default toast", async () => {
    render(
      <div
        style={{ width: 400, height: 300, position: "relative" }}
        data-testid="container"
      >
        <Toaster position="bottom-right" />
      </div>
    )

    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    })
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sonner-default"
    )
  })

  it("success toast", async () => {
    render(
      <div
        style={{ width: 400, height: 300, position: "relative" }}
        data-testid="container"
      >
        <Toaster position="bottom-right" />
      </div>
    )

    toast.success("Event has been created")
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sonner-success"
    )
  })

  it("error toast", async () => {
    render(
      <div
        style={{ width: 400, height: 300, position: "relative" }}
        data-testid="container"
      >
        <Toaster position="bottom-right" />
      </div>
    )

    toast.error("Event could not be created")
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sonner-error"
    )
  })

  it("multiple toasts stacked", async () => {
    render(
      <div
        style={{ width: 400, height: 300, position: "relative" }}
        data-testid="container"
      >
        <Toaster position="bottom-right" />
      </div>
    )

    toast.info("First notification")
    toast.warning("Second notification")
    toast.success("Third notification")
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sonner-stacked"
    )
  })
})
