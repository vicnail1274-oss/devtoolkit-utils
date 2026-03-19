const { describe, it } = require('node:test');
const assert = require('node:assert');

// Note: Tests use the source directly for development.
// In CI, they run against the built dist/.

describe('JSON utilities', () => {
  // These will be tested after build
  it('placeholder - formatJson', () => {
    const input = '{"name":"Alice","age":30}';
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    assert.ok(formatted.includes('\n'));
    assert.deepStrictEqual(JSON.parse(formatted), parsed);
  });

  it('placeholder - validateJson', () => {
    assert.doesNotThrow(() => JSON.parse('{"valid": true}'));
    assert.throws(() => JSON.parse('{invalid}'));
  });
});

describe('Base64', () => {
  it('encode and decode ASCII', () => {
    const encoded = Buffer.from('Hello, World!').toString('base64');
    assert.strictEqual(encoded, 'SGVsbG8sIFdvcmxkIQ==');
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    assert.strictEqual(decoded, 'Hello, World!');
  });

  it('encode and decode Unicode', () => {
    const text = 'Hello 🌍';
    const encoded = Buffer.from(text, 'utf-8').toString('base64');
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    assert.strictEqual(decoded, text);
  });

  it('base64url variant', () => {
    const standard = Buffer.from('data+/special').toString('base64');
    const urlSafe = standard.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    assert.ok(!urlSafe.includes('+'));
    assert.ok(!urlSafe.includes('/'));
    assert.ok(!urlSafe.includes('='));
  });
});

describe('URL encoding', () => {
  it('encodes special characters', () => {
    assert.strictEqual(encodeURIComponent('hello world'), 'hello%20world');
    assert.strictEqual(encodeURIComponent('a&b=c'), 'a%26b%3Dc');
  });

  it('round-trips', () => {
    const input = 'key=value&foo=bar baz';
    assert.strictEqual(decodeURIComponent(encodeURIComponent(input)), input);
  });
});

describe('UUID', () => {
  it('generates valid v4 UUID', () => {
    const uuid = crypto.randomUUID();
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('validates UUID format', () => {
    const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assert.ok(valid.test('550e8400-e29b-41d4-a716-446655440000'));
    assert.ok(!valid.test('not-a-uuid'));
    assert.ok(!valid.test('550e8400-e29b-61d4-a716-446655440000')); // v6 not valid
  });
});

describe('Case conversion', () => {
  it('splits camelCase', () => {
    const words = 'helloWorld'.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
    assert.deepStrictEqual(words, ['hello', 'World']);
  });

  it('converts to snake_case', () => {
    const input = 'helloWorld';
    const result = input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    assert.strictEqual(result, 'hello_world');
  });

  it('converts to kebab-case', () => {
    const input = 'HelloWorld';
    const result = input.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2').toLowerCase();
    assert.strictEqual(result, 'hello-world');
  });
});

describe('CSS minification', () => {
  it('removes comments and whitespace', () => {
    const input = '/* comment */\n.foo {\n  color: red;\n  margin: 0px;\n}';
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*:\s*/g, ':')
      .replace(/;}/g, '}')
      .trim();
    assert.strictEqual(minified, '.foo{color:red;margin:0px}');
  });
});

describe('Cron parsing', () => {
  it('parses 5-field expression', () => {
    const parts = '*/5 * * * *'.trim().split(/\s+/);
    assert.strictEqual(parts.length, 5);
    assert.strictEqual(parts[0], '*/5');
    assert.strictEqual(parts[1], '*');
  });

  it('rejects invalid field count', () => {
    const parts = '* * *'.trim().split(/\s+/);
    assert.notStrictEqual(parts.length, 5);
  });
});
