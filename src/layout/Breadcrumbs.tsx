import { useTheme } from '../theme/useTheme'

export default function Breadcrumbs() {
  const { theme } = useTheme()

  const crumbs = ['themelab.joehunter.dev', 'src', 'theme', 'defaultTheme.ts']

  return (
    <div
      className="h-7 flex items-center px-3 gap-1 text-[11px] shrink-0 select-none"
      style={{
        background: theme.editor.bg,
        borderBottom: `1px solid ${theme.ui.border}20`,
        color: `${theme.ui.text}70`,
      }}
    >
      {crumbs.map((crumb, i) => (
        <span key={crumb} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">›</span>}
          <span
            className="hover:opacity-100 cursor-pointer transition-opacity"
            style={{ color: i === crumbs.length - 1 ? theme.ui.text : `${theme.ui.text}60` }}
          >
            {crumb}
          </span>
        </span>
      ))}
    </div>
  )
}
