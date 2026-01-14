#!/usr/bin/env tsx

/**
 * Generates bundle size data for hallucn components vs React equivalents
 * Outputs JSON artifact for documentation site consumption
 */
import { build } from "esbuild"
import { gzipSync } from "zlib"
import { readdirSync, existsSync, writeFileSync } from "fs"
import { resolve, basename, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface ComponentSize {
  name: string
  raw: number
  minified: number
  gzipped: number
}

interface BundleSizeData {
  generated: string
  hallucn: {
    total: ComponentSize
    components: ComponentSize[]
  }
  react: {
    total: { gzipped: number }
    runtime: { gzipped: number }
    components: { name: string; gzipped: number }[]
  }
  lit: {
    runtime: { gzipped: number }
  }
}

async function analyzeComponent(
  entry: string,
  bundleDeps = false
): Promise<ComponentSize> {
  const external = bundleDeps
    ? []
    : [
        "lit",
        "lit/*",
        "@floating-ui/dom",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ]

  const rawResult = await build({
    entryPoints: [entry],
    bundle: true,
    minify: false,
    write: false,
    format: "esm",
    external,
    logLevel: "silent",
  })
  const rawSize = rawResult.outputFiles[0].contents.length

  const minResult = await build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    external,
    logLevel: "silent",
  })
  const minCode = minResult.outputFiles[0].text
  const gzipped = gzipSync(minCode)

  return {
    name: basename(entry, ".ts"),
    raw: rawSize,
    minified: minCode.length,
    gzipped: gzipped.length,
  }
}

async function measureReactComponent(
  name: string,
  file: string,
  componentsDir: string
): Promise<{ name: string; gzipped: number }> {
  const entryPoint = resolve(componentsDir, file)

  try {
    const result = await build({
      entryPoints: [entryPoint],
      bundle: true,
      minify: true,
      write: false,
      format: "esm",
      external: ["react", "react-dom", "react/jsx-runtime"],
      jsx: "automatic",
      logLevel: "silent",
      loader: { ".tsx": "tsx", ".ts": "ts" },
    })

    const minified = result.outputFiles[0].text
    const gzipped = gzipSync(minified)

    return { name, gzipped: gzipped.length }
  } catch {
    return { name, gzipped: 0 }
  }
}

