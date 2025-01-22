import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "no-console": "off",
      eqeqeq: "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-unused-vars": "warn",
      curly: "error",
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: globals.jest,
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/valid-expect": "error",
    },
  },
  pluginJs.configs.recommended,
];

