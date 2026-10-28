import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    // Server-only suites opt into the node environment with a
    // `// @vitest-environment node` comment at the top of the file.
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    // 42 of 54 live events have no UTC offset, so pin the zone for
    // deterministic dates. Suites testing time zones override it.
    env: { TZ: "UTC" },
    // React's scheduler runs on setImmediate; faking it stalls rendering.
    fakeTimers: {
      toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval", "Date"],
    },
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
    exclude: ["**/node_modules/**", "**/.next/**"],
    coverage: {
      provider: "v8",
      include: ["utils/**", "components/**", "hooks/**", "lib/**", "app/**"],
      exclude: ["components/shadcn/**", "**/*.test.{ts,tsx}"],
    },
  },
});
