import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/alert-dialog"

describe("AlertDialog (React) - Visual", () => {
  it("alert dialog with confirmation", async () => {
    render(
      <div
        data-testid="container"
        style={{
          width: "800px",
          height: "600px",
          position: "relative",
        }}
      >
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-dialog-confirmation"
    )
  })

  it("alert dialog simple", async () => {
    render(
      <div
        data-testid="container"
        style={{
          width: "800px",
          height: "400px",
          position: "relative",
        }}
      >
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Item</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this item?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-dialog-simple"
    )
  })
})
