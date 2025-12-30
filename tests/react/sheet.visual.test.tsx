import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/sheet"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"

describe("Sheet (React) - Visual", () => {
  it("sheet open from right (default)", async () => {
    render(
      <div
        data-testid="container"
        style={{
          width: "800px",
          height: "600px",
          position: "relative",
        }}
      >
        <Sheet open={true}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="John Doe"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@johndoe"
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot("sheet-right")
  })

  it("sheet open from left", async () => {
    render(
      <div
        data-testid="container"
        style={{
          width: "800px",
          height: "600px",
          position: "relative",
        }}
      >
        <Sheet open={true}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Access the main navigation menu.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <nav className="flex flex-col gap-2">
                <a href="#" className="text-sm hover:underline">
                  Home
                </a>
                <a href="#" className="text-sm hover:underline">
                  About
                </a>
                <a href="#" className="text-sm hover:underline">
                  Services
                </a>
                <a href="#" className="text-sm hover:underline">
                  Contact
                </a>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot("sheet-left")
  })

  it("sheet open from top", async () => {
    render(
      <div
        data-testid="container"
        style={{
          width: "800px",
          height: "600px",
          position: "relative",
        }}
      >
        <Sheet open={true}>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Notification Banner</SheetTitle>
              <SheetDescription>
                Important announcements will appear here.
              </SheetDescription>
            </SheetHeader>
            <div className="py-2">
              <p className="text-sm">
                Welcome to our new website! Check out our latest features.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot("sheet-top")
  })

  it("sheet open from bottom", async () => {
    render(
      <div
        data-testid="container"
        style={{
          width: "800px",
          height: "600px",
          position: "relative",
        }}
      >
        <Sheet open={true}>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Cookie Preferences</SheetTitle>
              <SheetDescription>
                Manage your cookie settings below.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 flex gap-4">
              <Button variant="outline">Reject All</Button>
              <Button>Accept All</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sheet-bottom"
    )
  })

  it("sheet with only title", async () => {
    render(
      <div
        data-testid="container"
        style={{
          width: "800px",
          height: "400px",
          position: "relative",
        }}
      >
        <Sheet open={true}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Simple Sheet</SheetTitle>
            </SheetHeader>
            <p className="text-sm">This is a simple sheet with just a title.</p>
          </SheetContent>
        </Sheet>
      </div>
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "sheet-simple"
    )
  })
})
