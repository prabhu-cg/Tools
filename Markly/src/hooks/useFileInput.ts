import { useCallback, useState } from 'react'
import type { RawInput } from '../types'
import { useAppStore } from '../store/appStore'
import { readAsArrayBuffer, readAsText } from '../lib/utils/fileReader'
import { detectInputType } from '../lib/pipeline/detectType'

export function useFileInput() {
  const { setRawInput, setError } = useAppStore()
  const [isDragging, setIsDragging] = useState(false)

  const processFile = useCallback(
    async (file: File) => {
      try {
        if (file.size > 52_428_800) {
          // 50MB
          setError('File too large (max 50MB)')
          return
        }

        const type = detectInputType(file)

        if (type === 'unknown') {
          setError('Unsupported file type')
          return
        }

        const input: RawInput = {
          type,
          filename: file.name,
          file,
        }

        // Read file content based on type
        if (type === 'docx') {
          input.arrayBuffer = await readAsArrayBuffer(file)
        } else {
          input.text = await readAsText(file)
        }

        setError(null)
        setRawInput(input)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to read file'
        setError(message)
      }
    },
    [setRawInput, setError]
  )

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        processFile(files[0])
      }
    },
    [processFile]
  )

  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    },
    []
  )

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files
      if (files && files.length > 0) {
        processFile(files[0])
      }
    },
    [processFile]
  )

  return {
    onDrop,
    onDragOver,
    onDragLeave,
    onFileSelect,
    isDragging,
  }
}
