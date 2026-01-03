import { LitElement, html } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { cn } from "@/lib/utils"

/**
 * PlankNavigationMenu - Navigation menu container
 *
 * @example
 * ```html
 * <plank-navigation-menu>
 *   <plank-navigation-menu-list>
 *     <plank-navigation-menu-item>
 *       <plank-navigation-menu-trigger>Getting Started</plank-navigation-menu-trigger>
 *       <plank-navigation-menu-content>
 *         <ul class="grid gap-3 p-4 w-[400px]">
 *           <li><a href="#">Introduction</a></li>
 *         </ul>
 *       </plank-navigation-menu-content>
 *     </plank-navigation-menu-item>
 *   </plank-navigation-menu-list>
 * </plank-navigation-menu>
 * ```
 */
@customElement("plank-navigation-menu")
export class PlankNavigationMenu extends LitElement {
  @property({ type: Boolean }) viewport = true
  @property({ type: String }) class: string = ""
  @property({ type: Number, attribute: "delay-duration" }) delayDuration = 200
  @property({ type: Number, attribute: "skip-delay-duration" })
  skipDelayDuration = 300

  @state() private _activeItem: PlankNavigationMenuItem | null = null
  @state() private _viewportContent: HTMLElement | null = null

  private _delayTimer: ReturnType<typeof setTimeout> | null = null
  private _skipDelayTimer: ReturnType<typeof setTimeout> | null = null
  private _isWithinSkipDelay = false

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    // Close when clicking outside
    document.addEventListener("click", this._handleDocumentClick)
    document.addEventListener("keydown", this._handleDocumentKeydown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("click", this._handleDocumentClick)
    document.removeEventListener("keydown", this._handleDocumentKeydown)
    this._clearTimers()
  }

  private _clearTimers() {
    if (this._delayTimer) {
      clearTimeout(this._delayTimer)
      this._delayTimer = null
    }
    if (this._skipDelayTimer) {
      clearTimeout(this._skipDelayTimer)
      this._skipDelayTimer = null
    }
  }

