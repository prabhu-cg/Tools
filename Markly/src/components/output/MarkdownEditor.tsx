import { forwardRef } from 'react'
import { useAppStore } from '../../store/appStore'

export const MarkdownEditor = forwardRef<HTMLTextAreaElement>(
  function MarkdownEditor(_props, ref) {
    const { output, setOutput } = useAppStore()

    return (
      <textarea
        ref={ref}
        className="flex-1 w-full resize-none bg-transparent px-4 py-3 text-sm font-mono text-zinc-300 focus:outline-none overflow-y-auto"
        value={output}
        onChange={(e) => setOutput(e.target.value)}
        spellCheck={false}
        placeholder="Output will appear here..."
      />
    )
  }
)
