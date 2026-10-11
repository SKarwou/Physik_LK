import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { publicCourseIsolation, protectedDevMiddleware } from "./scripts/protected-build.mjs";

export default defineConfig({
  base: "/Physik_LK/",
  plugins: [publicCourseIsolation(), protectedDevMiddleware(), react()],
  build: { outDir: "docs", emptyOutDir: true, sourcemap: false },
});
