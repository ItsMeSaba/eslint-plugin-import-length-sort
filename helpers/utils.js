// REFACTOR: This is a one-line wrapper. Consider inlining it where used (line 157)
// or removing if it doesn't add meaningful abstraction.
function getImportText(sourceCode, node) {
  return sourceCode.getText(node);
}

function getModuleName(node) {
  return String(node?.source?.value ?? '');
}

// IMPROVE: Could use localeCompare for string comparison.
// Also consider: return b.len - a.len || a.module.localeCompare(b.module)
function sortByLengthDescThenModuleAsc(items) {
  return items.toSorted((a, b) => {
    if (b.len !== a.len) return b.len - a.len;
    if (a.module < b.module) return -1;
    if (a.module > b.module) return 1;
    return 0;
  });
}

function normalizeForCompare(s) {
  return (
    s
      // normalize EOL so LF/CRLF differences don't cause false positives
      .replace(/\r\n/g, '\n')
      // strip trailing whitespace per line
      .replace(/[ \t]+$/gm, '')
      // ignore trailing newlines/whitespace at end of block
      .trimEnd()
  );
}

module.exports = {
  sortByLengthDescThenModuleAsc,
  normalizeForCompare,
  getModuleName,
  getImportText,
};
