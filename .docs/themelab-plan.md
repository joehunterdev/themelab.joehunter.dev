# Themeforge — VS Code Theme Customizer

## Overview

This is a production-oriented starter architecture for a VS Code Theme Customizer built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Shiki (syntax highlighting)

The goal is to:
- simulate the VS Code interface
- customize themes visually
- update the preview in real time
- export valid VS Code themes

---

# Stack

## Core

```bash
npm create vite@latest themeforge -- --template react-ts
```

## Install

```bash
npm install zustand shiki react-colorful lucide-react clsx
```

## Tailwind

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

# Folder Structure

```txt
src/
  components/
    layout/
    editor/
    controls/
    panels/

  store/
    themeStore.ts

  theme/
    presets.ts
    shikiTheme.ts
    exportTheme.ts

  styles/
    globals.css

  data/
    sampleCode.ts

  App.tsx
  main.tsx
```

---

# Theme Store

## store/themeStore.ts

```ts
import { create } from 'zustand'

export type ThemeState = {
  ui: {
    appBg: string
    sidebarBg: string
    activityBarBg: string
    tabActive: string
    tabInactive: string
    statusBar: string
  }

  editor: {
    background: string
    foreground: string
    selection: string
    lineHighlight: string
    cursor: string
  }

  syntax: {
    keyword: string
    string: string
    function: string
    variable: string
    comment: string
    type: string
    number: string
  }

  setColor: (
    category: string,
    key: string,
    value: string
  ) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  ui: {
    appBg: '#1e1e1e',
    sidebarBg: '#252526',
    activityBarBg: '#333333',
    tabActive: '#1e1e1e',
    tabInactive: '#2d2d2d',
    statusBar: '#007acc',
  },

  editor: {
    background: '#1e1e1e',
    foreground: '#d4d4d4',
    selection: '#264f78',
    lineHighlight: '#2a2d2e',
    cursor: '#ffffff',
  },

  syntax: {
    keyword: '#c586c0',
    string: '#ce9178',
    function: '#dcdcaa',
    variable: '#9cdcfe',
    comment: '#6a9955',
    type: '#4ec9b0',
    number: '#b5cea8',
  },

  setColor: (category, key, value) =>
    set((state: any) => ({
      [category]: {
        ...state[category],
        [key]: value,
      },
    })),
}))
```

---

# Shiki Theme Mapping

## theme/shikiTheme.ts

Builds a custom Shiki-compatible theme object from the store state.
Shiki uses the same TextMate grammar as VS Code, so output is visually identical.

```ts
import type { ThemeRegistrationRaw } from 'shiki'

export function buildShikiTheme(theme: any): ThemeRegistrationRaw {
  return {
    name: 'themelab',
    type: 'dark',

    colors: {
      'editor.background': theme.editor.background,
      'editor.foreground': theme.editor.foreground,
      'editor.selectionBackground': theme.editor.selection,
      'editor.lineHighlightBackground': theme.editor.lineHighlight,
    },

    tokenColors: [
      {
        scope: ['keyword', 'storage.type', 'storage.modifier'],
        settings: { foreground: theme.syntax.keyword },
      },
      {
        scope: ['string', 'string.quoted'],
        settings: { foreground: theme.syntax.string },
      },
      {
        scope: ['comment', 'punctuation.definition.comment'],
        settings: { foreground: theme.syntax.comment },
      },
      {
        scope: ['entity.name.function', 'support.function'],
        settings: { foreground: theme.syntax.function },
      },
      {
        scope: ['constant.numeric'],
        settings: { foreground: theme.syntax.number },
      },
      {
        scope: ['entity.name.type', 'support.type'],
        settings: { foreground: theme.syntax.type },
      },
      {
        scope: ['variable', 'variable.other'],
        settings: { foreground: theme.syntax.variable },
      },
    ],
  }
}
```

---

# Code Preview Component

## components/editor/CodePreview.tsx

Read-only syntax-highlighted preview using Shiki. Re-highlights whenever the theme
store changes. No workers, no heavy bundle — fast and VS Code-accurate.

```tsx
import { useEffect, useState } from 'react'
import { createHighlighter } from 'shiki'

import { useThemeStore } from '../../store/themeStore'
import { buildShikiTheme } from '../../theme/shikiTheme'
import { sampleCode } from '../../data/sampleCode'

export default function CodePreview() {
  const theme = useThemeStore()
  const [html, setHtml] = useState('')

  useEffect(() => {
    let cancelled = false

    async function highlight() {
      const highlighter = await createHighlighter({
        themes: [],
        langs: ['typescript'],
      })

      const customTheme = buildShikiTheme(theme)
      await highlighter.loadTheme(customTheme)

      const result = highlighter.codeToHtml(sampleCode, {
        lang: 'typescript',
        theme: 'themelab',
      })

      if (!cancelled) setHtml(result)
    }

    highlight()
    return () => { cancelled = true }
  }, [theme])

  return (
    <div
      className="h-full overflow-auto p-4 font-mono text-sm"
      style={{ background: theme.editor.background }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

---

# Color Picker Component

## components/controls/ColorControl.tsx

```tsx
import { HexColorPicker } from 'react-colorful'

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function ColorControl({
  label,
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-3 border-b border-zinc-800 pb-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-300">
          {label}
        </span>

        <div
          className="h-5 w-5 rounded border border-white/10"
          style={{ background: value }}
        />
      </div>

      <HexColorPicker color={value} onChange={onChange} />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded bg-zinc-900 px-3 py-2 text-sm"
      />
    </div>
  )
}
```

---

# Theme Panel

## components/panels/ThemePanel.tsx

```tsx
import ColorControl from '../controls/ColorControl'
import { useThemeStore } from '../../store/themeStore'