async function generateBundleSizeData(): Promise<BundleSizeData> {
  const rootDir = resolve(__dirname, "..")
  const webComponentsDir = resolve(rootDir, "src/web-components")
  const reactComponentsDir = resolve(rootDir, "src/components")

  // Analyze hallucn components
  const wcFiles = readdirSync(webComponentsDir)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => resolve(webComponentsDir, f))
    .sort()

  const hallucnComponents: ComponentSize[] = []
  for (const file of wcFiles) {
    try {
      const size = await analyzeComponent(file)
      hallucnComponents.push(size)
    } catch {
      // Skip failed components
    }
  }
  hallucnComponents.sort((a, b) => b.gzipped - a.gzipped)

  // Full hallucn bundle
  const indexFile = resolve(webComponentsDir, "index.ts")
  const hallucnTotal = await analyzeComponent(indexFile, true)
  hallucnTotal.name = "hallucn (all)"

  // Component mapping for React
  const componentMapping: Record<string, string> = {
    "hal-accordion": "accordion.tsx",
    "hal-alert": "alert.tsx",
    "hal-alert-dialog": "alert-dialog.tsx",
    "hal-aspect-ratio": "aspect-ratio.tsx",
    "hal-avatar": "avatar.tsx",
    "hal-badge": "badge.tsx",
    "hal-breadcrumb": "breadcrumb.tsx",
    "hal-button": "button.tsx",
    "hal-button-group": "button-group.tsx",
    "hal-calendar": "calendar.tsx",
    "hal-card": "card.tsx",
    "hal-checkbox": "checkbox.tsx",
    "hal-collapsible": "collapsible.tsx",
    "hal-combobox": "combobox.tsx",
    "hal-command": "command.tsx",
    "hal-context-menu": "context-menu.tsx",
    "hal-dialog": "dialog.tsx",
    "hal-drawer": "drawer.tsx",
    "hal-dropdown-menu": "dropdown-menu.tsx",
    "hal-empty": "empty.tsx",
    "hal-field": "field.tsx",
    "hal-hover-card": "hover-card.tsx",
    "hal-input": "input.tsx",
    "hal-input-group": "input-group.tsx",
    "hal-input-otp": "input-otp.tsx",
    "hal-item": "item.tsx",
    "hal-kbd": "kbd.tsx",
    "hal-label": "label.tsx",
    "hal-menubar": "menubar.tsx",
    "hal-native-select": "native-select.tsx",
    "hal-navigation-menu": "navigation-menu.tsx",
    "hal-pagination": "pagination.tsx",
    "hal-popover": "popover.tsx",
    "hal-progress": "progress.tsx",
    "hal-radio-group": "radio-group.tsx",
    "hal-resizable": "resizable.tsx",
    "hal-scroll-area": "scroll-area.tsx",
    "hal-select": "select.tsx",
    "hal-separator": "separator.tsx",
    "hal-sheet": "sheet.tsx",
    "hal-sidebar": "sidebar.tsx",
    "hal-skeleton": "skeleton.tsx",
    "hal-slider": "slider.tsx",
    "hal-sonner": "sonner.tsx",
    "hal-spinner": "spinner.tsx",
    "hal-switch": "switch.tsx",
    "hal-table": "table.tsx",
    "hal-tabs": "tabs.tsx",
    "hal-textarea": "textarea.tsx",
    "hal-toggle": "toggle.tsx",
    "hal-toggle-group": "toggle-group.tsx",
    "hal-tooltip": "tooltip.tsx",
  }

  // Analyze React components
  const reactComponents: { name: string; gzipped: number }[] = []
  for (const [name, file] of Object.entries(componentMapping)) {
    if (existsSync(resolve(reactComponentsDir, file))) {
      const size = await measureReactComponent(name, file, reactComponentsDir)
      if (size.gzipped > 0) {
        reactComponents.push(size)
      }
    }
  }
  reactComponents.sort((a, b) => b.gzipped - a.gzipped)

  // React runtime
  const reactRuntimeResult = await build({
    stdin: {
      contents: `
        import React from "react"
        import ReactDOM from "react-dom/client"
        const App = () => React.createElement("div", null, "Hello")
        ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App))
      `,
      resolveDir: rootDir,
      loader: "jsx",
    },
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    logLevel: "silent",
  })
  const reactRuntimeGzipped = gzipSync(reactRuntimeResult.outputFiles[0].text)

  // Lit runtime
  const litRuntimeResult = await build({
    stdin: {
      contents: `
        import { LitElement, html, css } from "lit"
        class MyEl extends LitElement {
          static styles = css\`:host { display: block; }\`
          render() { return html\`<div>Hello</div>\` }
        }
        customElements.define("my-el", MyEl)
      `,
      resolveDir: rootDir,
      loader: "js",
    },
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    logLevel: "silent",
  })
  const litRuntimeGzipped = gzipSync(litRuntimeResult.outputFiles[0].text)

  // Full React bundle
  const reactFiles = readdirSync(reactComponentsDir)
    .filter((f) => f.endsWith(".tsx") && f !== "index.tsx")
    .map((f) => f.replace(".tsx", ""))

  const imports = reactFiles
    .map(
      (name, i) =>
        `import * as C${i} from "./src/components/${name}.tsx"; export { C${i} };`
    )
    .join("\n")

  const fullReactResult = await build({
    stdin: {
      contents: `
        import React from "react"
        import ReactDOM from "react-dom/client"
        ${imports}
        ReactDOM.createRoot(document.getElementById("root"))
      `,
      resolveDir: rootDir,
      loader: "tsx",
    },
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    jsx: "automatic",
    logLevel: "silent",
  })
  const fullReactGzipped = gzipSync(fullReactResult.outputFiles[0].text)

  return {
    generated: new Date().toISOString(),
    hallucn: {
      total: hallucnTotal,
      components: hallucnComponents,
    },
    react: {
      total: { gzipped: fullReactGzipped.length },
      runtime: { gzipped: reactRuntimeGzipped.length },
      components: reactComponents,
    },
    lit: {
      runtime: { gzipped: litRuntimeGzipped.length },
    },
  }
}

async function main() {
  console.log("\n📊 Generating bundle size data...")
  const start = Date.now()
  
  const data = await generateBundleSizeData()
  
  const outputPath = resolve(__dirname, "../docs/public/bundle-size.json")
  writeFileSync(outputPath, JSON.stringify(data, null, 2))
  
  console.log(`✅ Bundle size data generated in ${Date.now() - start}ms`)
  console.log(`📁 Artifact saved to: ${outputPath}`)
  console.log(
    `📋 Analyzed ${data.hallucn.components.length} hallucn components vs ${data.react.components.length} React components`
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}
