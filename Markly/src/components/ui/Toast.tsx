import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

export function Toast({
  message,
  type = 'info',
  duration = 3000,
}: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  const bgColor =
    type === 'success'
      ? 'bg-emerald-900 text-emerald-200 ring-1 ring-emerald-700'
      : type === 'error'
        ? 'bg-red-900 text-red-200 ring-1 ring-red-700'
        : 'bg-zinc-800 text-zinc-200 ring-1 ring-zinc-700'

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium shadow-lg transition-all duration-300 ${bgColor} ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      {message}
    </div>
  )
}
