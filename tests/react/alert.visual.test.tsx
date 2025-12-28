import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import { Alert, AlertTitle, AlertDescription } from "@/components/alert"

// Simple SVG icons for tests
const CheckCircleIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const FilmIcon = () => (
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
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M7 3v18" />
    <path d="M3 7.5h4" />
    <path d="M3 12h18" />
    <path d="M3 16.5h4" />
    <path d="M21 7.5h-4" />
    <path d="M21 16.5h-4" />
    <path d="M17 3v18" />
  </svg>
)

const AlertCircleIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
)

describe("Alert (React) - Visual", () => {
  it("default alert with icon, title, and description", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "450px" }}>
        <Alert>
          <CheckCircleIcon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>
            This is an alert with icon, title and description.
          </AlertDescription>
        </Alert>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-default-full"
    )
  })

  it("alert with only icon and title", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "450px" }}>
        <Alert>
          <FilmIcon />
          <AlertTitle>
            This Alert has a title and an icon. No description.
          </AlertTitle>
        </Alert>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-title-only"
    )
  })

  it("destructive alert", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "450px" }}>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "alert-destructive"
    )
  })
})
