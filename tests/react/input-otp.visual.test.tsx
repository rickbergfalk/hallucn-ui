import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/input-otp"

describe("InputOTP (React) - Visual", () => {
  it("basic OTP input", async () => {
    render(
      <div style={{ padding: 20 }} data-testid="container">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-otp-basic"
    )
  })

  it("OTP with values filled", async () => {
    render(
      <div style={{ padding: 20 }} data-testid="container">
        <InputOTP maxLength={6} value="123456">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-otp-filled"
    )
  })

  it("OTP with multiple separators", async () => {
    render(
      <div style={{ padding: 20 }} data-testid="container">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    )
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "input-otp-separators"
    )
  })
})
