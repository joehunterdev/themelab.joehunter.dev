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
        <span className="text-sm font-semibold text-white">ThemeLab</span>
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
    </div>
  )
}
