import { useTheme } from '../theme/useTheme'

export default function TitleBar() {
  const { theme } = useTheme()

  return (
    <div
      className="h-8 flex items-center px-3 shrink-0 select-none"
      style={{ background: '#1a1a1a', borderBottom: `1px solid ${theme.ui.border}` }}
    >
      {/* App icon + menu items */}
      <div className="flex items-center gap-1 text-[11px] opacity-70" style={{ color: theme.ui.text }}>
        <a href="https://joehunter.es/" target="_blank" rel="noopener noreferrer" title="Joe Hunter — Developer" className="mr-1">
          <div style={{ width: 22, height: 22, borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
            <img
              src="/logo_jh.png"
              alt="Joe Hunter"
              style={{ width: '170%', height: '170%', objectFit: 'cover', objectPosition: 'center', position: 'absolute', top: '-35%', left: '-35%' }}
            />
          </div>
        </a>
        {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map((item) => (
          <span key={item} className="px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer transition-colors">
            {item}
          </span>
        ))}
      </div>

      {/* Center title */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-[11px] opacity-50"
        style={{ color: theme.ui.text }}
      >
        themelab.joehunter.dev — ThemeLab
      </div>

      {/* Window controls */}
      <div className="ml-auto flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
      </div>
    </div>
  )
}
