// eslint.config.js
import js from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import playwright from "eslint-plugin-playwright";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: parserTs,
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      prettier,
      playwright,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "playwright/expect-expect": "off"
    },
  },
  {
    files: ["tests/**/*.ts", "tests/**/*.tsx"],
    rules: {
      ...playwright.configs["playwright-test"].rules,
    },
  },
];
