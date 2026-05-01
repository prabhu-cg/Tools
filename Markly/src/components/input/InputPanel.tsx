import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useConversion } from '../../hooks/useConversion'
import { useInputMode } from '../../hooks/useInputMode'
import { Button } from '../ui/Button'
import { Toggle } from '../ui/Toggle'
import { Spinner } from '../ui/Spinner'
import { DropZone } from './DropZone'
import { PasteArea } from './PasteArea'

export function InputPanel() {
  const rawInput = useAppStore((s) => s.rawInput)
  const status = useAppStore((s) => s.status)
  const { run } = useConversion()
  useInputMode()
  const [pasteAreaExpanded, setPasteAreaExpanded] = useState(false)

  const handleFileSelected = () => {
    setPasteAreaExpanded(false)
  }

  const isProcessing = status === 'processing'
  const hasInput = !!rawInput

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="h-10 flex items-center px-4 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Input
        </span>
      </div>

      <DropZone onFileSelected={handleFileSelected} />

      {pasteAreaExpanded || !hasInput ? (
        <>
          <div className="h-px bg-zinc-800 mx-4" />
          <PasteArea />
        </>
      ) : null}

      <div className="h-14 flex items-center justify-between px-4 border-t border-zinc-800 bg-zinc-900/50 shrink-0 gap-3">
        <Toggle
          checked={pasteAreaExpanded}
          onChange={setPasteAreaExpanded}
          label="Show paste area"
          disabled={!hasInput}
        />
        <Button
          onClick={run}
          disabled={!hasInput || isProcessing}
          size="md"
        >
          {isProcessing && <Spinner />}
          {isProcessing
            ? 'Processing...'
            : 'Clean & Format'}
        </Button>
      </div>
    </div>
  )
}
