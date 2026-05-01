export function mdToMarkdown(text: string): string {
  // Normalize line endings, rest will be handled by cleanup + formatter
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
}
