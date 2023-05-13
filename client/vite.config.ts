/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "src/setupTests.ts",
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@testing-library/react",
      "@testing-library/jest-dom",
    ],
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//   },
//   optimizeDeps: {
//     include: [
//       "react",
//       "react-dom",
//       "@testing-library/react",
//       "@testing-library/jest-dom",
//     ],
//   },
// });
