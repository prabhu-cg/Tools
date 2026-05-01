import type { ValidationIssue } from '../../../types'

export function detectMissingBlankBeforeHeading(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const lines = markdown.split('\n')
  let index = 0

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i]
    const prevLine = lines[i - 1]

    if (/^#{1,6}\s/.test(currentLine) && prevLine.trim().length > 0) {
      const line = i + 1
      issues.push({
        id: `missing-blank-before-heading-${line}-${index++}`,
        type: 'suggestion',
        rule: 'missing-blank-before-heading',
        message: `Missing blank line before heading`,
        line,
        fixable: true,
        fix: (md: string) => {
          const ls = md.split('\n')
          ls.splice(i, 0, '')
          return ls.join('\n')
        },
      })
    }
  }

  return issues
}
