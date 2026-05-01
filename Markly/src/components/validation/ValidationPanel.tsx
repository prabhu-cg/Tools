import { useAppStore } from '../../store/appStore'
import { Button } from '../ui/Button'
import { IssueFilter } from './IssueFilter'
import { IssueList } from './IssueList'

interface ValidationPanelProps {
  onScrollToLine: (line: number) => void
}

export function ValidationPanel({ onScrollToLine }: ValidationPanelProps) {
  const { issues, issueFilter, setIssueFilter, applyFix, applyFixAll, undo, outputHistory } =
    useAppStore()

  const counts = {
    errors: issues.filter((i) => i.type === 'error').length,
    warnings: issues.filter((i) => i.type === 'warning').length,
    suggestions: issues.filter((i) => i.type === 'suggestion').length,
  }

  const filteredIssues = issues.filter((issue) => {
    if (issue.type === 'error' && !issueFilter.errors) return false
    if (issue.type === 'warning' && !issueFilter.warnings) return false
    if (issue.type === 'suggestion' && !issueFilter.suggestions) return false
    return true
  })

  const fixableCount = filteredIssues.filter((i) => i.fixable && i.fix).length

  const handleFixAll = () => {
    const fixes = filteredIssues
      .filter((i) => i.fixable && i.fix)
      .sort((a, b) => b.line - a.line)
      .map((i) => i.fix!)

    applyFixAll(fixes)
  }

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <div className="h-10 flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Validation ({issues.length})
        </span>
      </div>

      <IssueFilter filter={issueFilter} counts={counts} onChange={setIssueFilter} />

      <IssueList
        issues={issues}
        filter={issueFilter}
        onFix={applyFix}
        onScrollToLine={onScrollToLine}
      />

      <div className="h-12 flex items-center justify-between px-4 border-t border-zinc-800 bg-zinc-900/50 shrink-0 gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleFixAll}
          disabled={fixableCount === 0}
        >
          Fix All ({fixableCount})
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={undo}
          disabled={outputHistory.length === 0}
        >
          Undo ({outputHistory.length})
        </Button>
      </div>
    </div>
  )
}
