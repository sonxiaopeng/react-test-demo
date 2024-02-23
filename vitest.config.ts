import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig(() =>
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        environment: "happy-dom",
        coverage: {
          exclude: ["src/app.tsx", "src/main.tsx"],
          include: ["src/*/**"],
        },
      },
    })
  )
);
