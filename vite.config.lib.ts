import { defineConfig } from "vite"
import { resolve } from "path"
import { readdirSync } from "fs"
import dts from "vite-plugin-dts"

// Get all web component files for individual entry points
const webComponentsDir = resolve(__dirname, "src/web-components")
const webComponentFiles = readdirSync(webComponentsDir)
  .filter((file) => file.endsWith(".ts") && file !== "index.ts")
  .reduce(
    (entries, file) => {
      const name = file.replace(".ts", "")
      entries[name] = resolve(webComponentsDir, file)
      return entries
    },
    {} as Record<string, string>
  )

export default defineConfig({
  plugins: [
    dts({
      include: ["src/web-components/**/*.ts", "src/lib/**/*.ts"],
      outDir: "dist/types",
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/web-components/index.ts"),
        ...webComponentFiles,
      },
      formats: ["es"],
    },
    outDir: "dist/esm",
    rollupOptions: {
      // External dependencies - these are peer deps
      external: [
        "lit",
        /^lit\//,
        "@floating-ui/dom",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        // Ensure consistent chunk naming
        chunkFileNames: "[name].js",
      },
    },
    minify: "terser",
    sourcemap: true,
    // Clear output directory before building
    emptyOutDir: true,
  },
})
