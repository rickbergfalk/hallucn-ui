import { describe, it, expect, beforeEach } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarLabel,
} from "@/components/menubar"

describe("Menubar (React) - Visual", () => {
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

  it("basic menubar", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
        </MenubarMenu>
      </Menubar>,
      { container }
    )
    await new Promise((resolve) => setTimeout(resolve, 50))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "menubar-basic"
    )
  })

  it("menubar with open menu", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab
              <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
        </MenubarMenu>
      </Menubar>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 0))

    // Open the File menu
    const trigger = container.querySelector('[data-slot="menubar-trigger"]')!
    ;(trigger as HTMLElement).click()
    await new Promise((resolve) => setTimeout(resolve, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "menubar-open"
    )
  })

  it("menubar with checkbox items", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>Status Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem>Activity Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Panel</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 0))

    // Open the menu
    const trigger = container.querySelector('[data-slot="menubar-trigger"]')!
    ;(trigger as HTMLElement).click()
    await new Promise((resolve) => setTimeout(resolve, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "menubar-checkbox"
    )
  })
})
