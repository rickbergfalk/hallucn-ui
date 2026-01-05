import { build } from "esbuild"
import { gzipSync } from "zlib"
import { readdirSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  console.log("Measuring bundle sizes...\n")

  // React + ReactDOM - must include actual usage to prevent tree-shaking
  const reactResult = await build({
    stdin: {
      contents: `
        import React from "react"
        import ReactDOM from "react-dom/client"
        const App = () => React.createElement("div", null, "Hello")
        ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App))
      `,
      resolveDir: process.cwd(),
      loader: "jsx",
    },
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    logLevel: "silent",
  })

  const reactCode = reactResult.outputFiles[0].text
  const reactGzipped = gzipSync(reactCode)

  // Lit - must include actual usage to prevent tree-shaking
  const litResult = await build({
    stdin: {
      contents: `
        import { LitElement, html, css } from "lit"
        class MyEl extends LitElement {
          static styles = css\`:host { display: block; }\`
          render() { return html\`<div>Hello</div>\` }
        }
        customElements.define("my-el", MyEl)
      `,
      resolveDir: process.cwd(),
      loader: "js",
    },
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    logLevel: "silent",
  })

  const litCode = litResult.outputFiles[0].text
  const litGzipped = gzipSync(litCode)

  // hallucn full library (all components bundled with deps)
  const hallucnResult = await build({
    entryPoints: [resolve(__dirname, "../src/web-components/index.ts")],
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    logLevel: "silent",
  })
  const hallucnCode = hallucnResult.outputFiles[0].text
  const hallucnGzipped = gzipSync(hallucnCode)

  // React + all shadcn components (bundled together with React/ReactDOM)
  const componentsDir = resolve(__dirname, "../src/components")
  const componentFiles = readdirSync(componentsDir)
    .filter((f) => f.endsWith(".tsx") && f !== "index.tsx")
    .map((f) => f.replace(".tsx", ""))

  // Create import statements for all components
  const imports = componentFiles
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
        // Force React runtime inclusion
        ReactDOM.createRoot(document.getElementById("root"))
      `,
      resolveDir: process.cwd(),
      loader: "tsx",
    },
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    jsx: "automatic",
    logLevel: "silent",
  })

  const fullReactCode = fullReactResult.outputFiles[0].text
  const fullReactGzipped = gzipSync(fullReactCode)

  // Output results
  console.log("═══════════════════════════════════════════════════════════")
  console.log("                    FRAMEWORK RUNTIME")
  console.log("═══════════════════════════════════════════════════════════")
  console.log(
    `  Lit:              ${(litGzipped.length / 1024).toFixed(1).padStart(6)} KB gzipped`
  )
  console.log(
    `  React + ReactDOM: ${(reactGzipped.length / 1024).toFixed(1).padStart(6)} KB gzipped`
  )
  console.log("")
  console.log("═══════════════════════════════════════════════════════════")
  console.log("              FULL LIBRARY (ALL COMPONENTS)")
  console.log("═══════════════════════════════════════════════════════════")
  console.log(
    `  hallucn:          ${(hallucnGzipped.length / 1024).toFixed(1).padStart(6)} KB gzipped  (${componentFiles.length} components + Lit + Floating UI)`
  )
  console.log(
    `  React + shadcn:   ${(fullReactGzipped.length / 1024).toFixed(1).padStart(6)} KB gzipped  (${componentFiles.length} components + React + Radix)`
  )
  console.log("")
  const savings = (
    ((fullReactGzipped.length - hallucnGzipped.length) /
      fullReactGzipped.length) *
    100
  ).toFixed(0)
  console.log(`  📉 hallucn is ${savings}% smaller than React + shadcn/ui`)
}

main()
