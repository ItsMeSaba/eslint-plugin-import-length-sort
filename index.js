"use strict";

module.exports = {
  meta: {
    name: "eslint-plugin-import-length-sort",
    version: "1.0.0",
  },

  rules: {
    sort: require("./rules/sort"),
  },

  configs: {
    recommended: {
      plugins: ["import-length-sort"],
      rules: {
        "import-length-sort/sort": "warn", // softer default
      },
    },
  },
};
