import { useAppStore } from '../../store/appStore'
import { detectInputType } from '../../lib/pipeline/detectType'

export function PasteArea() {
  const { rawInput, setRawInput } = useAppStore()
  const pasteValue =
    rawInput?.type === 'md' || rawInput?.type === 'txt'
      ? rawInput.text || ''
      : ''

  const handlePasteChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value

    if (!text.trim()) {
      setRawInput(null)
      return
    }

    const type = detectInputType(undefined, text)

    setRawInput({
      type,
      text,
    })
  }

  return (
    <textarea
      className="flex-1 w-full resize-none bg-transparent px-4 py-3 text-sm font-mono text-zinc-300 placeholder:text-zinc-600 focus:outline-none overflow-y-auto"
      placeholder="Or paste your DOCX-converted content, plain text, or Markdown here..."
      value={pasteValue}
      onChange={handlePasteChange}
      spellCheck={false}
    />
  )
}
