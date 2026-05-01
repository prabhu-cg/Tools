import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'

export function normalizeHeadings() {
  return function (tree: Root) {
    const headings: Array<{ depth: number; node: any }> = []

    // Collect all headings
    visit(tree, 'heading', (node) => {
      headings.push({ depth: node.depth, node })
    })

    if (headings.length === 0) return

    // Pass 1: shift so minimum depth is always 1
    const minDepth = Math.min(...headings.map((h) => h.depth))
    const shift = minDepth - 1

    if (shift > 0) {
      headings.forEach((h) => {
        h.node.depth = h.node.depth - shift
      })
    }

    // Pass 2: ensure no skipping of levels (H1 → H2 → H3, not H1 → H3)
    let prevDepth = 1
    headings.forEach((h) => {
      if (h.node.depth > prevDepth + 1) {
        h.node.depth = prevDepth + 1
      }
      prevDepth = h.node.depth
    })
  }
}
