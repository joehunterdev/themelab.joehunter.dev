import { HexColorPicker } from 'react-colorful'
import { useState } from 'react'

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function ColorControl({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      <div
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-500">{value}</span>
          <div
            className="w-5 h-5 rounded border border-white/10 shrink-0"
            style={{ background: value }}
          />
        </div>
      </div>

      {open && (
        <div className="space-y-2 pt-1">
          <HexColorPicker color={value} onChange={onChange} style={{ width: '100%' }} />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded bg-zinc-900 border border-zinc-700 px-2 py-1 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500"
          />
        </div>
      )}
    </div>
  )
}
