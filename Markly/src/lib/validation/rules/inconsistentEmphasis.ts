import type { ValidationIssue } from '../../../types'

export function detectInconsistentEmphasis(markdown: string): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  const hasDoubleUnderscore = /__(.+?)__/.test(markdown)
  const hasSingleUnderscore = /_([a-zA-Z0-9]+)_/.test(markdown)

  if (hasDoubleUnderscore || hasSingleUnderscore) {
    issues.push({
      id: 'inconsistent-emphasis-1-0',
      type: 'warning',
      rule: 'inconsistent-emphasis',
      message: 'Inconsistent emphasis markers (_ and __ detected; use ** and * for consistency)',
      line: 1,
      fixable: true,
      fix: (md: string) => {
        return md.replace(/__(.+?)__/g, '**$1**').replace(/_([a-zA-Z0-9]+)_/g, '*$1*')
      },
    })
  }

  return issues
}
