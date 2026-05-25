import { useTheme } from '../theme/useTheme'

type Entry = { name: string; type: 'folder' | 'file'; ext?: string; indent: number; open?: boolean; active?: boolean }

const tree: Entry[] = [
  { name: 'src', type: 'folder', indent: 0, open: true },
  { name: 'editor', type: 'folder', indent: 1, open: false },
  { name: 'layout', type: 'folder', indent: 1, open: false },
  { name: 'theme', type: 'folder', indent: 1, open: true },
  { name: 'defaultTheme.ts', type: 'file', ext: 'ts', indent: 2, active: true },
  { name: 'exportTheme.ts', type: 'file', ext: 'ts', indent: 2 },
  { name: 'theme.types.ts', type: 'file', ext: 'ts', indent: 2 },
  { name: 'useTheme.ts', type: 'file', ext: 'ts', indent: 2 },
  { name: 'ui', type: 'folder', indent: 1, open: false },
  { name: 'App.tsx', type: 'file', ext: 'tsx', indent: 1 },
  { name: 'index.css', type: 'file', ext: 'css', indent: 1 },
  { name: 'main.tsx', type: 'file', ext: 'tsx', indent: 1 },
]

const extColor: Record<string, string> = {
  ts: '#3178c6',
  tsx: '#61dafb',
  css: '#a78bfa',
  json: '#fbbf24',
  md: '#94a3b8',
}

export default function SideBar() {
  const { theme } = useTheme()

  return (
    <div
      className="w-56 shrink-0 text-xs overflow-y-auto overflow-x-hidden flex flex-col"
      style={{ background: theme.ui.sidebar, color: theme.ui.text }}
    >
      <div className="px-4 py-2 text-[10px] font-semibold tracking-widest uppercase opacity-50 shrink-0">
        Explorer
      </div>

      <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide opacity-60 shrink-0">
        THEMELAB
      </div>

      <div className="flex-1">
        {tree.map((entry, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 py-[2px] pr-2 cursor-pointer hover:bg-white/10 transition-colors rounded mx-1"
            style={{
              paddingLeft: `${entry.indent * 12 + 6}px`,
              background: entry.active ? 'rgba(255,255,255,0.1)' : undefined,
            }}
          >
            {entry.type === 'folder' ? (
              <span className="text-[10px] opacity-70">{entry.open ? '▾' : '▸'}</span>
            ) : (
              <span className="w-[10px]" />
            )}

            {entry.type === 'folder' ? (
              <span className="text-yellow-400/80 text-[11px]">{entry.open ? '📂' : '📁'}</span>
            ) : (
              <span
                className="text-[9px] font-bold px-0.5 rounded"
                style={{ color: extColor[entry.ext ?? ''] ?? theme.ui.text }}
              >
                {entry.ext?.toUpperCase()}
              </span>
            )}

            <span
              className="truncate text-[11px]"
              style={{ color: entry.active ? theme.ui.text : `${theme.ui.text}cc` }}
            >
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
