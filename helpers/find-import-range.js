function findImportRange(body, startIndex) {
  let startImportIndex = -1;
  let lastImportIndex = -1;

  for (let j = startIndex; j < body.length; j++) {
    if (body[j].type === 'ImportDeclaration') {
      if (startImportIndex === -1) startImportIndex = j;
      lastImportIndex = j;
    } else {
      break;
    }
  }

  return { startImportIndex, lastImportIndex };
}

module.exports = findImportRange;
