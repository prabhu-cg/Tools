export type IssueType = 'error' | 'warning' | 'suggestion'

export type RuleName =
  | 'multiple-h1'
  | 'skipped-heading-level'
  | 'empty-heading'
  | 'inconsistent-emphasis'
  | 'consecutive-blank-lines'
  | 'missing-blank-before-heading'
  | 'broken-list-nesting'
  | 'mixed-bullet-types'
  | 'empty-link'
  | 'malformed-link'

export interface ValidationIssue {
  id: string
  type: IssueType
  rule: RuleName
  message: string
  line: number
  fixable: boolean
  fix: ((markdown: string) => string) | null
}

export interface IssueFilter {
  errors: boolean
  warnings: boolean
  suggestions: boolean
}
