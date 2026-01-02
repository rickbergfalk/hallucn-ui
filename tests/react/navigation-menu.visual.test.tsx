import { describe, it, expect, beforeEach } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/navigation-menu"

describe("NavigationMenu (React) - Visual", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.setAttribute("data-testid", "container")
    container.style.padding = "16px"
    container.style.width = "600px"
    document.body.appendChild(container)
    return () => {
      container.remove()
    }
  })

  it("basic navigation menu", async () => {
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
      { container }
    )
    await new Promise((resolve) => setTimeout(resolve, 50))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "navigation-menu-basic"
    )
  })

  it("navigation menu with open content", async () => {
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink href="#">
                    <div className="text-sm font-medium">Introduction</div>
                    <p className="text-muted-foreground text-sm">
                      Get started with Planks.
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">
                    <div className="text-sm font-medium">Installation</div>
                    <p className="text-muted-foreground text-sm">
                      How to install dependencies.
                    </p>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
      { container }
    )

    // Hover to open the first menu item
    const trigger = container.querySelector(
      '[data-slot="navigation-menu-trigger"]'
    )!
    trigger.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "navigation-menu-open"
    )
  })

  it("navigation menu with active link", async () => {
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" active>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">About</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Contact</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
      { container }
    )
    await new Promise((resolve) => setTimeout(resolve, 50))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "navigation-menu-active"
    )
  })
})
