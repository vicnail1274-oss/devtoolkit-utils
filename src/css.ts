/**
 * Minify CSS by removing comments, whitespace, and applying basic optimizations.
 * @param input - CSS string to minify
 * @returns Minified CSS string
 */
export function minifyCss(input: string): string {
  let css = input;

  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove whitespace around selectors and braces
  css = css.replace(/\s*{\s*/g, '{');
  css = css.replace(/\s*}\s*/g, '}');
  css = css.replace(/\s*;\s*/g, ';');
  css = css.replace(/\s*:\s*/g, ':');
  css = css.replace(/\s*,\s*/g, ',');

  // Remove trailing semicolons before closing braces
  css = css.replace(/;}/g, '}');

  // Collapse multiple spaces
  css = css.replace(/\s+/g, ' ');

  // Shorten hex colors: #ffffff -> #fff
  css = css.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, '#$1$2$3');

  // Remove units from zero values (except where required)
  css = css.replace(/([:\s])0(px|em|rem|%|vh|vw|vmin|vmax|ex|ch)/g, '$10');

  // Shorten 0.x to .x
  css = css.replace(/([:\s])0\.([0-9]+)/g, '$1.$2');

  // Trim
  css = css.trim();

  return css;
}
