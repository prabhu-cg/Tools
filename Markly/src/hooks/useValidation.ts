import { useEffect, useRef } from 'react'
import { useAppStore } from '../store/appStore'
import { detectIssues } from '../lib/validation'

export function useValidation() {
  const output = useAppStore((s) => s.output)
  const setIssues = useAppStore((s) => s.setIssues)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      const issues = detectIssues(output)
      setIssues(issues)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [output, setIssues])
}
