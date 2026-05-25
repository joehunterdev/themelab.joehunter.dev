import { useTheme } from '../theme/useTheme'

const tabs = [
  { name: 'app.tsx', active: true },
  { name: 'theme.ts', active: false },
]

export default function TabBar() {
  const { theme } = useTheme()

  return (
    <div
      className="h-9 flex items-end shrink-0 text-xs"
      style={{ background: theme.ui.panel }}
    >
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className="flex items-center gap-2 px-4 h-full cursor-pointer relative"
          style={{
            background: tab.active ? theme.ui.tabActive : 'transparent',
            color: tab.active ? theme.ui.text : `${theme.ui.text}66`,
            borderTop: tab.active ? `1px solid ${theme.ui.tabBorder}` : '1px solid transparent',
          }}
        >
          <span>⚛</span>
          <span>{tab.name}</span>
          <span className="opacity-40 text-[10px] ml-1">×</span>
        </div>
      ))}
    </div>
  )
}
