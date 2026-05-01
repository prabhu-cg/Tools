export function txtToMarkdown(text: string): string {
  // Normalize line endings
  const normalized = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')

  // Split on double newlines to get paragraphs
  const paragraphs = normalized
    .split(/\n\n+/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)

  // Rejoin with double newlines
  return paragraphs.join('\n\n')
}
