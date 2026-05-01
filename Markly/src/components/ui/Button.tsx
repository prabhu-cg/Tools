import React from 'react'

type ButtonVariant = 'default' | 'ghost'
type ButtonSize = 'sm' | 'md'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white',
  ghost:
    'bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
}

export function Button({
  variant = 'default',
  size = 'md',
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : ''

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
