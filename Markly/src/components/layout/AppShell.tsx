import { useAppStore } from '../../store/appStore'
import { Toast } from '../ui/Toast'
import { ModeIndicator } from '../input/ModeIndicator'
import { SplitPane } from './SplitPane'

export function AppShell() {
  const errorMessage = useAppStore((s) => s.errorMessage)

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800 bg-zinc-900 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight text-white">
            Markly
          </span>
          <span className="text-xs text-zinc-500">
            DOCX / TXT / MD → Markdown
          </span>
        </div>
        <ModeIndicator />
      </header>

      <SplitPane />

      {errorMessage && (
        <Toast
          message={errorMessage}
          type="error"
          duration={3000}
        />
      )}
    </div>
  )
}
