import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { normalizeHeadings } from './normalizeHeadings'
import { normalizeListMarkers } from './normalizeListMarkers'
import { normalizeBlankLines } from './normalizeBlankLines'
import { normalizeIndentation } from './normalizeIndentation'

export function applyCleanup(markdown: string): string {
  const file = unified()
    .use(remarkParse)
    .use(normalizeHeadings)
    .use(normalizeListMarkers)
    .use(normalizeBlankLines)
    .use(normalizeIndentation)
    .use(remarkStringify)
    .processSync(markdown)

  return String(file)
}
