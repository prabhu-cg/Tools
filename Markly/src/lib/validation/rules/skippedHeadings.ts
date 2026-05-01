import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root } from 'mdast'
import type { ValidationIssue } from '../../../types'

export function detectSkippedHeadings(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const tree = unified().use(remarkParse).parse(markdown) as Root
  let prevDepth = 0
  let index = 0

  visit(tree, 'heading', (node) => {
    if (node.depth > prevDepth + 1) {
      const expectedDepth = prevDepth + 1
      if (node.position) {
        const line = node.position.start.line
        issues.push({
          id: `skipped-heading-level-${line}-${index++}`,
          type: 'warning',
          rule: 'skipped-heading-level',
          message: `Skipped heading level (H${prevDepth} → H${node.depth}, expected H${expectedDepth})`,
          line,
          fixable: true,
          fix: (md: string) => {
            const lines = md.split('\n')
            const targetLine = lines[line - 1]
            if (targetLine && /^#{1,6}\s/.test(targetLine)) {
              lines[line - 1] = targetLine.replace(
                /^#+\s/,
                '#'.repeat(expectedDepth) + ' '
              )
            }
            return lines.join('\n')
          },
        })
      }
    }
    prevDepth = node.depth
  })

  return issues
}
