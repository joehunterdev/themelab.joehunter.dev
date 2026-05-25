import { useTheme } from '../theme/useTheme'

export default function ActivityBar() {
  const { theme } = useTheme()

  const icons = ['⬜', '🔍', '⚙', '🧩', '🐞']

  return (
    <div
      className="w-12 flex flex-col items-center py-3 gap-5 shrink-0"
      style={{ background: theme.ui.activityBar }}
    >
      {icons.map((icon, i) => (
        <div
          key={i}
          className="w-7 h-7 flex items-center justify-center rounded opacity-60 hover:opacity-100 cursor-pointer text-base transition-opacity"
          style={{ color: theme.ui.text }}
        >
          {icon}
        </div>
      ))}
    </div>
  )
}
