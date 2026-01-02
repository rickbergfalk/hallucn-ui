import { describe, it, expect, beforeEach } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/carousel"
import { Card, CardContent } from "@/components/card"

describe("Carousel (React) - Visual", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.setAttribute("data-testid", "container")
    container.style.padding = "48px" // Extra padding for absolute positioned buttons
    container.style.width = "350px"
    document.body.appendChild(container)
    return () => {
      container.remove()
    }
  })

  it("horizontal carousel", async () => {
    render(
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">1</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">2</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">3</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
      { container }
    )
    // Allow time for embla to initialize
    await new Promise((r) => setTimeout(r, 200))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "carousel-horizontal"
    )
  })

  it("vertical carousel", async () => {
    render(
      <Carousel orientation="vertical" className="w-full max-w-xs">
        <CarouselContent className="h-[200px]">
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">1</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">2</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">3</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 200))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "carousel-vertical"
    )
  })

  it("carousel with disabled button", async () => {
    render(
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">1</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">2</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
      { container }
    )
    // Allow time for embla to initialize and update button states
    await new Promise((r) => setTimeout(r, 200))
    // Previous button should be disabled when on first slide
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "carousel-disabled-prev"
    )
  })
})
