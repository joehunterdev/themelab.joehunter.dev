import { useTheme } from '../theme/useTheme'

export default function Minimap() {
  const { theme } = useTheme()

  // Generate fake minimap lines
  const lines = Array.from({ length: 60 }, (_) => ({
    width: Math.random() * 60 + 20,
    opacity: Math.random() * 0.5 + 0.1,
    color: [theme.editor.keyword, theme.editor.string, theme.editor.function, theme.editor.comment, theme.editor.text][
      Math.floor(Math.random() * 5)
    ],
  }))

  return (
    <div
      className="w-20 shrink-0 overflow-hidden py-2 px-2 relative"
      style={{ background: theme.editor.bg, borderLeft: `1px solid ${theme.ui.border}30` }}
    >
      {/* Viewport indicator */}
      <div
        className="absolute left-0 right-0 top-2"
        style={{ height: '80px', background: `${theme.ui.text}08`, borderTop: `1px solid ${theme.ui.text}15`, borderBottom: `1px solid ${theme.ui.text}15` }}
      />

      {lines.map((line, i) => (
        <div key={i} className="flex items-center mb-[1.5px]">
          <div
            style={{
              height: '1.5px',
              width: `${line.width}%`,
              background: line.color,
              opacity: line.opacity,
              borderRadius: '1px',
            }}
          />
        </div>
      ))}
    </div>
  )
}
