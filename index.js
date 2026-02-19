"use strict";

module.exports = {
  meta: {
    name: "eslint-plugin-import-length-sort",
    version: "1.1.1",
  },

  rules: {
    sort: require("./rules/sort"),
  },

  configs: {
    recommended: {
      files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
      plugins: ["import-length-sort"],
      rules: {
        "import-length-sort/sort": "warn",
      },
    },
  },
};
