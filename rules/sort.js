"use strict";

const {
  sortByLengthDescThenModuleAsc,
  normalizeForCompare,
} = require("../helpers/utils");

const findFirstNonDirectiveIndex = require("../helpers/find-first-non-directive-index");
const createImportItems = require("../helpers/create-import-items");
const categorizeImports = require("../helpers/categorize-imports");
const findImportRange = require("../helpers/find-import-range");
const buildBlock = require("../helpers/build-block");

/**
 * import-length-sort/sort
 *
 * Sorts the top-of-file import block like:
 * 1) "default-ish" imports (default-only, namespace, mixed default+named) by line length DESC
 * 2) "named-only" imports by line length DESC
 *
 */

module.exports = {
  meta: {
    type: "layout",
    docs: {
      description:
        "Sort top-of-file imports by line length (default-ish first, then named-only), longest to shortest.",
      recommended: false,
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          keepSideEffectAtTop: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      notSorted:
        "Imports are not sorted by line length (default-ish first, then named-only).",
    },
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const option = context.options?.[0] ?? {};
    const keepSideEffectAtTop = option.keepSideEffectAtTop !== false;

    return {
      "Program:exit"(programNode) {
        // Only process JavaScript/TypeScript files
        const filename = context.getFilename();
        const ext = filename.split(".").pop()?.toLowerCase();
        const validExtensions = ["js", "jsx", "ts", "tsx", "mjs", "cjs"];
        if (!validExtensions.includes(ext)) return;

        const body = programNode.body || [];
        if (body.length === 0) return;

        // Preserve the file's EOL style
        const eol = sourceCode.text.includes("\r\n") ? "\r\n" : "\n";

        const i = findFirstNonDirectiveIndex(body);

        const { startImportIndex, lastImportIndex } = findImportRange(body, i);

        if (startImportIndex === -1) {
          return;
        }

        const importNodes = body.slice(startImportIndex, lastImportIndex + 1);

        // Capture original block text range.
        const start = importNodes[0].range[0];
        const end = importNodes[importNodes.length - 1].range[1];
        const originalBlock = sourceCode.text.slice(start, end);

        const items = createImportItems(importNodes, sourceCode);

        const { sideEffects, defaultish, namedOnly } = categorizeImports(items);

        const sortedSideEffects = sortByLengthDescThenModuleAsc(sideEffects);
        const sortedDefaultish = sortByLengthDescThenModuleAsc(defaultish);
        const sortedNamedOnly = sortByLengthDescThenModuleAsc(namedOnly);

        let newBlock;

        if (keepSideEffectAtTop) {
          newBlock = buildBlock({
            sideEffects: sortedSideEffects,
            defaultish: sortedDefaultish,
            namedOnly: sortedNamedOnly,
            eol,
          });
        } else {
          const mergedDefaultish = sortByLengthDescThenModuleAsc([
            ...sideEffects,
            ...defaultish,
          ]);
          newBlock = buildBlock({
            sideEffects: [],
            defaultish: mergedDefaultish,
            namedOnly,
            eol,
          });
        }

        // Avoid false-positive reports (EOL/trailing whitespace normalization)
        if (
          normalizeForCompare(newBlock) === normalizeForCompare(originalBlock)
        )
          return;

        context.report({
          node: importNodes[0],
          messageId: "notSorted",
          fix(fixer) {
            return fixer.replaceTextRange([start, end], newBlock);
          },
        });
      },
    };
  },
};
