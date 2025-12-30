import { describe, it, expect, afterEach } from "vitest"
import { render } from "@testing-library/react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/drawer"
import { Button } from "@/components/button"

describe("Drawer (React) - Visual", () => {
  afterEach(() => {
    // Clean up any portaled content
    document
      .querySelectorAll('[data-slot="drawer-overlay"]')
      .forEach((el) => el.remove())
    document
      .querySelectorAll('[data-slot="drawer-content"]')
      .forEach((el) => el.remove())
    document.querySelectorAll('[role="dialog"]').forEach((el) => el.remove())
  })

  it("drawer open from bottom (default)", async () => {
    render(
      <div
        style={{
          width: 600,
          height: 400,
          position: "relative",
          background: "#f0f0f0",
        }}
      >
        <Drawer open direction="bottom">
          <DrawerTrigger>
            <Button variant="outline">Open</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    )

    // Wait for drawer animation
    await new Promise((r) => setTimeout(r, 100))

    await expect(document.body).toMatchScreenshot("drawer open from bottom")
  })

  it("drawer open from top", async () => {
    render(
      <div
        style={{
          width: 600,
          height: 400,
          position: "relative",
          background: "#f0f0f0",
        }}
      >
        <Drawer open direction="top">
          <DrawerTrigger>
            <Button variant="outline">Open</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Top Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer slides from top.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    )

    await new Promise((r) => setTimeout(r, 100))

    await expect(document.body).toMatchScreenshot("drawer open from top")
  })

  it("drawer open from left", async () => {
    render(
      <div
        style={{
          width: 600,
          height: 400,
          position: "relative",
          background: "#f0f0f0",
        }}
      >
        <Drawer open direction="left">
          <DrawerTrigger>
            <Button variant="outline">Open</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Left Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer slides from left.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    )

    await new Promise((r) => setTimeout(r, 100))

    await expect(document.body).toMatchScreenshot("drawer open from left")
  })

  it("drawer open from right", async () => {
    render(
      <div
        style={{
          width: 600,
          height: 400,
          position: "relative",
          background: "#f0f0f0",
        }}
      >
        <Drawer open direction="right">
          <DrawerTrigger>
            <Button variant="outline">Open</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Right Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer slides from right.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    )

    await new Promise((r) => setTimeout(r, 100))

    await expect(document.body).toMatchScreenshot("drawer open from right")
  })

  it("drawer with simple content", async () => {
    render(
      <div
        style={{
          width: 600,
          height: 400,
          position: "relative",
          background: "#f0f0f0",
        }}
      >
        <Drawer open>
          <DrawerTrigger>
            <Button variant="outline">Open</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Simple Drawer</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    )

    await new Promise((r) => setTimeout(r, 100))

    await expect(document.body).toMatchScreenshot("drawer with simple content")
  })
})
