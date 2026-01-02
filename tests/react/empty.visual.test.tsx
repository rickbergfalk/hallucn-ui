import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/empty"

// Simple SVG icons for tests
const InboxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

describe("Empty (React) - Visual", () => {
  it("basic empty state with all parts", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "500px" }}>
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>No messages</EmptyTitle>
            <EmptyDescription>
              You don&apos;t have any messages yet. When you receive messages,
              they will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("empty-basic")
  })

  it("empty state with content (actions)", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "500px" }}>
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              We couldn&apos;t find what you&apos;re looking for. Try adjusting
              your search or filters.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Clear filters
            </button>
          </EmptyContent>
        </Empty>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "empty-with-content"
    )
  })

  it("empty state with default media variant", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "500px" }}>
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia>
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>Empty inbox</EmptyTitle>
            <EmptyDescription>
              Your inbox is empty. New messages will show up here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "empty-media-default"
    )
  })

  it("empty state minimal (title only)", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "500px" }}>
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>Nothing here yet</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "empty-minimal"
    )
  })
})
