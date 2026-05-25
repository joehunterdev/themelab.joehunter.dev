import { useTheme } from '../theme/useTheme'

export default function StatusBar() {
  const { theme } = useTheme()

  return (
    <div
      className="h-6 text-[11px] flex items-center px-3 justify-between shrink-0 select-none"
      style={{ background: theme.ui.statusBar, color: '#ffffff' }}
    >
      <div className="flex items-center gap-3">
        <span>⎇ main</span>
        <span>ThemeLab</span>
      </div>
      <div className="flex items-center gap-3 opacity-90">
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>LF</span>
      </div>
    </div>
  )
}
