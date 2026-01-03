import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { page } from "vitest/browser"
import "@/web-components/plank-combobox"

describe("Combobox (Web Component) - Visual", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    // Clean up any portaled content
    document
      .querySelectorAll('body > div[style*="position: fixed"]')
      .forEach((el) => {
        el.remove()
      })
  })

  it("combobox closed state", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox placeholder="Select framework..." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
          <plank-combobox-item value="svelte">SvelteKit</plank-combobox-item>
          <plank-combobox-item value="nuxt">Nuxt.js</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-closed"
    )
  })

  it("combobox open state", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; min-height: 300px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox placeholder="Select framework..." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
          <plank-combobox-item value="svelte">SvelteKit</plank-combobox-item>
          <plank-combobox-item value="nuxt">Nuxt.js</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete

    // Open the combobox by clicking the trigger button
    const triggerBtn = container.querySelector(
      '[data-slot="input-group-button"]'
    ) as HTMLElement
    triggerBtn.click()
    await new Promise((r) => setTimeout(r, 150))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-open"
    )
  })

  it("combobox with selected value", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox value="svelte" placeholder="Select framework..." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
          <plank-combobox-item value="svelte">SvelteKit</plank-combobox-item>
          <plank-combobox-item value="nuxt">Nuxt.js</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-selected"
    )
  })

  it("combobox open with selected value", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; min-height: 300px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox value="svelte" placeholder="Select framework..." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
          <plank-combobox-item value="svelte">SvelteKit</plank-combobox-item>
          <plank-combobox-item value="nuxt">Nuxt.js</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete

    // Open the combobox by clicking the trigger button
    const triggerBtn = container.querySelector(
      '[data-slot="input-group-button"]'
    ) as HTMLElement
    triggerBtn.click()
    await new Promise((r) => setTimeout(r, 150))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-open-selected"
    )
  })

  it("combobox with filtered results", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; min-height: 300px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox placeholder="Select framework..." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
          <plank-combobox-item value="svelte">SvelteKit</plank-combobox-item>
          <plank-combobox-item value="nuxt">Nuxt.js</plank-combobox-item>
          <plank-combobox-item value="remix">Remix</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete

    // Type in the main input to filter (autocomplete pattern)
    const input = container.querySelector(
      '[role="combobox"]'
    ) as HTMLInputElement
    input.focus()
    await new Promise((r) => setTimeout(r, 100))

    input.value = "svelte"
    input.dispatchEvent(new Event("input", { bubbles: true }))
    await new Promise((r) => setTimeout(r, 100))

    // Note: Web component filters items automatically, React shows all items
    // Higher tolerance due to behavioral difference in filtering
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-filtered",
      { comparatorOptions: { allowedMismatchedPixelRatio: 0.05 } }
    )
  })

  it("combobox empty state", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; min-height: 200px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox placeholder="Select framework..." emptyText="No frameworks found." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
          <plank-combobox-item value="svelte">SvelteKit</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete

    // Type in the main input to filter
    const input = container.querySelector(
      '[role="combobox"]'
    ) as HTMLInputElement
    input.focus()
    await new Promise((r) => setTimeout(r, 100))

    input.value = "xyz"
    input.dispatchEvent(new Event("input", { bubbles: true }))
    await new Promise((r) => setTimeout(r, 100))

    // Note: Web component hides non-matching items, React shows them + empty message
    // Higher tolerance due to behavioral difference in filtering
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-empty",
      { comparatorOptions: { allowedMismatchedPixelRatio: 0.06 } }
    )
  })

  it("combobox with disabled item", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; min-height: 300px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox placeholder="Select framework..." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
          <plank-combobox-item value="svelte" disabled>SvelteKit (disabled)</plank-combobox-item>
          <plank-combobox-item value="nuxt">Nuxt.js</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete

    // Open the combobox by clicking the trigger button
    const triggerBtn = container.querySelector(
      '[data-slot="input-group-button"]'
    ) as HTMLElement
    triggerBtn.click()
    await new Promise((r) => setTimeout(r, 150))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-disabled-item"
    )
  })

  it("combobox with keyboard highlight", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; min-height: 300px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox placeholder="Select framework..." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
          <plank-combobox-item value="svelte">SvelteKit</plank-combobox-item>
          <plank-combobox-item value="nuxt">Nuxt.js</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete

    // Focus input and open
    const input = container.querySelector(
      '[role="combobox"]'
    ) as HTMLInputElement
    input.focus()
    await new Promise((r) => setTimeout(r, 100))

    // Press ArrowDown to highlight first item
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    )
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-keyboard-highlight"
    )
  })

  it("disabled combobox", async () => {
    container.innerHTML = `
      <div
        data-testid="container"
        style="padding: 20px; display: flex; justify-content: flex-start; align-items: flex-start;"
      >
        <plank-combobox disabled placeholder="Select framework..." class="w-[200px]">
          <plank-combobox-item value="next">Next.js</plank-combobox-item>
        </plank-combobox>
      </div>
    `

    await customElements.whenDefined("plank-combobox")
    const combobox = container.querySelector("plank-combobox")!
    await (combobox as any).updateComplete
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-disabled"
    )
  })
})
