import type { ValidationIssue } from '../../../types'

export function detectMalformedLinks(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const lines = markdown.split('\n')
  let index = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const unclosedLinkMatch = /\[[^\]]+\]\s*\(\s*[^)]*$/.test(line)

    if (unclosedLinkMatch && /\[[^\]]+\]\s*\(\s*[^)]*$/.test(line)) {
      issues.push({
        id: `malformed-link-${i + 1}-${index++}`,
        type: 'error',
        rule: 'malformed-link',
        message: `Malformed link (unclosed parenthesis)`,
        line: i + 1,
        fixable: false,
        fix: null,
      })
    }
  }

  return issues
}
