import { useTheme } from '../theme/useTheme'

const TOP_ICONS: { icon: string; title: string }[] = [
  { icon: 'codicon-files',          title: 'Explorer' },
  { icon: 'codicon-search',         title: 'Search' },
  { icon: 'codicon-source-control', title: 'Source Control' },
  { icon: 'codicon-extensions',     title: 'Extensions' },
  { icon: 'codicon-run-all',        title: 'Run & Debug' },
]

const BOTTOM_ICONS: { icon: string; title: string }[] = [
  { icon: 'codicon-remote-explorer', title: 'Remote Explorer' },
  { icon: 'codicon-account',         title: 'Accounts' },
  { icon: 'codicon-settings-gear',   title: 'Manage' },
]

function ActivityIcon({ icon, title, active = false }: { icon: string; title: string; active?: boolean }) {
  const { theme } = useTheme()
  return (
    <div
      title={title}
      className="w-12 h-12 flex items-center justify-center cursor-pointer relative group"
      style={{
        color: active ? theme.ui.text : 'rgba(255,255,255,0.5)',
        borderLeft: active ? `2px solid ${theme.ui.text}` : '2px solid transparent',
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
    >
      <i className={`codicon ${icon}`} style={{ fontSize: 24 }} />
    </div>
  )
}

export default function ActivityBar() {
  const { theme } = useTheme()

  return (
    <div
      className="flex flex-col items-center shrink-0 justify-between"
      style={{ width: 48, background: theme.ui.activityBar }}
    >
      <div className="flex flex-col">
        {TOP_ICONS.map((item, i) => (
          <ActivityIcon key={i} icon={item.icon} title={item.title} active={i === 0} />
        ))}
      </div>
      <div className="flex flex-col pb-1">
        {BOTTOM_ICONS.map((item, i) => (
          <ActivityIcon key={i} icon={item.icon} title={item.title} />
        ))}
      </div>
    </div>
  )
}
