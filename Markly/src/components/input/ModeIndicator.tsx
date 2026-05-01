import { useAppStore } from '../../store/appStore'
import { Badge } from '../ui/Badge'

export function ModeIndicator() {
  const mode = useAppStore((s) => s.mode)

  if (mode === 'idle') {
    return null
  }

  return (
    <Badge color={mode === 'convert' ? 'amber' : 'sky'}>
      {mode === 'convert'
        ? 'Convert Mode'
        : 'Format Mode'}
    </Badge>
  )
}
