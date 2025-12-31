import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "../../src/web-components/plank-navigation-menu"

describe("plank-navigation-menu - Visual", () => {
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
    container.innerHTML = `
      <plank-navigation-menu viewport="false">
        <plank-navigation-menu-list>
          <plank-navigation-menu-item>
            <plank-navigation-menu-trigger>Getting Started</plank-navigation-menu-trigger>
          </plank-navigation-menu-item>
          <plank-navigation-menu-item>
            <plank-navigation-menu-trigger>Components</plank-navigation-menu-trigger>
          </plank-navigation-menu-item>
          <plank-navigation-menu-item>
            <plank-navigation-menu-link href="#">Documentation</plank-navigation-menu-link>
          </plank-navigation-menu-item>
        </plank-navigation-menu-list>
      </plank-navigation-menu>
    `
    await customElements.whenDefined("plank-navigation-menu")
    const menu = container.querySelector("plank-navigation-menu")!
    await (menu as any).updateComplete

    await new Promise((resolve) => setTimeout(resolve, 50))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "navigation-menu-basic"
    )
  })

  it("navigation menu with open content", async () => {
    container.innerHTML = `
      <plank-navigation-menu viewport="false">
        <plank-navigation-menu-list>
          <plank-navigation-menu-item>
            <plank-navigation-menu-trigger>Getting Started</plank-navigation-menu-trigger>
            <plank-navigation-menu-content>
              <ul class="grid w-[300px] gap-2 p-4">
                <li>
                  <plank-navigation-menu-link href="#">
                    <div class="text-sm font-medium">Introduction</div>
                    <p class="text-muted-foreground text-sm">Get started with Planks.</p>
                  </plank-navigation-menu-link>
                </li>
                <li>
                  <plank-navigation-menu-link href="#">
                    <div class="text-sm font-medium">Installation</div>
                    <p class="text-muted-foreground text-sm">How to install dependencies.</p>
                  </plank-navigation-menu-link>
                </li>
              </ul>
            </plank-navigation-menu-content>
          </plank-navigation-menu-item>
          <plank-navigation-menu-item>
            <plank-navigation-menu-trigger>Components</plank-navigation-menu-trigger>
          </plank-navigation-menu-item>
        </plank-navigation-menu-list>
      </plank-navigation-menu>
    `
    await customElements.whenDefined("plank-navigation-menu")
    const menu = container.querySelector("plank-navigation-menu")!
    await (menu as any).updateComplete

    // Open the first menu item
    const item = container.querySelector("plank-navigation-menu-item")!
    ;(item as any)._open()

    await new Promise((resolve) => setTimeout(resolve, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "navigation-menu-open"
    )
  })

  it("navigation menu with active link", async () => {
    container.innerHTML = `
      <plank-navigation-menu viewport="false">
        <plank-navigation-menu-list>
          <plank-navigation-menu-item>
            <plank-navigation-menu-link href="#" active>Home</plank-navigation-menu-link>
          </plank-navigation-menu-item>
          <plank-navigation-menu-item>
            <plank-navigation-menu-link href="#">About</plank-navigation-menu-link>
          </plank-navigation-menu-item>
          <plank-navigation-menu-item>
            <plank-navigation-menu-link href="#">Contact</plank-navigation-menu-link>
          </plank-navigation-menu-item>
        </plank-navigation-menu-list>
      </plank-navigation-menu>
    `
    await customElements.whenDefined("plank-navigation-menu")
    const menu = container.querySelector("plank-navigation-menu")!
    await (menu as any).updateComplete

    await new Promise((resolve) => setTimeout(resolve, 50))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "navigation-menu-active"
    )
  })
})
