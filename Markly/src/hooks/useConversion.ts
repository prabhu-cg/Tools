import { useCallback } from 'react'
import { useAppStore } from '../store/appStore'
import { runPipeline } from '../lib/pipeline'

export function useConversion() {
  const { rawInput, setOutput, setStatus, setError } = useAppStore()

  const run = useCallback(async () => {
    if (!rawInput) {
      setError('No input provided')
      return
    }

    try {
      setStatus('processing')
      setError(null)

      const markdown = await runPipeline(rawInput)
      setOutput(markdown)
      setStatus('done')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Conversion failed'
      setError(message)
      setStatus('error')
    }
  }, [rawInput, setOutput, setStatus, setError])

  return { run, isProcessing: useAppStore((s) => s.status) === 'processing' }
}
