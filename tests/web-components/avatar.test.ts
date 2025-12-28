import { describe, it, expect, beforeEach, afterEach } from "vitest"
import "@/web-components/plank-avatar"
import type {
  PlankAvatar,
  PlankAvatarImage,
  PlankAvatarFallback,
} from "@/web-components/plank-avatar"

describe("PlankAvatar (Web Component)", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe("PlankAvatar", () => {
    it("renders with correct data-slot", async () => {
      container.innerHTML = `<plank-avatar></plank-avatar>`
      await customElements.whenDefined("plank-avatar")
      const avatar = container.querySelector("plank-avatar") as PlankAvatar
      await avatar.updateComplete

      expect(avatar.dataset.slot).toBe("avatar")
    })

    it("applies base classes", async () => {
      container.innerHTML = `<plank-avatar></plank-avatar>`
      await customElements.whenDefined("plank-avatar")
      const avatar = container.querySelector("plank-avatar") as PlankAvatar
      await avatar.updateComplete

      expect(avatar.classList.contains("relative")).toBe(true)
      expect(avatar.classList.contains("flex")).toBe(true)
      expect(avatar.classList.contains("rounded-full")).toBe(true)
    })

    it("applies custom class", async () => {
      container.innerHTML = `<plank-avatar class="rounded-lg"></plank-avatar>`
      await customElements.whenDefined("plank-avatar")
      const avatar = container.querySelector("plank-avatar") as PlankAvatar
      await avatar.updateComplete

      expect(avatar.classList.contains("rounded-lg")).toBe(true)
    })
  })

  describe("PlankAvatarImage", () => {
    it("renders with correct data-slot", async () => {
      container.innerHTML = `<plank-avatar-image src="test.jpg" alt="Test"></plank-avatar-image>`
      await customElements.whenDefined("plank-avatar-image")
      const avatarImage = container.querySelector(
        "plank-avatar-image"
      ) as PlankAvatarImage
      await avatarImage.updateComplete

      expect(avatarImage.dataset.slot).toBe("avatar-image")
    })

    it("creates an img element", async () => {
      container.innerHTML = `<plank-avatar-image src="test.jpg" alt="Test"></plank-avatar-image>`
      await customElements.whenDefined("plank-avatar-image")
      const avatarImage = container.querySelector(
        "plank-avatar-image"
      ) as PlankAvatarImage
      await avatarImage.updateComplete

      const img = avatarImage.querySelector("img")
      expect(img).toBeTruthy()
      expect(img?.getAttribute("src")).toBe("test.jpg")
      expect(img?.getAttribute("alt")).toBe("Test")
    })

    it("passes src and alt attributes", async () => {
      container.innerHTML = `<plank-avatar-image src="avatar.png" alt="User avatar"></plank-avatar-image>`
      await customElements.whenDefined("plank-avatar-image")
      const avatarImage = container.querySelector(
        "plank-avatar-image"
      ) as PlankAvatarImage
      await avatarImage.updateComplete

      const img = avatarImage.querySelector("img")
      expect(img?.getAttribute("src")).toBe("avatar.png")
      expect(img?.getAttribute("alt")).toBe("User avatar")
    })
  })

  describe("PlankAvatarFallback", () => {
    it("renders with correct data-slot", async () => {
      container.innerHTML = `<plank-avatar-fallback>CN</plank-avatar-fallback>`
      await customElements.whenDefined("plank-avatar-fallback")
      const fallback = container.querySelector(
        "plank-avatar-fallback"
      ) as PlankAvatarFallback
      await fallback.updateComplete

      expect(fallback.dataset.slot).toBe("avatar-fallback")
    })

    it("applies base classes", async () => {
      container.innerHTML = `<plank-avatar-fallback>CN</plank-avatar-fallback>`
      await customElements.whenDefined("plank-avatar-fallback")
      const fallback = container.querySelector(
        "plank-avatar-fallback"
      ) as PlankAvatarFallback
      await fallback.updateComplete

      expect(fallback.classList.contains("bg-muted")).toBe(true)
      expect(fallback.classList.contains("flex")).toBe(true)
      expect(fallback.classList.contains("items-center")).toBe(true)
      expect(fallback.classList.contains("justify-center")).toBe(true)
    })

    it("preserves children content", async () => {
      container.innerHTML = `<plank-avatar-fallback>AB</plank-avatar-fallback>`
      await customElements.whenDefined("plank-avatar-fallback")
      const fallback = container.querySelector(
        "plank-avatar-fallback"
      ) as PlankAvatarFallback
      await fallback.updateComplete

      expect(fallback.textContent).toContain("AB")
    })
  })

  describe("Avatar composition", () => {
    it("renders complete avatar with image and fallback", async () => {
      container.innerHTML = `
        <plank-avatar>
          <plank-avatar-image src="test.jpg" alt="Test"></plank-avatar-image>
          <plank-avatar-fallback>CN</plank-avatar-fallback>
        </plank-avatar>
      `
      await customElements.whenDefined("plank-avatar")
      await customElements.whenDefined("plank-avatar-image")
      await customElements.whenDefined("plank-avatar-fallback")

      const avatar = container.querySelector("plank-avatar") as PlankAvatar
      const image = container.querySelector(
        "plank-avatar-image"
      ) as PlankAvatarImage
      const fallback = container.querySelector(
        "plank-avatar-fallback"
      ) as PlankAvatarFallback

      await avatar.updateComplete
      await image.updateComplete
      await fallback.updateComplete

      expect(avatar).toBeTruthy()
      expect(image).toBeTruthy()
      expect(fallback).toBeTruthy()
    })
  })
})
