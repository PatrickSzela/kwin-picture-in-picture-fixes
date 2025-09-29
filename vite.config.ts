import babel from "@rollup/plugin-babel";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

export default defineConfig({
  define: {
    __NAME__: JSON.stringify(packageJson.prettyName),
  },
  build: {
    outDir: resolve(__dirname, "dist/contents/code"),
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName: "main",
      formats: ["es"],
    },
    // target ES5 since JS engine KDE uses internally is rather limited
    // based on https://github.com/vitejs/vite/issues/1639#issuecomment-1254671542
    rollupOptions: {
      plugins: [
        babel({
          extensions: [".ts", ".js"],
          babelHelpers: "runtime",
          plugins: ["@babel/plugin-transform-runtime"],
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: false,
                modules: false,
              },
            ],
          ],
        }),
      ],
    },
  },
});
