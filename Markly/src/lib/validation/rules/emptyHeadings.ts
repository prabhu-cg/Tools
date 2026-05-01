import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root } from 'mdast'
import type { ValidationIssue } from '../../../types'

export function detectEmptyHeadings(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const tree = unified().use(remarkParse).parse(markdown) as Root
  let index = 0

  visit(tree, 'heading', (node) => {
    const hasContent = node.children.some((child) => {
      if (child.type === 'text') {
        return (child as any).value.trim().length > 0
      }
      return true
    })

    if (!hasContent && node.position) {
      const line = node.position.start.line
      issues.push({
        id: `empty-heading-${line}-${index++}`,
        type: 'warning',
        rule: 'empty-heading',
        message: `Empty heading`,
        line,
        fixable: true,
        fix: (md: string) => {
          const lines = md.split('\n')
          lines.splice(line - 1, 1)
          return lines.join('\n')
        },
      })
    }
  })

  return issues
}
