import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/alert-dialog"
import { Button } from "@/components/button"

describe("AlertDialog (React)", () => {
  afterEach(() => {
    cleanup()
    // Clean up any portaled dialogs
    document
      .querySelectorAll('[data-slot="alert-dialog-overlay"]')
      .forEach((el) => el.remove())
    document
      .querySelectorAll('[data-slot="alert-dialog-content"]')
      .forEach((el) => el.remove())
    document
      .querySelectorAll('[role="alertdialog"]')
      .forEach((el) => el.remove())
  })

  it("renders trigger with correct data-slot", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )
    const trigger = screen.getByRole("button")
    expect(trigger).toBeDefined()
    expect(trigger.dataset.slot).toBe("alert-dialog-trigger")
  })

  it("alert dialog content is hidden by default", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )
    const dialog = screen.queryByRole("alertdialog")
    expect(dialog).toBeNull()
  })

  it("opens alert dialog on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Item</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await user.click(screen.getByRole("button"))

    await waitFor(() => {
      const dialog = screen.getByRole("alertdialog")
      expect(dialog).toBeDefined()
      expect(dialog.textContent).toContain("Delete Item")
    })
  })

  it("alert dialog content has role=alertdialog", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("alertdialog")
      expect(dialog).toBeDefined()
    })
  })

  it("alert dialog content has correct data-slot when open", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("alertdialog")
      expect(dialog.dataset.slot).toBe("alert-dialog-content")
    })
  })

  it("can be controlled via open prop", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      expect(screen.getByRole("alertdialog")).toBeDefined()
    })
  })

  it("fires onOpenChange when opened", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <AlertDialog onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await user.click(screen.getByRole("button"))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  it("alert dialog has aria-labelledby pointing to title", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>My Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("alertdialog")
      const labelledBy = dialog.getAttribute("aria-labelledby")
      expect(labelledBy).toBeTruthy()
      const title = document.getElementById(labelledBy!)
      expect(title?.textContent).toBe("My Title")
    })
  })

  it("alert dialog has aria-describedby pointing to description", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>My Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("alertdialog")
      const describedBy = dialog.getAttribute("aria-describedby")
      expect(describedBy).toBeTruthy()
      const description = document.getElementById(describedBy!)
      expect(description?.textContent).toBe("My Description")
    })
  })

  it("renders header and footer with correct data-slots", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogDescription>Description</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const header = document.querySelector('[data-slot="alert-dialog-header"]')
      const footer = document.querySelector('[data-slot="alert-dialog-footer"]')
      expect(header).toBeTruthy()
      expect(footer).toBeTruthy()
    })
  })

  it("has data-state attribute on content when open", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("alertdialog")
      expect(dialog.dataset.state).toBe("open")
    })
  })

  it("has overlay with correct data-slot", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const overlay = document.querySelector(
        '[data-slot="alert-dialog-overlay"]'
      )
      expect(overlay).toBeTruthy()
    })
  })

  it("closes when Action button is clicked", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <AlertDialog open={true} onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      expect(screen.getByRole("alertdialog")).toBeDefined()
    })

    await user.click(screen.getByText("Continue"))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  it("closes when Cancel button is clicked", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <AlertDialog open={true} onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      expect(screen.getByRole("alertdialog")).toBeDefined()
    })

    await user.click(screen.getByText("Cancel"))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  it("Action button has default button styling", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const action = screen.getByText("Continue")
      // Should have primary button styling (bg-primary)
      expect(action.className).toContain("bg-primary")
    })
  })

  it("Cancel button has outline button styling", async () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild>
          <Button>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    await waitFor(() => {
      const cancel = screen.getByText("Cancel")
      // Should have outline button styling (border)
      expect(cancel.className).toContain("border")
    })
  })
})
