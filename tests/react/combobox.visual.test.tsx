import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { render } from "@testing-library/react"
import { page } from "vitest/browser"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/combobox"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
]

describe("Combobox (React) - Visual", () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    // Clean up any portaled content
    document
      .querySelectorAll('body > div[style*="position"]')
      .forEach((el) => el.remove())
  })

  it("combobox closed state", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="">
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-closed"
    )
  })

  it("combobox open state", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          minHeight: "300px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="" defaultOpen>
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.slice(0, 3).map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 150))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-open"
    )
  })

  it("combobox with selected value", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="svelte">
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.slice(0, 3).map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-selected"
    )
  })

  it("combobox open with selected value", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          minHeight: "300px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="svelte" defaultOpen>
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.slice(0, 3).map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 150))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-open-selected"
    )
  })

  it("combobox with filtered results", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          minHeight: "300px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="" defaultOpen defaultInputValue="svelte">
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-filtered"
    )
  })

  it("combobox empty state", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          minHeight: "200px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="" defaultOpen defaultInputValue="xyz">
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.slice(0, 2).map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-empty"
    )
  })

  it("combobox with disabled item", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          minHeight: "300px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="" defaultOpen>
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem value="next">Next.js</ComboboxItem>
              <ComboboxItem value="svelte" disabled>
                SvelteKit (disabled)
              </ComboboxItem>
              <ComboboxItem value="nuxt">Nuxt.js</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 150))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-disabled-item"
    )
  })

  it("combobox with keyboard highlight", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          minHeight: "300px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="" defaultOpen>
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.slice(0, 3).map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 100))

    // Press ArrowDown to highlight first item
    const input = document.querySelector(
      '[data-slot="combobox-content"] input, input'
    ) as HTMLInputElement
    if (input) {
      input.focus()
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      )
    }
    await new Promise((r) => setTimeout(r, 100))

    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-keyboard-highlight"
    )
  })

  it("disabled combobox", async () => {
    render(
      <div
        data-testid="container"
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Combobox defaultValue="" disabled>
          <ComboboxInput
            placeholder="Select framework..."
            className="w-[200px]"
            disabled
          />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem value="next">Next.js</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>,
      { container }
    )
    await new Promise((r) => setTimeout(r, 100))
    await expect(page.getByTestId("container")).toMatchScreenshot(
      "combobox-disabled"
    )
  })
})
