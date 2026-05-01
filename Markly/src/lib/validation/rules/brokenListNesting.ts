import { visit, SKIP } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root, ListItem } from 'mdast'
import type { ValidationIssue } from '../../../types'

export function detectBrokenListNesting(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const tree = unified().use(remarkParse).parse(markdown) as Root
  let index = 0

  visit(tree, 'listItem', (node: ListItem, _nodeIndex: number | undefined, parent: any) => {
    if (!parent || parent.type !== 'list') return

    const children = node.children || []
    const nestedLists = children.filter((child) => child.type === 'list')

    nestedLists.forEach((list: any) => {
      if (list.position && parent.depth !== undefined) {
        const childDepth = (list as any).depth ?? 1
        const expectedMaxDepth = (parent.depth ?? 1) + 1

        if (childDepth > expectedMaxDepth) {
          const line = list.position.start.line
          issues.push({
            id: `broken-list-nesting-${line}-${index++}`,
            type: 'warning',
            rule: 'broken-list-nesting',
            message: `List nesting skips levels (may cause rendering issues)`,
            line,
            fixable: false,
            fix: null,
          })
        }
      }
    })

    return SKIP
  })

  return issues
}
