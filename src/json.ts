/**
 * Format (pretty-print) a JSON string with the given indentation.
 * @param input - JSON string to format
 * @param indent - Number of spaces for indentation (default: 2)
 * @returns Formatted JSON string
 * @throws SyntaxError if the input is not valid JSON
 */
export function formatJson(input: string, indent: number = 2): string {
  return JSON.stringify(JSON.parse(input), null, indent);
}

/**
 * Minify a JSON string by removing all whitespace.
 * @param input - JSON string to minify
 * @returns Minified JSON string
 * @throws SyntaxError if the input is not valid JSON
 */
export function minifyJson(input: string): string {
  return JSON.stringify(JSON.parse(input));
}

/**
 * Validate whether a string is valid JSON.
 * @param input - String to validate
 * @returns Object with `valid` boolean and optional `error` message
 */
export function validateJson(input: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}
