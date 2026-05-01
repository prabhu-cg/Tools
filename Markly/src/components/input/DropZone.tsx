import { useRef } from 'react'
import { useFileInput } from '../../hooks/useFileInput'
import { useAppStore } from '../../store/appStore'

interface DropZoneProps {
  onFileSelected: () => void
}

export function DropZone({ onFileSelected }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { onDrop, onDragOver, onDragLeave, onFileSelect, isDragging } =
    useFileInput()
  const filename = useAppStore((s) => s.rawInput?.filename)
  const setRawInput = useAppStore((s) => s.setRawInput)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e)
    onFileSelected()
  }

  if (filename) {
    return (
      <div className="m-4 flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm">
        <svg
          className="h-4 w-4 text-zinc-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z"
          />
        </svg>
        <span className="truncate text-zinc-300">{filename}</span>
        <button
          onClick={() => setRawInput(null)}
          className="ml-auto text-zinc-500 hover:text-zinc-300"
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <div
      className={`m-4 rounded-xl border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-2 py-8 shrink-0 cursor-pointer ${
        isDragging
          ? 'border-sky-500 bg-sky-500/10'
          : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/30'
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <svg
        className="h-8 w-8 text-zinc-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="text-sm text-zinc-400">
        Drop a file or{' '}
        <label className="text-sky-400 underline cursor-pointer">
          browse
          <input
            ref={inputRef}
            type="file"
            accept=".docx,.txt,.md,.markdown"
            onChange={handleFileSelect}
            className="sr-only"
          />
        </label>
      </p>
      <p className="text-xs text-zinc-600">
        .docx · .txt · .md
      </p>
    </div>
  )
}
