import type { Root } from 'mdast'

export function normalizeBlankLines() {
  return function (tree: Root) {
    // Remove empty paragraph nodes (paragraphs with only whitespace)
    tree.children = tree.children.filter((node) => {
      if (node.type === 'paragraph') {
        const hasText = node.children.some(
          (child: any) =>
            child.type === 'text' && child.value.trim().length > 0
        )
        return hasText
      }
      return true
    })

    // Remove empty HTML nodes (artifacts from mammoth like <br> chains)
    tree.children = tree.children.filter((node) => {
      if (node.type === 'html') {
        const value = (node as any).value
        return !/^(<br\s*\/?>\s*|&nbsp;|\s)*$/.test(value)
      }
      return true
    })
  }
}
