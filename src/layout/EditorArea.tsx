import CodeMock from '../editor/CodeMock'
import Minimap from '../editor/Minimap'
import { useTheme } from '../theme/useTheme'

export default function EditorArea() {
  const { theme } = useTheme()

  return (
    <div
      className="flex-1 overflow-hidden flex"
      style={{ background: theme.editor.bg }}
    >
      <div className="flex-1 overflow-hidden">
        <CodeMock />
      </div>
      <Minimap />
    </div>
  )
}
