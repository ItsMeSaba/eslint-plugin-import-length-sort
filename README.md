# eslint-plugin-import-length-sort

> ESLint plugin that sorts imports by line length (default-ish first, then named-only), longest to shortest.

## Installation

```bash
npm install --save-dev eslint-plugin-import-length-sort
```

or with yarn:

```bash
yarn add --dev eslint-plugin-import-length-sort
```

## Usage

### Flat Config (ESLint 9+)

```js
import importLengthSort from "eslint-plugin-import-length-sort";

export default [
  {
    plugins: {
      "import-length-sort": importLengthSort,
    },
    rules: {
      "import-length-sort/sort": "warn",
    },
  },
];
```

### Legacy Config (.eslintrc)

```json
{
  "plugins": ["import-length-sort"],
  "rules": {
    "import-length-sort/sort": "warn"
  }
}
```

### Using Recommended Config

```json
{
  "extends": ["plugin:import-length-sort/recommended"]
}
```

## Rule: `import-length-sort/sort`

Sorts the top-of-file import block by line length in descending order (longest to shortest).

### Sorting Strategy

1. **Default-ish imports** (default-only, namespace, mixed default+named) are sorted by line length (DESC)
2. **Named-only imports** are sorted by line length (DESC)
3. **Side-effect imports** are kept at the top by default (configurable)

### Options

```json
{
  "import-length-sort/sort": ["warn", {
    "keepSideEffectAtTop": true
  }]
}
```

- `keepSideEffectAtTop` (boolean, default: `true`) - When `true`, side-effect imports (e.g., `import './styles.css'`) stay at the top. When `false`, they're merged with default imports.

## Examples

### Before

```js
import { a } from 'short';
import defaultExport from 'very-long-module-name';
import { foo, bar, baz } from 'another-module';
```

### After

```js
import { foo, bar, baz } from 'another-module';
import defaultExport from 'very-long-module-name';
import { a } from 'short';
```

## Why Sort by Length?

Sorting imports by line length (longest to shortest) creates a visually appealing "pyramid" or "descending" structure that:
- Makes it easier to scan imports at a glance
- Reduces cognitive load when reviewing code
- Creates a consistent, predictable ordering

## Auto-fix

This rule supports ESLint's `--fix` option to automatically sort your imports.

```bash
eslint --fix .
```

## License

ISC © Saba Silagadze

## Contributing

Issues and pull requests are welcome!

## Repository

[https://github.com/sabasilagadze/eslint-plugin-import-length-sort](https://github.com/sabasilagadze/eslint-plugin-import-length-sort)
