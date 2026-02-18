const { getModuleName } = require('../helpers/utils');

const classify = require('../helpers/classify');

function createImportItems(importNodes, sourceCode) {
  const items = importNodes.map((node) => {
    const text = sourceCode.getText(node);
    return {
      node,
      text,
      len: text.length, // "line length" heuristic: import statement text length
      module: getModuleName(node),
      kind: classify(node),
    };
  });

  return items;
}

module.exports = createImportItems;
