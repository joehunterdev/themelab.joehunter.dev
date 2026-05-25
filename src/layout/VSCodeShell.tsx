import { useTheme } from '../theme/useTheme'
import TitleBar from './TitleBar'
import ActivityBar from './ActivityBar'
import SideBar from './SideBar'
import EditorArea from './EditorArea'
import StatusBar from './StatusBar'
import TabBar from './TabBar'
import Breadcrumbs from './Breadcrumbs'
import ThemePanel from './ThemePanel'

export default function VSCodeShell() {
  const { theme } = useTheme()

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{ background: theme.ui.bg, color: theme.ui.text }}
    >
      <TitleBar />

      <div className="flex flex-1 overflow-hidden">
        <ActivityBar />
        <SideBar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <TabBar />
          <Breadcrumbs />
          <EditorArea />
        </div>

        <ThemePanel />
      </div>

      <StatusBar />
    </div>
  )
}