  private _handleDocumentClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this._closeActiveItem()
    }
  }

  private _handleDocumentKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this._closeActiveItem()
    }
  }

  _openItem(item: PlankNavigationMenuItem) {
    this._clearTimers()

    const openNow = () => {
      if (this._activeItem && this._activeItem !== item) {
        this._activeItem._close()
      }
      this._activeItem = item
      item._open()
      this._updateViewport()
    }

    if (this._isWithinSkipDelay) {
      openNow()
    } else {
      this._delayTimer = setTimeout(openNow, this.delayDuration)
    }
  }

  _closeItem(item: PlankNavigationMenuItem) {
    this._clearTimers()

    if (this._activeItem === item) {
      // Start skip delay period
      this._isWithinSkipDelay = true
      this._skipDelayTimer = setTimeout(() => {
        this._isWithinSkipDelay = false
      }, this.skipDelayDuration)
    }
  }

  _closeActiveItem() {
    if (this._activeItem) {
      this._activeItem._close()
      this._activeItem = null
      this._viewportContent = null
    }
  }

  _updateViewport() {
    if (!this.viewport || !this._activeItem) return

    const content = this._activeItem.querySelector(
      "plank-navigation-menu-content"
    )
    if (content) {
      this._viewportContent = content as HTMLElement
      const viewportEl = this.querySelector("plank-navigation-menu-viewport")
      if (viewportEl) {
        ;(viewportEl as PlankNavigationMenuViewport)._setContent(
          content as HTMLElement
        )
      }
    }
  }

  getDirection(): "horizontal" | "vertical" {
    return "horizontal"
  }

  willUpdate() {
    this.dataset.slot = "navigation-menu"
    this.dataset.viewport = String(this.viewport)
    this.className = cn(
      "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankNavigationMenuList - Container for navigation menu items
 */
@customElement("plank-navigation-menu-list")
export class PlankNavigationMenuList extends LitElement {
  @property({ type: String }) class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "navigation-menu-list"
    this.className = cn(
      "group flex flex-1 list-none items-center justify-center gap-1",
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankNavigationMenuItem - Individual menu item
 */
@customElement("plank-navigation-menu-item")
export class PlankNavigationMenuItem extends LitElement {
  @property({ type: String }) class: string = ""
  @property({ type: String }) value: string = ""

  @state() private _isOpen = false

  private _menu: PlankNavigationMenu | null = null

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this._menu = this.closest("plank-navigation-menu")
  }

  _open() {
    this._isOpen = true
    this.setAttribute("data-state", "open")

    const trigger = this.querySelector("plank-navigation-menu-trigger")
    if (trigger) {
      trigger.setAttribute("data-state", "open")
      trigger.setAttribute("aria-expanded", "true")
    }

    const content = this.querySelector("plank-navigation-menu-content")
    if (content) {
      content.setAttribute("data-state", "open")
      ;(content as HTMLElement).style.display = ""
    }
  }

  _close() {
    this._isOpen = false
    this.setAttribute("data-state", "closed")

    const trigger = this.querySelector("plank-navigation-menu-trigger")
    if (trigger) {
      trigger.setAttribute("data-state", "closed")
      trigger.setAttribute("aria-expanded", "false")
    }

    const content = this.querySelector("plank-navigation-menu-content")
    if (content) {
      content.setAttribute("data-state", "closed")
      ;(content as HTMLElement).style.display = "none"
    }
  }

  _handleTriggerEnter() {
    this._menu?._openItem(this)
  }

  _handleTriggerLeave() {
    this._menu?._closeItem(this)
  }

  willUpdate() {
    this.dataset.slot = "navigation-menu-item"
    this.className = cn("relative", this.class)
  }

  render() {
    return html``
  }
}

/**
 * PlankNavigationMenuTrigger - Trigger button for opening content
 */
@customElement("plank-navigation-menu-trigger")
export class PlankNavigationMenuTrigger extends LitElement {
  @property({ type: String }) class: string = ""

  private _item: PlankNavigationMenuItem | null = null
  private _originalChildren: Node[] = []

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this._item = this.closest("plank-navigation-menu-item")
    this._originalChildren = [...this.childNodes]
    this.addEventListener("mouseenter", this._handleMouseEnter)
    this.addEventListener("mouseleave", this._handleMouseLeave)
    this.addEventListener("click", this._handleClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("mouseenter", this._handleMouseEnter)
    this.removeEventListener("mouseleave", this._handleMouseLeave)
    this.removeEventListener("click", this._handleClick)
  }

  private _handleMouseEnter = () => {
    this._item?._handleTriggerEnter()
  }

  private _handleMouseLeave = () => {
    this._item?._handleTriggerLeave()
  }

  private _handleClick = (e: MouseEvent) => {
    e.preventDefault()
    this._item?._handleTriggerEnter()
  }

  firstUpdated() {
    const button = this.querySelector("button")
    if (button) {
      this._originalChildren.forEach((child) => {
        if (child !== button && child.nodeType !== Node.COMMENT_NODE) {
          button.insertBefore(child, button.querySelector("svg"))
        }
      })
    }
  }

  willUpdate() {
    this.dataset.slot = "navigation-menu-trigger"
    this.setAttribute("data-state", "closed")
    this.className = "contents"
  }

  render() {
    return html`
      <button
        class=${cn(
          "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          "data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground",
          "data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50",
          "focus-visible:ring-ring/50 outline-none transition-[color,box-shadow]",
          "focus-visible:ring-[3px] focus-visible:outline-1",
          this.class
        )}
        aria-expanded="false"
        aria-haspopup="true"
        data-state="closed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    `
  }
}

/**
 * PlankNavigationMenuContent - Dropdown content container
 */
@customElement("plank-navigation-menu-content")
export class PlankNavigationMenuContent extends LitElement {
  @property({ type: String }) class: string = ""

  private _item: PlankNavigationMenuItem | null = null

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this._item = this.closest("plank-navigation-menu-item")
    // Start hidden
    this.style.display = "none"

    this.addEventListener("mouseenter", this._handleMouseEnter)
    this.addEventListener("mouseleave", this._handleMouseLeave)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("mouseenter", this._handleMouseEnter)
    this.removeEventListener("mouseleave", this._handleMouseLeave)
  }

  private _handleMouseEnter = () => {
    // Keep open while hovering content
    this._item?._handleTriggerEnter()
  }

  private _handleMouseLeave = () => {
    this._item?._handleTriggerLeave()
  }

  willUpdate() {
    this.dataset.slot = "navigation-menu-content"
    this.setAttribute("data-state", "closed")

    const menu = this.closest("plank-navigation-menu")
    const useViewport = menu?.viewport ?? true

    this.className = cn(
      "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
      "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
      "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
      "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
      "top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
      !useViewport && [
        "bg-popover text-popover-foreground",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "top-full mt-1.5 overflow-hidden rounded-md border shadow duration-200",
      ],
      this.class
    )
  }

  render() {
    return html``
  }
}

/**
 * PlankNavigationMenuLink - A navigation link
 */
@customElement("plank-navigation-menu-link")
export class PlankNavigationMenuLink extends LitElement {
  @property({ type: String }) href: string = ""
  @property({ type: Boolean }) active = false
  @property({ type: String }) class: string = ""

  private _originalChildren: Node[] = []
  @state() private _isTopLevel = true

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this._originalChildren = [...this.childNodes]
    // Check if this is a top-level link (direct child of menu-item, not inside content)
    this._isTopLevel = !this.closest("plank-navigation-menu-content")
  }

  firstUpdated() {
    const anchor = this.querySelector("a")
    if (anchor) {
      this._originalChildren.forEach((child) => {
        if (child !== anchor && child.nodeType !== Node.COMMENT_NODE) {
          anchor.appendChild(child)
        }
      })
    }
  }

  willUpdate() {
    this.dataset.slot = "navigation-menu-link"
    this.dataset.active = String(this.active)
    // Use style instead of className to avoid conflict with @property class
    this.style.display = "contents"
  }

  render() {
    // Content is dynamically moved to anchor in firstUpdated() - aria-label provides fallback
    // Use consistent link styling matching trigger buttons
    const linkClasses = cn(
      "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent",
      "data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground",
      "hover:bg-accent hover:text-accent-foreground",
      "focus:bg-accent focus:text-accent-foreground",
      "focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground",
      "transition-all outline-none",
      "focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
      // Match trigger button height for consistent nav layout
      "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
      this.class
    )
    return html`
      <a
        href=${this.href}
        aria-label=${this.textContent?.trim() || "Link"}
        class=${linkClasses}
        data-active=${this.active}
      ></a>
    `
  }
}

/**
 * PlankNavigationMenuViewport - Viewport for rendering content
 */
@customElement("plank-navigation-menu-viewport")
export class PlankNavigationMenuViewport extends LitElement {
  @property({ type: String }) class: string = ""

  @state() private _content: HTMLElement | null = null
  @state() private _isOpen = false

  createRenderRoot() {
    return this
  }

  _setContent(content: HTMLElement | null) {
    this._content = content
    this._isOpen = content !== null
    this.setAttribute("data-state", this._isOpen ? "open" : "closed")
  }

  willUpdate() {
    this.dataset.slot = "navigation-menu-viewport"
    this.className = cn(
      "absolute top-full left-0 isolate z-50 flex justify-center",
      this.class
    )
  }

  render() {
    return html`
      <div
        class=${cn(
          "origin-top-center bg-popover text-popover-foreground",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
          "relative mt-1.5 overflow-hidden rounded-md border shadow",
          "w-full md:w-auto"
        )}
        data-state=${this._isOpen ? "open" : "closed"}
        style=${this._isOpen ? "" : "display: none"}
      ></div>
    `
  }
}

/**
 * PlankNavigationMenuIndicator - Visual indicator for active item
 */
@customElement("plank-navigation-menu-indicator")
export class PlankNavigationMenuIndicator extends LitElement {
  @property({ type: String }) class: string = ""

  createRenderRoot() {
    return this
  }

  willUpdate() {
    this.dataset.slot = "navigation-menu-indicator"
    this.className = cn(
      "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
      "data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
      this.class
    )
  }

  render() {
    return html`
      <div
        class="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md"
      ></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "plank-navigation-menu": PlankNavigationMenu
    "plank-navigation-menu-list": PlankNavigationMenuList
    "plank-navigation-menu-item": PlankNavigationMenuItem
    "plank-navigation-menu-trigger": PlankNavigationMenuTrigger
    "plank-navigation-menu-content": PlankNavigationMenuContent
    "plank-navigation-menu-link": PlankNavigationMenuLink
    "plank-navigation-menu-viewport": PlankNavigationMenuViewport
    "plank-navigation-menu-indicator": PlankNavigationMenuIndicator
  }
}
