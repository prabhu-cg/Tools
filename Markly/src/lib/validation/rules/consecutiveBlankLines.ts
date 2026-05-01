import type { ValidationIssue } from '../../../types'

export function detectConsecutiveBlankLines(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const lines = markdown.split('\n')
  let blankCount = 0
  let blankStart = -1
  let index = 0

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') {
      if (blankCount === 0) blankStart = i
      blankCount++
    } else {
      if (blankCount >= 3) {
        const startLine = blankStart + 1
        issues.push({
          id: `consecutive-blank-lines-${startLine}-${index++}`,
          type: 'warning',
          rule: 'consecutive-blank-lines',
          message: `${blankCount} consecutive blank lines (max 2 recommended)`,
          line: startLine,
          fixable: true,
          fix: (md: string) => {
            const ls = md.split('\n')
            ls.splice(blankStart, blankCount - 1)
            return ls.join('\n')
          },
        })
      }
      blankCount = 0
      blankStart = -1
    }
  }

  return issues
}
