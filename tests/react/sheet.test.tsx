import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/sheet"
import { Button } from "@/components/button"

describe("Sheet (React)", () => {
  afterEach(() => {
    cleanup()
    // Clean up any portaled sheets
    document.querySelectorAll('[data-slot="sheet-overlay"]').forEach((el) => {
      el.remove()
    })
    document.querySelectorAll('[data-slot="sheet-content"]').forEach((el) => {
      el.remove()
    })
    document.querySelectorAll('[role="dialog"]').forEach((el) => {
      el.remove()
    })
  })

  it("renders trigger with correct data-slot", () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )
    const trigger = screen.getByRole("button")
    expect(trigger).toBeDefined()
    expect(trigger.dataset.slot).toBe("sheet-trigger")
  })

  it("sheet content is hidden by default", () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )
    const dialog = screen.queryByRole("dialog")
    expect(dialog).toBeNull()
  })

  it("opens sheet on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByRole("button"))

    await waitFor(() => {
      const dialog = screen.getByRole("dialog")
      expect(dialog).toBeDefined()
      expect(dialog.textContent).toContain("Sheet Title")
    })
  })

  it("sheet content has correct data-slot when open", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("dialog")
      expect(dialog.dataset.slot).toBe("sheet-content")
    })
  })

  it("trigger has aria-haspopup attribute", () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    const trigger = screen.getByRole("button")
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog")
  })

  it("can be controlled via open prop", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeDefined()
    })
  })

  it("fires onOpenChange when opened", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Sheet onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByRole("button"))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  it("sheet has aria-labelledby pointing to title", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>My Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("dialog")
      const labelledBy = dialog.getAttribute("aria-labelledby")
      expect(labelledBy).toBeTruthy()
      const title = document.getElementById(labelledBy!)
      expect(title?.textContent).toBe("My Title")
    })
  })

  it("sheet has aria-describedby pointing to description", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>My Description</SheetDescription>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("dialog")
      const describedBy = dialog.getAttribute("aria-describedby")
      expect(describedBy).toBeTruthy()
      const description = document.getElementById(describedBy!)
      expect(description?.textContent).toBe("My Description")
    })
  })

  it("renders header and footer with correct data-slots", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <Button>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      const header = document.querySelector('[data-slot="sheet-header"]')
      const footer = document.querySelector('[data-slot="sheet-footer"]')
      expect(header).toBeTruthy()
      expect(footer).toBeTruthy()
    })
  })

  it("has data-state attribute on content when open", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      const dialog = screen.getByRole("dialog")
      expect(dialog.dataset.state).toBe("open")
    })
  })

  it("has overlay with correct data-slot", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      const overlay = document.querySelector('[data-slot="sheet-overlay"]')
      expect(overlay).toBeTruthy()
    })
  })

  // Sheet-specific tests for side prop
  describe("side prop", () => {
    it("defaults to right side", async () => {
      render(
        <Sheet open={true}>
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      )

      await waitFor(() => {
        const dialog = screen.getByRole("dialog")
        // Check for right-side positioning classes
        expect(dialog.className).toContain("right-0")
        expect(dialog.className).toContain("inset-y-0")
      })
    })

    it("renders on left side when side=left", async () => {
      render(
        <Sheet open={true}>
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      )

      await waitFor(() => {
        const dialog = screen.getByRole("dialog")
        expect(dialog.className).toContain("left-0")
        expect(dialog.className).toContain("inset-y-0")
      })
    })

    it("renders on top when side=top", async () => {
      render(
        <Sheet open={true}>
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      )

      await waitFor(() => {
        const dialog = screen.getByRole("dialog")
        expect(dialog.className).toContain("top-0")
        expect(dialog.className).toContain("inset-x-0")
      })
    })

    it("renders on bottom when side=bottom", async () => {
      render(
        <Sheet open={true}>
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      )

      await waitFor(() => {
        const dialog = screen.getByRole("dialog")
        expect(dialog.className).toContain("bottom-0")
        expect(dialog.className).toContain("inset-x-0")
      })
    })
  })

  // Sheet close button tests
  describe("close button", () => {
    it("has close button with correct data-slot", async () => {
      render(
        <Sheet open={true}>
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      )

      await waitFor(() => {
        const closeButton = document.querySelector(
          '[data-slot="sheet-content"] button'
        )
        expect(closeButton).toBeTruthy()
        // Check for sr-only text
        expect(closeButton?.textContent).toContain("Close")
      })
    })

    it("SheetClose component has correct data-slot", async () => {
      render(
        <Sheet open={true}>
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetClose asChild>
              <Button>Close Sheet</Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      )

      await waitFor(() => {
        const closeButton = document.querySelector('[data-slot="sheet-close"]')
        expect(closeButton).toBeTruthy()
        expect(closeButton?.textContent).toContain("Close Sheet")
      })
    })
  })

  it("title has correct data-slot", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>My Title</SheetTitle>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      const title = document.querySelector('[data-slot="sheet-title"]')
      expect(title).toBeTruthy()
      expect(title?.textContent).toBe("My Title")
    })
  })

  it("description has correct data-slot", async () => {
    render(
      <Sheet open={true}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>My Description</SheetDescription>
        </SheetContent>
      </Sheet>
    )

    await waitFor(() => {
      const description = document.querySelector(
        '[data-slot="sheet-description"]'
      )
      expect(description).toBeTruthy()
      expect(description?.textContent).toBe("My Description")
    })
  })
})
