import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/drawer"
import { Button } from "@/components/button"

describe("Drawer (React)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    // Clean up any portaled content
    document
      .querySelectorAll('[data-slot="drawer-overlay"]')
      .forEach((el) => el.remove())
    document
      .querySelectorAll('[data-slot="drawer-content"]')
      .forEach((el) => el.remove())
    document.querySelectorAll('[role="dialog"]').forEach((el) => el.remove())
  })

  it("trigger has correct data-slot", () => {
    render(
      <Drawer>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const trigger = container.querySelector('[data-slot="drawer-trigger"]')
    expect(trigger).toBeDefined()
  })

  it("drawer is hidden by default", () => {
    render(
      <Drawer>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    expect(screen.queryByRole("dialog")).toBeNull()
  })

  it("opens on trigger click", async () => {
    render(
      <Drawer>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const trigger = container.querySelector('[data-slot="drawer-trigger"]')!
    fireEvent.click(trigger)

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeDefined()
    })
  })

  it("trigger has aria-haspopup=dialog", () => {
    render(
      <Drawer>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const trigger = container.querySelector('[data-slot="drawer-trigger"]')
    expect(trigger?.getAttribute("aria-haspopup")).toBe("dialog")
  })

  it("can be controlled via open prop", () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    expect(screen.getByRole("dialog")).toBeDefined()
  })

  it("fires onOpenChange when opened", async () => {
    const handleOpenChange = vi.fn()

    render(
      <Drawer onOpenChange={handleOpenChange}>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const trigger = container.querySelector('[data-slot="drawer-trigger"]')!
    fireEvent.click(trigger)

    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenCalledWith(true)
    })
  })

  it("drawer has aria-labelledby pointing to title", async () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>My Drawer Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const dialog = screen.getByRole("dialog")
    const labelledBy = dialog.getAttribute("aria-labelledby")
    expect(labelledBy).toBeDefined()

    const title = document.getElementById(labelledBy!)
    expect(title?.textContent).toBe("My Drawer Title")
  })

  it("drawer has aria-describedby pointing to description", async () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>My description text</DrawerDescription>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const dialog = screen.getByRole("dialog")
    const describedBy = dialog.getAttribute("aria-describedby")
    expect(describedBy).toBeDefined()

    const description = document.getElementById(describedBy!)
    expect(description?.textContent).toBe("My description text")
  })

  it("header has correct data-slot", async () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const header = document.querySelector('[data-slot="drawer-header"]')
    expect(header).toBeDefined()
  })

  it("footer has correct data-slot", async () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerFooter>
            <Button>Action</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const footer = document.querySelector('[data-slot="drawer-footer"]')
    expect(footer).toBeDefined()
  })

  it("title has correct data-slot", async () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title Text</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const title = document.querySelector('[data-slot="drawer-title"]')
    expect(title).toBeDefined()
    expect(title?.textContent).toBe("Title Text")
  })

  it("description has correct data-slot", async () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description Text</DrawerDescription>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const description = document.querySelector(
      '[data-slot="drawer-description"]'
    )
    expect(description).toBeDefined()
    expect(description?.textContent).toBe("Description Text")
  })

  it("content has correct data-slot", async () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const content = document.querySelector('[data-slot="drawer-content"]')
    expect(content).toBeDefined()
  })

  it("overlay has correct data-slot", async () => {
    render(
      <Drawer open>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const overlay = document.querySelector('[data-slot="drawer-overlay"]')
    expect(overlay).toBeDefined()
  })

  it("close button closes the drawer", async () => {
    const handleOpenChange = vi.fn()

    render(
      <Drawer open onOpenChange={handleOpenChange}>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerClose>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const closeButton = document.querySelector('[data-slot="drawer-close"]')!
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })
  })

  it("supports direction prop for bottom (default)", async () => {
    render(
      <Drawer open direction="bottom">
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const content = document.querySelector('[data-slot="drawer-content"]')
    expect(content?.getAttribute("data-vaul-drawer-direction")).toBe("bottom")
  })

  it("supports direction prop for top", async () => {
    render(
      <Drawer open direction="top">
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const content = document.querySelector('[data-slot="drawer-content"]')
    expect(content?.getAttribute("data-vaul-drawer-direction")).toBe("top")
  })

  it("supports direction prop for left", async () => {
    render(
      <Drawer open direction="left">
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const content = document.querySelector('[data-slot="drawer-content"]')
    expect(content?.getAttribute("data-vaul-drawer-direction")).toBe("left")
  })

  it("supports direction prop for right", async () => {
    render(
      <Drawer open direction="right">
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
      { container }
    )

    const content = document.querySelector('[data-slot="drawer-content"]')
    expect(content?.getAttribute("data-vaul-drawer-direction")).toBe("right")
  })
})
