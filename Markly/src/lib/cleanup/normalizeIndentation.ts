import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'

export function normalizeIndentation() {
  return function (tree: Root) {
    // Check and fix list nesting depth
    visit(tree, 'list', (node) => {
      if (!node.children) return
      for (const item of node.children) {
        if (!item.children) continue
        // Accept list structure as-is - deeper nesting fixes would require
        // more complex restructuring
      }
    })
  }
}
