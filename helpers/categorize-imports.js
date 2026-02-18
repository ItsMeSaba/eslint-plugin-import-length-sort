function categorizeImports(items) {
  const sideEffects = [];
  const defaultish = [];
  const namedOnly = [];

  for (const it of items) {
    if (it.kind === 'sideEffect') sideEffects.push(it);
    else if (it.kind === 'namedOnly') namedOnly.push(it);
    else defaultish.push(it);
  }

  return { sideEffects, defaultish, namedOnly };
}

module.exports = categorizeImports;
