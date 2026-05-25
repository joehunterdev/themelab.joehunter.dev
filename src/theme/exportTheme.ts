import type { Theme } from './theme.types'

export function exportVSCodeTheme(theme: Theme) {
  return {
    name: 'ThemeLab Custom',
    type: 'dark',
    colors: {
      'editor.background': theme.editor.bg,
      'editor.foreground': theme.editor.text,
      'editor.lineHighlightBackground': theme.editor.lineHighlight,
      'sideBar.background': theme.ui.sidebar,
      'sideBar.foreground': theme.ui.text,
      'activityBar.background': theme.ui.activityBar,
      'activityBar.foreground': theme.ui.text,
      'statusBar.background': theme.ui.statusBar,
      'statusBar.foreground': '#ffffff',
      'tab.activeBackground': theme.ui.tabActive,
      'tab.inactiveBackground': theme.ui.panel,
      'tab.activeBorderTop': theme.ui.tabBorder,
      'editorGroupHeader.tabsBackground': theme.ui.panel,
    },
    tokenColors: [
      { scope: ['keyword', 'storage.type', 'storage.modifier'], settings: { foreground: theme.editor.keyword } },
      { scope: ['string', 'string.quoted'], settings: { foreground: theme.editor.string } },
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: theme.editor.comment } },
      { scope: ['entity.name.function', 'support.function'], settings: { foreground: theme.editor.function } },
      { scope: ['variable', 'variable.other'], settings: { foreground: theme.editor.variable } },
      { scope: ['constant.numeric'], settings: { foreground: theme.editor.number } },
      { scope: ['entity.name.type', 'support.type'], settings: { foreground: theme.editor.type } },
    ],
  }
}
