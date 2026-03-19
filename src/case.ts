/**
 * Split a string into words, handling camelCase, PascalCase, snake_case, kebab-case, and spaces.
 */
function splitWords(input: string): string[] {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** Convert a string to camelCase. */
export function toCamelCase(input: string): string {
  const words = splitWords(input);
  return words
    .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/** Convert a string to PascalCase. */
export function toPascalCase(input: string): string {
  return splitWords(input)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/** Convert a string to snake_case. */
export function toSnakeCase(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('_');
}

/** Convert a string to kebab-case. */
export function toKebabCase(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('-');
}

/** Convert a string to Title Case. */
export function toTitleCase(input: string): string {
  return splitWords(input)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Convert a string to the specified case format.
 */
export function toCase(input: string, format: 'camel' | 'pascal' | 'snake' | 'kebab' | 'title'): string {
  switch (format) {
    case 'camel': return toCamelCase(input);
    case 'pascal': return toPascalCase(input);
    case 'snake': return toSnakeCase(input);
    case 'kebab': return toKebabCase(input);
    case 'title': return toTitleCase(input);
  }
}
