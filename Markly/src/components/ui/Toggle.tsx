interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: ToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={`relative w-10 h-6 rounded-full transition-colors ${
          checked ? 'bg-sky-600' : 'bg-zinc-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </button>
      {label && (
        <span className="text-xs font-medium text-zinc-300">
          {label}
        </span>
      )}
    </div>
  )
}
