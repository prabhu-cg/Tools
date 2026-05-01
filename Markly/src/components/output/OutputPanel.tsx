import { useRef } from 'react'
import { useAppStore } from '../../store/appStore'
import { OutputToolbar } from './OutputToolbar'
import { MarkdownEditor } from './MarkdownEditor'
import { MarkdownPreview } from './MarkdownPreview'

interface OutputPanelProps {
  editorRef?: React.RefObject<HTMLTextAreaElement | null>
}

export function OutputPanel({ editorRef }: OutputPanelProps) {
  const previewTab = useAppStore((s) => s.previewTab)
  const localRef = useRef<HTMLTextAreaElement>(null)
  const ref = editorRef || localRef

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <OutputToolbar />

      {previewTab === 'raw' ? (
        <MarkdownEditor ref={ref} />
      ) : (
        <MarkdownPreview />
      )}
    </div>
  )
}
