function buildBlock({ sideEffects, defaultish, namedOnly, eol }) {
  const parts = [];

  const pushGroup = (arr) => {
    if (arr.length === 0) return;
    if (parts.length > 0) parts.push(''); // blank line between groups
    parts.push(...arr.map((x) => x.text));
  };

  pushGroup(sideEffects);
  pushGroup(defaultish);
  pushGroup(namedOnly);

  return parts.join(eol);
}

module.exports = buildBlock;
