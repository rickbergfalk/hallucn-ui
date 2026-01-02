import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "@/components/field"
import { Input } from "@/components/input"
import { Checkbox } from "@/components/checkbox"

describe("Field (React) - Visual", () => {
  it("basic vertical field with label and input", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="email@example.com" />
        </Field>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-basic-vertical"
    )
  })

  it("field with description", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input placeholder="johndoe" />
          <FieldDescription>
            This will be your public display name.
          </FieldDescription>
        </Field>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-with-description"
    )
  })

  it("field with error", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Field data-invalid="true">
          <FieldLabel>Password</FieldLabel>
          <Input type="password" />
          <FieldError>Password must be at least 8 characters.</FieldError>
        </Field>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-with-error"
    )
  })

  it("horizontal field orientation", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Field orientation="horizontal">
          <Checkbox id="terms" />
          <FieldContent>
            <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
            <FieldDescription>
              You agree to our Terms of Service and Privacy Policy.
            </FieldDescription>
          </FieldContent>
        </Field>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-horizontal"
    )
  })

  it("field group with multiple fields", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <FieldGroup>
          <Field>
            <FieldLabel>First name</FieldLabel>
            <Input placeholder="John" />
          </Field>
          <Field>
            <FieldLabel>Last name</FieldLabel>
            <Input placeholder="Doe" />
          </Field>
        </FieldGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("field-group")
  })

  it("fieldset with legend", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <FieldSet>
          <FieldLegend>Personal Information</FieldLegend>
          <FieldDescription>
            Please fill in your details below.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="Your name" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="email@example.com" />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-fieldset"
    )
  })

  it("field separator", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="email@example.com" />
          </Field>
          <FieldSeparator>or</FieldSeparator>
          <Field>
            <FieldLabel>Phone</FieldLabel>
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </Field>
        </FieldGroup>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "field-separator"
    )
  })

  it("field with title (non-label)", async () => {
    render(
      <div data-testid="container" style={{ padding: "8px", width: "350px" }}>
        <Field>
          <FieldTitle>Notification Settings</FieldTitle>
          <FieldDescription>
            Choose how you want to receive notifications.
          </FieldDescription>
        </Field>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot("field-title")
  })
})
