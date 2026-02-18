// Skip directive prologue ("use client", "use server", etc.)
function findFirstNonDirectiveIndex(body) {
  let i = 0;

  for (; i < body.length; i++) {
    const stmt = body[i];
    const isDirective = stmt.type === 'ExpressionStatement' && typeof stmt.directive === 'string';
    if (isDirective) continue;
    break;
  }

  return i;
}

module.exports = findFirstNonDirectiveIndex;
