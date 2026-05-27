import ColorControl from '../ui/ColorControl'
import { useTheme } from '../theme/useTheme'
import { presets } from '../theme/defaultTheme'
import { exportVSCodeTheme } from '../theme/exportTheme'

export default function ThemePanel() {
  const { theme, setColor, setTheme, activePreset, setActivePreset } = useTheme()

  function handleExport() {
    const data = exportVSCodeTheme(theme)
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'themelab-theme.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-72 shrink-0 flex flex-col overflow-hidden border-l border-black/40 bg-zinc-950">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
              src="/logo.png"
              alt="ThemeLab"
              style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover', objectPosition: 'center', flexShrink: 0, display: 'block' }}
            />
          <span className="text-sm font-semibold text-white">ThemeLab</span>
        </div>
        <button
          onClick={handleExport}
          className="text-[11px] px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors"
        >
          Export
        </button>
      </div>

      {/* Presets */}
      <div className="px-4 py-3 border-b border-zinc-800">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Preset</div>
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(presets).map((name) => (
            <button
              key={name}
              onClick={() => { setTheme(presets[name]); setActivePreset(name) }}
              className="text-[11px] px-2 py-0.5 rounded border transition-colors"
              style={
                activePreset === name
                  ? { borderColor: '#3b82f6', background: '#1d4ed8', color: '#fff' }
                  : { borderColor: '#3f3f46', background: 'transparent', color: '#a1a1aa' }
              }
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <section className="space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 pb-1 border-b border-zinc-800">Editor</div>
          <ColorControl label="Background" value={theme.editor.bg} onChange={(v) => setColor(['editor', 'bg'], v)} />
          <ColorControl label="Foreground" value={theme.editor.text} onChange={(v) => setColor(['editor', 'text'], v)} />
          <ColorControl label="Line Highlight" value={theme.editor.lineHighlight} onChange={(v) => setColor(['editor', 'lineHighlight'], v)} />
        </section>

        <section className="space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 pb-1 border-b border-zinc-800">Syntax</div>
          <ColorControl label="Keyword" value={theme.editor.keyword} onChange={(v) => setColor(['editor', 'keyword'], v)} />
          <ColorControl label="String" value={theme.editor.string} onChange={(v) => setColor(['editor', 'string'], v)} />
          <ColorControl label="Function" value={theme.editor.function} onChange={(v) => setColor(['editor', 'function'], v)} />
          <ColorControl label="Variable" value={theme.editor.variable} onChange={(v) => setColor(['editor', 'variable'], v)} />
          <ColorControl label="Comment" value={theme.editor.comment} onChange={(v) => setColor(['editor', 'comment'], v)} />
          <ColorControl label="Type" value={theme.editor.type} onChange={(v) => setColor(['editor', 'type'], v)} />
          <ColorControl label="Number" value={theme.editor.number} onChange={(v) => setColor(['editor', 'number'], v)} />
        </section>

        <section className="space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 pb-1 border-b border-zinc-800">UI</div>
          <ColorControl label="App BG" value={theme.ui.bg} onChange={(v) => setColor(['ui', 'bg'], v)} />
          <ColorControl label="Sidebar" value={theme.ui.sidebar} onChange={(v) => setColor(['ui', 'sidebar'], v)} />
          <ColorControl label="Activity Bar" value={theme.ui.activityBar} onChange={(v) => setColor(['ui', 'activityBar'], v)} />
          <ColorControl label="Status Bar" value={theme.ui.statusBar} onChange={(v) => setColor(['ui', 'statusBar'], v)} />
          <ColorControl label="Tab Bar" value={theme.ui.panel} onChange={(v) => setColor(['ui', 'panel'], v)} />
          <ColorControl label="Tab Indicator" value={theme.ui.tabBorder} onChange={(v) => setColor(['ui', 'tabBorder'], v)} />
        </section>
      </div>

      {/* Footer — author */}
      <div className="px-4 py-3 border-t border-zinc-800 flex items-center justify-between">
        <a
          href="https://joehunter.es/"
          target="_blank"
          rel="noopener noreferrer"
          title="Joe Hunter — Developer"
          className="flex items-center gap-2 group"
        >
          <img
              src="/logo_jh.png"
              alt="Joe Hunter"
              style={{ width: 24, height: 24, borderRadius: 4, objectFit: 'cover', objectPosition: 'center', flexShrink: 0, display: 'block' }}
            />
          <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 transition-colors leading-tight">
            by Joe Hunter
          </span>
        </a>
        <a
          href="https://github.com/joehunterdev/themelab.joehunter.dev"
          target="_blank"
          rel="noopener noreferrer"
          title="View on GitHub"
          className="text-zinc-600 hover:text-zinc-300 transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
