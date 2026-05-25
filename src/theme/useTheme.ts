import { create } from 'zustand'
import type { Theme } from './theme.types'
import { defaultTheme } from './defaultTheme'

type ThemeState = {
  theme: Theme
  activePreset: string
  setTheme: (t: Theme) => void
  setActivePreset: (name: string) => void
  setColor: (path: string[], value: string) => void
}

export const useTheme = create<ThemeState>((set) => ({
  theme: defaultTheme,
  activePreset: 'Dark+ (Default)',

  setTheme: (theme) => set({ theme }),

  setActivePreset: (name) => set({ activePreset: name }),

  setColor: (path, value) =>
    set((state) => {
      const newTheme = structuredClone(state.theme)
      let obj: any = newTheme
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]]
      }
      obj[path[path.length - 1]] = value
      return { theme: newTheme, activePreset: 'Custom' }
    }),
}))
