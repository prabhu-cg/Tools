import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root } from 'mdast'
import type { ValidationIssue } from '../../../types'

export function detectEmptyLinks(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const tree = unified().use(remarkParse).parse(markdown) as Root
  let index = 0

  visit(tree, 'link', (node) => {
    if (!node.url || node.url.trim() === '') {
      if (node.position) {
        const line = node.position.start.line
        issues.push({
          id: `empty-link-${line}-${index++}`,
          type: 'error',
          rule: 'empty-link',
          message: `Link has no URL`,
          line,
          fixable: false,
          fix: null,
        })
      }
    }
  })

  return issues
}
