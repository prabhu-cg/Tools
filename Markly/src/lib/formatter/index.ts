import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { STRINGIFY_OPTIONS } from './stringifyOptions'

export function applyFormatter(markdown: string): string {
  const file = unified()
    .use(remarkParse)
    .use(remarkStringify, STRINGIFY_OPTIONS)
    .processSync(markdown)

  return String(file)
}
