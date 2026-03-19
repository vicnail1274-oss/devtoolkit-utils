/**
 * URL-encode a string (percent-encoding).
 */
export function urlEncode(input: string): string {
  return encodeURIComponent(input);
}

/**
 * Decode a URL-encoded string.
 */
export function urlDecode(input: string): string {
  return decodeURIComponent(input);
}

/**
 * Encode an object of key-value pairs into a URL query string.
 * @param params - Object with string keys and string/number/boolean values
 * @returns Query string without leading `?`
 */
export function encodeQueryParams(params: Record<string, string | number | boolean>): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}
