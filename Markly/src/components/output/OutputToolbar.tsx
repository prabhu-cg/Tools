import { useAppStore } from '../../store/appStore'
import { useClipboard } from '../../hooks/useClipboard'
import { downloadMarkdown } from '../../lib/utils/download'
import { Button } from '../ui/Button'

export function OutputToolbar() {
  const { previewTab, setPreviewTab, output, issues, validationPanelOpen, setValidationPanelOpen } = useAppStore()
  const { copy, copied } = useClipboard()

  const handleCopy = async () => {
    await copy(output)
  }

  const handleDownload = () => {
    downloadMarkdown(output, 'output.md')
  }

  return (
    <div className="h-10 flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
      <div className="flex gap-1 rounded-md bg-zinc-800 p-0.5">
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${
            previewTab === 'raw'
              ? 'bg-zinc-700 text-zinc-100'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          onClick={() => setPreviewTab('raw')}
        >
          Markdown
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${
            previewTab === 'preview'
              ? 'bg-zinc-700 text-zinc-100'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          onClick={() => setPreviewTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={validationPanelOpen ? 'default' : 'ghost'}
          onClick={() => setValidationPanelOpen(!validationPanelOpen)}
        >
          {issues.length > 0 ? `Validate (${issues.length})` : 'Validate'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          disabled={!output}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDownload}
          disabled={!output}
        >
          Download .md
        </Button>
      </div>
    </div>
  )
}
