/** Hero/poster source URL — delivery transforms happen in CloudinaryImage / loader. */
export function heroPosterUrl(src?: string): string | undefined {
  if (!src) return undefined;
  return src;
}
