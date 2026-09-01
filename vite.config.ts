import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({ base: "/Physik_LK/", plugins: [react()], build: { outDir: "docs", emptyOutDir: true } });
