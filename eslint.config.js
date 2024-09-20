import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        bootstrap: "readonly", // Declare bootstrap as a global variable
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
    },
  },
];
