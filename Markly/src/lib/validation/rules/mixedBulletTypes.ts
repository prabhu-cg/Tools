import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root, List, ListItem } from 'mdast'
import type { ValidationIssue } from '../../../types'

export function detectMixedBulletTypes(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const tree = unified().use(remarkParse).parse(markdown) as Root
  const lines = markdown.split('\n')
  let index = 0

  visit(tree, 'list', (node: List) => {
    if (node.ordered) return

    const bulletChars = new Set<string>()
    const positions: Array<{ char: string; line: number }> = []

    node.children.forEach((item: ListItem) => {
      if (item.position) {
        const line = item.position.start.line - 1
        const lineText = lines[line]
        const match = lineText?.match(/^\s*([-*+])\s/)
        if (match) {
          const char = match[1]
          bulletChars.add(char)
          positions.push({ char, line: item.position.start.line })
        }
      }
    })

    if (bulletChars.size > 1 && positions.length > 0) {
      positions.forEach((pos) => {
        issues.push({
          id: `mixed-bullet-types-${pos.line}-${index++}`,
          type: 'warning',
          rule: 'mixed-bullet-types',
          message: `Mixed bullet types in list (use - consistently)`,
          line: pos.line,
          fixable: true,
          fix: (md: string) => {
            const ls = md.split('\n')
            ls[pos.line - 1] = ls[pos.line - 1]?.replace(/^\s*([-*+])\s/, '- ')
            return ls.join('\n')
          },
        })
      })
    }
  })

  return issues
}
