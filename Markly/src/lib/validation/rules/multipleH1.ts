import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root } from 'mdast'
import type { ValidationIssue } from '../../../types'

export function detectMultipleH1(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const tree = unified().use(remarkParse).parse(markdown) as Root
  const h1s: Array<{ position?: any }> = []
  let issueIndex = 0

  visit(tree, 'heading', (node) => {
    if (node.depth === 1) {
      h1s.push({ position: node.position })
    }
  })

  for (let i = 1; i < h1s.length; i++) {
    const h1 = h1s[i]
    const line = h1.position?.start.line ?? 0

    issues.push({
      id: `multiple-h1-${line}-${issueIndex}`,
      type: 'error',
      rule: 'multiple-h1',
      message: `Multiple H1 headings found (consider using H2 for subheadings)`,
      line,
      fixable: true,
      fix: (md: string) => {
        const lines = md.split('\n')
        if (line > 0 && line - 1 < lines.length) {
          lines[line - 1] = lines[line - 1].replace(/^#\s/, '## ')
        }
        return lines.join('\n')
      },
    })
    issueIndex++
  }

  return issues
}
