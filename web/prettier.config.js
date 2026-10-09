/** @type {import("prettier").Config} (wiki: tech/conventions.md § Code style) */
export default {
  printWidth: 130,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
  tailwindStylesheet: "./src/styles/global.css",
};