export default function ThemePanel() {
  const theme = useThemeStore()

  return (
    <div className="w-[340px] overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-5 space-y-8">
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Editor
        </h2>

        <div className="space-y-6">
          <ColorControl
            label="Background"
            value={theme.editor.background}
            onChange={(v) =>
              theme.setColor('editor', 'background', v)
            }
          />

          <ColorControl
            label="Foreground"
            value={theme.editor.foreground}
            onChange={(v) =>
              theme.setColor('editor', 'foreground', v)
            }
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Syntax
        </h2>

        <div className="space-y-6">
          <ColorControl
            label="Keyword"
            value={theme.syntax.keyword}
            onChange={(v) =>
              theme.setColor('syntax', 'keyword', v)
            }
          />

          <ColorControl
            label="String"
            value={theme.syntax.string}
            onChange={(v) =>
              theme.setColor('syntax', 'string', v)
            }
          />
        </div>
      </div>
    </div>
  )
}
```

---

# VS Code Shell Layout

## App.tsx

```tsx
import CodePreview from './components/editor/CodePreview'
import ThemePanel from './components/panels/ThemePanel'
import { useThemeStore } from './store/themeStore'

export default function App() {
  const theme = useThemeStore()

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: theme.ui.appBg }}
    >
      <div
        className="w-14"
        style={{
          background: theme.ui.activityBarBg,
        }}
      />

      <div
        className="w-64 border-r border-black/30"
        style={{
          background: theme.ui.sidebarBg,
        }}
      />

      <div className="flex flex-1 flex-col">
        <div
          className="h-10 border-b border-black/30"
          style={{
            background: theme.ui.tabInactive,
          }}
        />

        <div className="flex-1">
          <CodePreview />
        </div>

        <div
          className="h-8"
          style={{
            background: theme.ui.statusBar,
          }}
        />
      </div>

      <ThemePanel />
    </div>
  )
}
```

---

# Export VS Code Theme

## theme/exportTheme.ts

```ts
export function exportVSCodeTheme(theme: any) {
  return {
    name: 'Themeforge Custom',
    type: 'dark',

    colors: {
      'editor.background': theme.editor.background,
      'editor.foreground': theme.editor.foreground,
      'sideBar.background': theme.ui.sidebarBg,
      'activityBar.background': theme.ui.activityBarBg,
      'statusBar.background': theme.ui.statusBar,
    },

    tokenColors: [
      {
        scope: ['keyword'],
        settings: {
          foreground: theme.syntax.keyword,
        },
      },
      {
        scope: ['string'],
        settings: {
          foreground: theme.syntax.string,
        },
      },
    ],
  }
}
```

---

# Sample Code

## data/sampleCode.ts

```ts
export const sampleCode = `
import express from 'express'

const app = express()

type User = {
  id: number
  name: string
}

function greet(user: User) {
  return `Hello ${user.name}`
}

app.get('/', async (_, res) => {
  const user = {
    id: 1,
    name: 'Alex'
  }

  res.json({
    message: greet(user)
  })
})

app.listen(3000)
`
```

---

# Presets

## theme/presets.ts

```ts
export const presets = {
  dracula: {
    editor: {
      background: '#282a36',
      foreground: '#f8f8f2',
      selection: '#44475a',
      lineHighlight: '#44475a',
      cursor: '#f8f8f2',
    },

    syntax: {
      keyword: '#ff79c6',
      string: '#f1fa8c',
      function: '#50fa7b',
      variable: '#8be9fd',
      comment: '#6272a4',
      type: '#8be9fd',
      number: '#bd93f9',
    },
  },
}
```

---

# Suggested Improvements

## Next Features

### Theme Presets
- preset gallery
- thumbnails
- instant apply

### Import Existing Themes
- upload JSON
- parse token colors
- hydrate store

### Better VS Code Mock
- file tree
- tabs
- terminal panel
- breadcrumbs
- command palette

### Persistence
- localStorage
- cloud save
- sharable URLs

### AI Features
- generate themes from prompts
- palette extraction
- accessibility scoring

---

# Recommended Design Direction

The app should feel:
- like Figma
- premium
- minimal
- responsive
- smooth

Avoid:
- cluttered settings panels
- exposing 500 tokens
- trying to fully clone VS Code

The illusion of VS Code matters more than feature completeness.

---

# MVP Goal

A user should be able to:

1. Open the app
2. Change colors
3. See instant updates
4. Export a valid VS Code theme

If those four things feel polished, the product works.

