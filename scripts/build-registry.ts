import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs"
import { resolve, dirname, basename } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ROOT = resolve(__dirname, "..")
const WEB_COMPONENTS_DIR = resolve(ROOT, "src/web-components")
const OUTPUT_DIR = resolve(ROOT, "public/r")
const UTILS_PATH = resolve(ROOT, "src/lib/utils.ts")

interface RegistryItem {
  $schema: string
  name: string
  type: string
  title: string
  description: string
  dependencies: string[]
  registryDependencies: string[]
  files: {
    path: string
    type: string
    content: string
  }[]
}

interface RegistryIndex {
  $schema: string
  name: string
  homepage: string
  items: {
    name: string
    type: string
    title: string
    description: string
  }[]
}

/**
 * Detect npm dependencies from source code
 */
function detectDependencies(source: string): string[] {
  const deps: string[] = ["lit"]

  if (source.includes("class-variance-authority")) {
    deps.push("class-variance-authority")
  }

  if (source.includes("@floating-ui/dom")) {
    deps.push("@floating-ui/dom")
  }

  return deps
}

/**
 * Extract component name from filename
 * e.g., "hal-button.ts" -> "button"
 */
function getComponentName(filename: string): string {
  return basename(filename, ".ts").replace(/^hal-/, "")
}

/**
 * Generate a title from component name
 * e.g., "button" -> "Button", "alert-dialog" -> "Alert Dialog"
 */
function getTitle(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Extract description from JSDoc comment if present
 */
function extractDescription(source: string, name: string): string {
  // Look for JSDoc comment before @customElement
  const jsdocMatch = source.match(
    /\/\*\*\s*\n([^*]|\*[^/])*\*\/\s*\n\s*@customElement/
  )
  if (jsdocMatch) {
    const jsdoc = jsdocMatch[0]
    // Extract first line of description (after /** and before @)
    const descMatch = jsdoc.match(/\/\*\*\s*\n\s*\*\s*([^@\n*][^\n]*)/)
    if (descMatch) {
      return descMatch[1].trim()
    }
  }
  return `A ${getTitle(name)} web component`
}

/**
 * Build registry item for a component
 *
 * Note: We don't specify `target` - the shadcn CLI will determine the
 * installation path based on the user's components.json aliases configuration.
 * This allows files to be placed according to the user's project structure.
 */
function buildComponentItem(filename: string): RegistryItem {
  const filepath = resolve(WEB_COMPONENTS_DIR, filename)
  const source = readFileSync(filepath, "utf-8")
  const name = getComponentName(filename)
  const deps = detectDependencies(source)
  const description = extractDescription(source, name)

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    title: getTitle(name),
    description,
    dependencies: deps,
    registryDependencies: ["utils"],
    files: [
      {
        path: `ui/${name}.ts`,
        type: "registry:ui",
        content: source,
      },
    ],
  }
}

/**
 * Build the utils registry item
 *
 * Note: We don't specify `target` - the shadcn CLI will determine the
 * installation path based on the user's components.json aliases.utils configuration.
 */
function buildUtilsItem(): RegistryItem {
  const source = readFileSync(UTILS_PATH, "utf-8")

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "utils",
    type: "registry:lib",
    title: "Utils",
    description: "Utility functions for merging Tailwind CSS classes",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        content: source,
      },
    ],
  }
}

/**
 * Build the registry index
 */
function buildRegistryIndex(items: RegistryItem[]): RegistryIndex {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "hallucn",
    homepage: "https://rickbergfalk.github.io/hallucn-ui",
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
    })),
  }
}

async function main() {
  console.log("Building hallucn registry...\n")

  // Create output directory
  mkdirSync(OUTPUT_DIR, { recursive: true })

  // Get all component files
  const componentFiles = readdirSync(WEB_COMPONENTS_DIR)
    .filter((f) => f.startsWith("hal-") && f.endsWith(".ts"))
    .sort()

  console.log(`Found ${componentFiles.length} components`)

  // Build all items
  const items: RegistryItem[] = []

  // Add utils first
  const utilsItem = buildUtilsItem()
  items.push(utilsItem)
  writeFileSync(
    resolve(OUTPUT_DIR, "utils.json"),
    JSON.stringify(utilsItem, null, 2)
  )
  console.log("  + utils")

  // Add all components
  for (const file of componentFiles) {
    const item = buildComponentItem(file)
    items.push(item)
    writeFileSync(
      resolve(OUTPUT_DIR, `${item.name}.json`),
      JSON.stringify(item, null, 2)
    )
    console.log(`  + ${item.name}`)
  }

  // Write registry index
  const index = buildRegistryIndex(items)
  writeFileSync(
    resolve(OUTPUT_DIR, "registry.json"),
    JSON.stringify(index, null, 2)
  )

  console.log(`\nRegistry built: ${items.length} items`)
  console.log(`Output: ${OUTPUT_DIR}`)
}

main()
