function classify(node) {
  // side-effect: import "x";
  if (!node.specifiers || node.specifiers.length === 0) return 'sideEffect';

  let hasNamespace = false;
  let hasDefault = false;
  let hasNamed = false;

  for (const specifier of node.specifiers) {
    if (specifier.type === 'ImportDefaultSpecifier') hasDefault = true;
    else if (specifier.type === 'ImportSpecifier') hasNamed = true;
    else if (specifier.type === 'ImportNamespaceSpecifier') hasNamespace = true;
  }

  // named-only group (your "Then named imports")
  if (!hasDefault && hasNamed && !hasNamespace) return 'namedOnly';

  // everything else -> default-ish group
  // (defaultOnly, namespaceOnly, mixed default+named, etc.)
  return 'defaultish';
}

module.exports = classify;
