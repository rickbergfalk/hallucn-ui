import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/web-components/index.ts"),
      name: "hallucn",
      fileName: "hallucn",
      formats: ["umd"],
    },
    outDir: "dist/umd",
    rollupOptions: {
      // Bundle ALL dependencies for UMD (CDN usage)
      output: {
        globals: {},
      },
    },
    minify: "terser",
    sourcemap: true,
    // Don't clear - ESM build runs first
    emptyOutDir: false,
  },
})
