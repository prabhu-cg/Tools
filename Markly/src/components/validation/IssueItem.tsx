import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import type { ValidationIssue } from '../../types'

interface IssueItemProps {
  issue: ValidationIssue
  onFix: (fix: (md: string) => string) => void
  onScrollToLine: (line: number) => void
}

const badgeColorMap: Record<ValidationIssue['type'], 'red' | 'amber' | 'sky'> = {
  error: 'red',
  warning: 'amber',
  suggestion: 'sky',
}

export function IssueItem({ issue, onFix, onScrollToLine }: IssueItemProps) {
  const handleFix = () => {
    if (issue.fixable && issue.fix) {
      onFix(issue.fix)
    }
  }

  return (
    <div className="flex items-start gap-3 px-4 py-2 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors group">
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-2 mb-1">
          <Badge color={badgeColorMap[issue.type]}>
            {issue.type}
          </Badge>
          <button
            onClick={() => onScrollToLine(issue.line)}
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Line {issue.line}
          </button>
        </div>
        <p className="text-xs text-zinc-300 break-words">{issue.message}</p>
      </div>

      {issue.fixable && (
        <Button
          size="sm"
          variant="ghost"
          onClick={handleFix}
          disabled={!issue.fix}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Fix
        </Button>
      )}
    </div>
  )
}
