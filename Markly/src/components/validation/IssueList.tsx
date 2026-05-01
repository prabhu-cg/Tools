import { IssueItem } from './IssueItem'
import type { ValidationIssue, IssueFilter } from '../../types'

interface IssueListProps {
  issues: ValidationIssue[]
  filter: IssueFilter
  onFix: (fix: (md: string) => string) => void
  onScrollToLine: (line: number) => void
}

export function IssueList({
  issues,
  filter,
  onFix,
  onScrollToLine,
}: IssueListProps) {
  const filtered = issues.filter((issue) => {
    if (issue.type === 'error' && !filter.errors) return false
    if (issue.type === 'warning' && !filter.warnings) return false
    if (issue.type === 'suggestion' && !filter.suggestions) return false
    return true
  })

  if (filtered.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-center px-4">
        <p className="text-sm text-zinc-400">
          {issues.length === 0 ? 'No issues found' : 'No issues match the current filter'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {filtered.map((issue) => (
        <IssueItem
          key={issue.id}
          issue={issue}
          onFix={onFix}
          onScrollToLine={onScrollToLine}
        />
      ))}
    </div>
  )
}
