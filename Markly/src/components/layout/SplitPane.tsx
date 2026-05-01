import { useRef, useCallback } from 'react'
import { useAppStore } from '../../store/appStore'
import { InputPanel } from '../input/InputPanel'
import { OutputPanel } from '../output/OutputPanel'
import { ValidationPanel } from '../validation/ValidationPanel'

export function SplitPane() {
  const validationPanelOpen = useAppStore((s) => s.validationPanelOpen)
  const editorRef = useRef<HTMLTextAreaElement | null>(null)

  const scrollToLine = useCallback((lineNumber: number) => {
    const el = editorRef.current
    if (!el) return

    const text = el.value
    const lines = text.split('\n')

    let charOffset = 0
    for (let i = 0; i < lineNumber - 1; i++) {
      charOffset += (lines[i]?.length ?? 0) + 1
    }

    const lineEnd = charOffset + (lines[lineNumber - 1]?.length ?? 0)
    el.focus()
    el.setSelectionRange(charOffset, lineEnd)

    const lineHeight = 20
    el.scrollTop = Math.max(0, (lineNumber - 1) * lineHeight - el.clientHeight / 2)
  }, [])

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-[30%] flex flex-col border-r border-zinc-800 overflow-hidden shrink-0">
        <InputPanel />
      </div>

      <div className={`flex flex-col overflow-hidden border-r border-zinc-800 ${validationPanelOpen ? 'flex-1 min-w-0' : 'flex-1'}`}>
        <OutputPanel editorRef={editorRef} />
      </div>

      {validationPanelOpen && (
        <div className="w-[25%] flex flex-col overflow-hidden shrink-0">
          <ValidationPanel onScrollToLine={scrollToLine} />
        </div>
      )}
    </div>
  )
}
