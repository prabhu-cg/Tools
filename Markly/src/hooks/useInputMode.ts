import { useEffect } from 'react'
import { useAppStore } from '../store/appStore'

export function useInputMode() {
  const { rawInput, setMode } = useAppStore()

  useEffect(() => {
    if (!rawInput) {
      setMode('idle')
    } else if (rawInput.type === 'md') {
      setMode('format')
    } else {
      setMode('convert')
    }
  }, [rawInput, setMode])
}
