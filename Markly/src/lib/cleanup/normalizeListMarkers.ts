import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'

export function normalizeListMarkers() {
  return function (tree: Root) {
    // Visit all text nodes and normalize bold/italic markers
    visit(tree, 'text', (node) => {
      // Replace __ with ** for bold
      node.value = node.value.replace(/__(.+?)__/g, '**$1**')
      // Replace _ with * for italic (but be careful with emphasis markers)
      node.value = node.value.replace(/_(.+?)_/g, '*$1*')
    })

    // The remark-stringify with bullet: '-' option will handle list markers
    // No need to manually fix those here
  }
}
