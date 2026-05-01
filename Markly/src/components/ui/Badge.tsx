import React from 'react'

type BadgeColor = 'amber' | 'sky' | 'red' | 'emerald'

interface BadgeProps {
  color: BadgeColor
  children: React.ReactNode
}

const colorClasses: Record<BadgeColor, string> = {
  amber:
    'bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20',
  sky: 'bg-sky-400/10 text-sky-400 ring-1 ring-sky-400/20',
  red: 'bg-red-400/10 text-red-400 ring-1 ring-red-400/20',
  emerald:
    'bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20',
}

export function Badge({ color, children }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </div>
  )
}
