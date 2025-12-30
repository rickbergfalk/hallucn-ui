import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/hover-card"
import { Button } from "@/components/button"

describe("HoverCard (React)", () => {
  afterEach(() => {
    cleanup()
    // Clean up any portaled hover cards - required due to Radix portal + RTL cleanup conflicts
    document
      .querySelectorAll('[data-slot="hover-card-content"]')
      .forEach((el) => {
        el.remove()
      })
  })

  it("renders trigger with correct data-slot", () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )
    const trigger = screen.getByRole("button")
    expect(trigger).toBeDefined()
    expect(trigger.dataset.slot).toBe("hover-card-trigger")
  })

  it("hover card content is hidden by default", () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )
    // Content should not be visible initially
    const content = document.querySelector('[data-slot="hover-card-content"]')
    expect(content).toBeNull()
  })

  it("shows hover card on hover", async () => {
    const user = userEvent.setup()
    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Hover card content</HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByRole("button")
    await user.hover(trigger)

    await waitFor(() => {
      const content = document.querySelector('[data-slot="hover-card-content"]')
      expect(content).not.toBeNull()
      expect(content?.textContent).toContain("Hover card content")
    })
  })

  it("hides hover card on mouse leave", async () => {
    const user = userEvent.setup()
    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByRole("button")
    await user.hover(trigger)

    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="hover-card-content"]')
      ).not.toBeNull()
    })

    await user.unhover(trigger)

    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="hover-card-content"]')
      ).toBeNull()
    })
  })

  it("shows hover card on focus", async () => {
    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByRole("button")
    trigger.focus()

    await waitFor(() => {
      const content = document.querySelector('[data-slot="hover-card-content"]')
      expect(content).not.toBeNull()
    })
  })

  it("hover card content has correct data-slot", async () => {
    const user = userEvent.setup()
    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    await user.hover(screen.getByRole("button"))

    await waitFor(() => {
      const content = document.querySelector('[data-slot="hover-card-content"]')
      expect(content?.getAttribute("data-slot")).toBe("hover-card-content")
    })
  })

  it("hover card content has data-side attribute", async () => {
    const user = userEvent.setup()
    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    await user.hover(screen.getByRole("button"))

    await waitFor(() => {
      const content = document.querySelector('[data-slot="hover-card-content"]')
      expect(content?.getAttribute("data-side")).toBeDefined()
    })
  })

  it("hover card content has data-state attribute", async () => {
    const user = userEvent.setup()
    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    await user.hover(screen.getByRole("button"))

    await waitFor(() => {
      const content = document.querySelector('[data-slot="hover-card-content"]')
      expect(content?.getAttribute("data-state")).toBe("open")
    })
  })

  it("can be controlled via open prop", async () => {
    render(
      <HoverCard open={true}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    await waitFor(() => {
      const content = document.querySelector('[data-slot="hover-card-content"]')
      expect(content).not.toBeNull()
    })
  })

  it("fires onOpenChange when opened", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <HoverCard openDelay={0} onOpenChange={onOpenChange}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    await user.hover(screen.getByRole("button"))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  it("respects openDelay prop", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <HoverCard openDelay={100} onOpenChange={onOpenChange}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    await user.hover(screen.getByRole("button"))

    // Should not be open immediately
    expect(onOpenChange).not.toHaveBeenCalled()

    // Wait for delay
    await waitFor(
      () => {
        expect(onOpenChange).toHaveBeenCalledWith(true)
      },
      { timeout: 200 }
    )
  })

  it("respects closeDelay prop", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <HoverCard openDelay={0} closeDelay={100} onOpenChange={onOpenChange}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByRole("button")
    await user.hover(trigger)

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    onOpenChange.mockClear()
    await user.unhover(trigger)

    // Should not close immediately
    expect(onOpenChange).not.toHaveBeenCalled()

    // Wait for delay
    await waitFor(
      () => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      },
      { timeout: 200 }
    )
  })

  it("does not open on touch events", async () => {
    const onOpenChange = vi.fn()
    render(
      <HoverCard openDelay={0} onOpenChange={onOpenChange}>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    const trigger = screen.getByRole("button")

    // Simulate touch event - hover card should not open
    trigger.dispatchEvent(
      new PointerEvent("pointerenter", {
        bubbles: true,
        pointerType: "touch",
      })
    )

    // Give it some time to potentially open (it shouldn't)
    await new Promise((r) => setTimeout(r, 50))

    expect(onOpenChange).not.toHaveBeenCalled()
  })
})
