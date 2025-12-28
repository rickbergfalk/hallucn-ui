import { describe, it, expect, beforeEach } from "vitest"
import { page } from "vitest/browser"
import "../../src/web-components/plank-accordion"
import type { PlankAccordion } from "../../src/web-components/plank-accordion"

describe("plank-accordion - Visual", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    container.setAttribute("data-testid", "container")
    container.style.padding = "8px"
    container.style.width = "350px"
    document.body.appendChild(container)
    return () => {
      container.remove()
    }
  })

  it("all closed state", async () => {
    container.innerHTML = `
      <plank-accordion collapsible class="w-full">
        <plank-accordion-item value="item-1">
          <plank-accordion-trigger>Is it accessible?</plank-accordion-trigger>
          <plank-accordion-content>
            Yes. It adheres to the WAI-ARIA design pattern.
          </plank-accordion-content>
        </plank-accordion-item>
        <plank-accordion-item value="item-2">
          <plank-accordion-trigger>Is it styled?</plank-accordion-trigger>
          <plank-accordion-content>
            Yes. It comes with default styles that matches the other components.
          </plank-accordion-content>
        </plank-accordion-item>
        <plank-accordion-item value="item-3">
          <plank-accordion-trigger>Is it animated?</plank-accordion-trigger>
          <plank-accordion-content>
            Yes. It's animated by default.
          </plank-accordion-content>
        </plank-accordion-item>
      </plank-accordion>
    `
    await customElements.whenDefined("plank-accordion")
    const accordion = container.querySelector(
      "plank-accordion"
    ) as PlankAccordion
    await accordion.updateComplete
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "accordion-closed"
    )
  })

  it("first item open state", async () => {
    container.innerHTML = `
      <plank-accordion collapsible value="item-1" class="w-full">
        <plank-accordion-item value="item-1">
          <plank-accordion-trigger>Is it accessible?</plank-accordion-trigger>
          <plank-accordion-content>
            Yes. It adheres to the WAI-ARIA design pattern.
          </plank-accordion-content>
        </plank-accordion-item>
        <plank-accordion-item value="item-2">
          <plank-accordion-trigger>Is it styled?</plank-accordion-trigger>
          <plank-accordion-content>
            Yes. It comes with default styles that matches the other components.
          </plank-accordion-content>
        </plank-accordion-item>
        <plank-accordion-item value="item-3">
          <plank-accordion-trigger>Is it animated?</plank-accordion-trigger>
          <plank-accordion-content>
            Yes. It's animated by default.
          </plank-accordion-content>
        </plank-accordion-item>
      </plank-accordion>
    `
    await customElements.whenDefined("plank-accordion")
    const accordion = container.querySelector(
      "plank-accordion"
    ) as PlankAccordion
    await accordion.updateComplete
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "accordion-open"
    )
  })
})
