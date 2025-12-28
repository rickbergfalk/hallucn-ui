import { defineConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      expect: {
        toMatchScreenshot: {
          // Web component tests compare against React baselines
          resolveScreenshotPath: ({
            testFileDirectory,
            testFileName,
            arg,
            browserName,
            platform,
            ext,
          }) => {
            // For web component tests, use React screenshots as baseline
            if (testFileDirectory.includes("web-components")) {
              // Extract component name from test file (e.g., "button.visual.test.ts" -> "button")
              const componentName = testFileName.replace(".visual.test.ts", "")
              return `tests/react/__screenshots__/${componentName}.visual.test.tsx/${arg}-${browserName}-${platform}${ext}`
            }
            // Default path for React tests
            return `${testFileDirectory}/__screenshots__/${testFileName}/${arg}-${browserName}-${platform}${ext}`
          },
        },
      },
    },
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
  },
})
