// vitest.config.ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    reporters: "default",
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(root, "src"), // <-- lets Vitest resolve "@/..." imports
    },
  },
});
