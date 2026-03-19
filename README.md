# devtoolkit-utils

[![CI](https://github.com/vicnail1274-oss/devtoolkit-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/vicnail1274-oss/devtoolkit-utils/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/devtoolkit-utils)](https://www.npmjs.com/package/devtoolkit-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-green)](https://www.npmjs.com/package/devtoolkit-utils)

Lightweight developer utility functions — JSON formatting, Base64 encoding, URL encoding, hash generation, UUID, cron parsing, CSS minification, and case conversion. **Zero dependencies.** Works in Node.js, Deno, Bun, and browsers.

> These are the same utilities that power [DevToolkit](https://devtoolkit-db7.pages.dev) — 30+ free online developer tools.

## Install

```bash
npm install devtoolkit-utils
```

```bash
pnpm add devtoolkit-utils
```

```bash
yarn add devtoolkit-utils
```

## Quick Start

```typescript
import { formatJson, base64Encode, generateUuid, sha256 } from 'devtoolkit-utils';

// Format JSON
const pretty = formatJson('{"name":"Alice","age":30}');
// {
//   "name": "Alice",
//   "age": 30
// }

// Base64
const encoded = base64Encode('Hello, World!');
// "SGVsbG8sIFdvcmxkIQ=="

// UUID
const id = generateUuid();
// "550e8400-e29b-41d4-a716-446655440000"

// Hash
const hash = await sha256('hello');
// "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
```

## API Reference

### JSON

```typescript
import { formatJson, minifyJson, validateJson } from 'devtoolkit-utils';

formatJson('{"a":1}');              // Pretty-print with 2-space indent
formatJson('{"a":1}', 4);          // Pretty-print with 4-space indent
minifyJson('{\n  "a": 1\n}');      // '{"a":1}'
validateJson('{"valid":true}');     // { valid: true }
validateJson('{broken}');           // { valid: false, error: "..." }
```

**[Try online → JSON Formatter](https://devtoolkit-db7.pages.dev/tools/json-formatter)**

### Base64

```typescript
import { base64Encode, base64Decode, base64UrlEncode, base64UrlDecode } from 'devtoolkit-utils';

base64Encode('Hello 🌍');          // Standard Base64 (handles Unicode)
base64Decode('SGVsbG8=');           // Decode to UTF-8 string
base64UrlEncode('data+/special');   // URL-safe, no padding
base64UrlDecode('ZGF0YSsvc3BlY2lhbA');
```

**[Try online → Base64 Encoder/Decoder](https://devtoolkit-db7.pages.dev/tools/base64)**

### URL Encoding

```typescript
import { urlEncode, urlDecode, encodeQueryParams } from 'devtoolkit-utils';

urlEncode('hello world');           // 'hello%20world'
urlDecode('hello%20world');         // 'hello world'
encodeQueryParams({
  q: 'search term',
  page: 1,
  active: true
});
// 'q=search%20term&page=1&active=true'
```

**[Try online → URL Encoder/Decoder](https://devtoolkit-db7.pages.dev/tools/url-encode)**

### UUID

```typescript
import { generateUuid, isValidUuid } from 'devtoolkit-utils';

generateUuid();                     // RFC 4122 v4 UUID
isValidUuid('550e8400-...');        // true
isValidUuid('not-a-uuid');          // false
```

**[Try online → UUID Generator](https://devtoolkit-db7.pages.dev/tools/uuid-generator)**

### Hashing

```typescript
import { sha256, sha1, sha512, md5, hashString } from 'devtoolkit-utils';

await sha256('hello');              // SHA-256 hex digest
await sha1('hello');                // SHA-1 hex digest
await sha512('hello');              // SHA-512 hex digest
md5('hello');                       // MD5 hex digest (sync, not secure)
await hashString('hello', 'SHA-384'); // Any Web Crypto algorithm
```

**[Try online → Hash Generator](https://devtoolkit-db7.pages.dev/tools/hash-generator)**

### Cron Expressions

```typescript
import { parseCron, describeCron, nextCronRun } from 'devtoolkit-utils';

parseCron('*/5 * * * *');
// { minute: '*/5', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' }

describeCron('0 9 * * 1-5');
// "At minute 0, at 9:00, on Monday through Friday"

nextCronRun('0 9 * * 1-5', 3);
// [Date, Date, Date] — next 3 weekday 9am runs
```

**[Try online → Cron Expression Builder](https://devtoolkit-db7.pages.dev/tools/cron-generator)**

### CSS Minification

```typescript
import { minifyCss } from 'devtoolkit-utils';

minifyCss(`
  /* Navigation */
  .nav {
    display: flex;
    margin: 0px;
    color: #ffffff;
  }
`);
// '.nav{display:flex;margin:0;color:#fff}'
```

**[Try online → CSS Minifier](https://devtoolkit-db7.pages.dev/tools/css-minifier)**

### Case Conversion

```typescript
import { toCamelCase, toSnakeCase, toKebabCase, toPascalCase, toTitleCase, toCase } from 'devtoolkit-utils';

toCamelCase('hello-world');         // 'helloWorld'
toSnakeCase('helloWorld');          // 'hello_world'
toKebabCase('HelloWorld');          // 'hello-world'
toPascalCase('hello_world');        // 'HelloWorld'
toTitleCase('hello-world');         // 'Hello World'
toCase('hello world', 'camel');     // 'helloWorld'
```

**[Try online → Text Case Converter](https://devtoolkit-db7.pages.dev/tools/text-case-converter)**

## Features

- **Zero dependencies** — no bloat, no supply chain risk
- **TypeScript first** — full type definitions included
- **Tree-shakeable** — ESM + CJS dual exports, import only what you need
- **Universal** — works in Node.js 18+, Deno, Bun, and modern browsers
- **Well-tested** — CI on Node 18, 20, and 22

## Online Tools

These utilities power [DevToolkit](https://devtoolkit-db7.pages.dev) — 30+ free online developer tools:

| Tool | URL |
|------|-----|
| JSON Formatter | [devtoolkit.cc/tools/json-formatter](https://devtoolkit-db7.pages.dev/tools/json-formatter) |
| Base64 Encoder/Decoder | [devtoolkit.cc/tools/base64](https://devtoolkit-db7.pages.dev/tools/base64) |
| URL Encoder/Decoder | [devtoolkit.cc/tools/url-encode](https://devtoolkit-db7.pages.dev/tools/url-encode) |
| UUID Generator | [devtoolkit.cc/tools/uuid-generator](https://devtoolkit-db7.pages.dev/tools/uuid-generator) |
| Hash Generator | [devtoolkit.cc/tools/hash-generator](https://devtoolkit-db7.pages.dev/tools/hash-generator) |
| Cron Expression Builder | [devtoolkit.cc/tools/cron-generator](https://devtoolkit-db7.pages.dev/tools/cron-generator) |
| CSS Minifier | [devtoolkit.cc/tools/css-minifier](https://devtoolkit-db7.pages.dev/tools/css-minifier) |
| Text Case Converter | [devtoolkit.cc/tools/text-case-converter](https://devtoolkit-db7.pages.dev/tools/text-case-converter) |
| JSON Schema Generator | [devtoolkit.cc/tools/json-schema-generator](https://devtoolkit-db7.pages.dev/tools/json-schema-generator) |
| API Tester | [devtoolkit.cc/tools/api-tester](https://devtoolkit-db7.pages.dev/tools/api-tester) |

## Contributing

Issues and PRs welcome! Please open an issue first to discuss what you'd like to change.

```bash
git clone https://github.com/vicnail1274-oss/devtoolkit-utils.git
cd devtoolkit-utils
npm install
npm test
npm run build
```

## License

[MIT](LICENSE) — use it however you want.
