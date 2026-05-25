import { useTheme } from '../theme/useTheme'
import { useState, useRef, useEffect } from 'react'

type MenuItem =
  | { type: 'link';      label: string; href: string; shortcut?: string }
  | { type: 'separator' }
  | { type: 'submenu';   label: string; shortcut?: string; children: MenuItem[] }

const FILE_ITEMS: MenuItem[] = [
  { type: 'link',    label: 'Best Dark VS Code Themes 2026',       href: '/en/best-vscode-dark-themes.html',  shortcut: 'Ctrl+Alt+Del' },
  { type: 'link',    label: 'How to Customise Your VS Code Theme', href: '/en/customize-vscode-theme.html',   shortcut: 'Ctrl+Alt+Del' },
  { type: 'link',    label: 'How to Create a VS Code Theme',       href: '/en/how-to-create-vscode-themes.html', shortcut: 'Ctrl+Alt+Del' },
  { type: 'link',    label: 'Why ThemeLab',                        href: '/en/vscode-theme-editor.html',      shortcut: 'Ctrl+Alt+Del' },
  { type: 'link',    label: 'About',                               href: '/en/about.html',                    shortcut: 'Ctrl+Alt+Del' },
  { type: 'separator' },
  { type: 'link',    label: 'Mejores Temas Oscuros VS Code 2026',  href: '/es/mejores-temas-oscuros-vscode.html', shortcut: 'Ctrl+Alt+Del' },
  { type: 'link',    label: 'Personalizar Tema VS Code',           href: '/es/personalizar-tema-vscode.html', shortcut: 'Ctrl+Alt+Del' },
  { type: 'link',    label: 'Cómo Crear un Tema VS Code',          href: '/es/como-crear-temas-vscode.html',  shortcut: 'Ctrl+Alt+Del' },
  { type: 'link',    label: 'Por Qué ThemeLab',                    href: '/es/editor-temas-vscode.html',      shortcut: 'Ctrl+Alt+Del' },
  { type: 'link',    label: 'Acerca de',                           href: '/es/acerca-de.html',                shortcut: 'Ctrl+Alt+Del' },
  { type: 'separator' },
  {
    type: 'submenu',
    label: 'Joe Hunter',
    children: [
      { type: 'link', label: 'joehunter.dev', href: 'https://joehunter.dev',  shortcut: 'Ctrl+Alt+Del' },
      { type: 'link', label: 'joehunter.es',  href: 'https://joehunter.es',   shortcut: 'Ctrl+Alt+Del' },
    ],
  },
]

const STATIC_MENUS = ['Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']

function SubMenu({ items, onClose }: { items: MenuItem[]; onClose: () => void }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [subOpen, setSubOpen] = useState<number | null>(null)
  return (
    <div
      className="absolute left-full top-0 z-[60] min-w-[300px] py-[4px]"
      style={{
        background: '#252526',
        border: '1px solid #454545',
        color: '#cccccc',
        boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
      }}
    >
      {items.map((item, i) => {
        if (item.type === 'separator') return <div key={i} className="my-[4px]" style={{ borderTop: '1px solid #3c3c3c' }} />

        if (item.type === 'submenu') return (
          <div
            key={i}
            className="relative flex items-center justify-between text-[13px] leading-[22px] cursor-pointer"
            style={{
              color: (hovered === i || subOpen === i) ? '#ffffff' : '#cccccc',
              background: (hovered === i || subOpen === i) ? '#094771' : 'transparent',
              padding: '0 10px 0 22px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={() => { setHovered(i); setSubOpen(i) }}
            onMouseLeave={() => { setHovered(null); setSubOpen(null) }}
          >
            <span>{item.label}</span>
            <i className="codicon codicon-chevron-right" style={{ fontSize: 12, opacity: 0.7, marginLeft: 32 }} />
            {subOpen === i && <SubMenu items={item.children} onClose={onClose} />}
          </div>
        )

        if (item.type === 'link') return (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            onMouseEnter={() => { setHovered(i); setSubOpen(null) }}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-between text-[13px] leading-[22px] gap-8"
            style={{
              color: hovered === i ? '#ffffff' : '#cccccc',
              background: hovered === i ? '#094771' : 'transparent',
              textDecoration: 'none',
              padding: '0 22px 0 22px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{item.label}</span>
            {item.shortcut && <span style={{ opacity: 0.6, fontSize: 11, flexShrink: 0 }}>{item.shortcut}</span>}
          </a>
        )
        return null
      })}
    </div>
  )
}

function MenuItems({ items, onClose }: { items: MenuItem[]; onClose: () => void }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [subOpen, setSubOpen] = useState<number | null>(null)

  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'separator') return <div key={i} className="my-[4px]" style={{ borderTop: '1px solid #3c3c3c' }} />

        if (item.type === 'submenu') return (
          <div
            key={i}
            className="relative flex items-center justify-between text-[13px] leading-[22px] cursor-pointer"
            style={{
              color: (hovered === i || subOpen === i) ? '#ffffff' : '#cccccc',
              background: (hovered === i || subOpen === i) ? '#094771' : 'transparent',
              padding: '0 10px 0 22px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={() => { setHovered(i); setSubOpen(i) }}
            onMouseLeave={() => { setHovered(null); setSubOpen(null) }}
          >
            <span>{item.label}</span>
            <i className="codicon codicon-chevron-right ml-8" style={{ fontSize: 12, opacity: 0.8 }} />
            {subOpen === i && <SubMenu items={item.children} onClose={onClose} />}
          </div>
        )

        if (item.type === 'link') return (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            onMouseEnter={() => { setHovered(i); setSubOpen(null) }}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-between text-[13px] leading-[22px] gap-8"
            style={{
              color: hovered === i ? '#ffffff' : '#cccccc',
              background: hovered === i ? '#094771' : 'transparent',
              textDecoration: 'none',
              padding: '0 22px 0 22px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{item.label}</span>
            {item.shortcut && <span style={{ opacity: 0.6, fontSize: 11, flexShrink: 0 }}>{item.shortcut}</span>}
          </a>
        )
        return null
      })}
    </>
  )
}

function DropdownMenu({ label, items }: { label: string; items: MenuItem[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <span
        onClick={() => setOpen(o => !o)}
        className="px-[8px] py-[2px] cursor-pointer select-none"
        style={{
          background: open ? '#094771' : 'transparent',
          color: open ? '#ffffff' : 'inherit',
        }}
      >
        {label}
      </span>
      {open && (
        <div
          className="absolute top-full left-0 z-50 min-w-[300px] py-[4px]"
          style={{
            background: '#252526',
            border: '1px solid #454545',
            color: '#cccccc',
            boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          <MenuItems items={items} onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}

function StaticMenuItem({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      className="px-[8px] py-[2px] cursor-default select-none"
      style={{ background: hovered ? 'rgba(255,255,255,0.07)' : 'transparent', color: 'inherit' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  )
}

export default function TitleBar() {
  const { theme } = useTheme()

  return (
    <div
      className="h-8 flex items-center px-3 shrink-0 select-none"
      style={{ background: '#1a1a1a', borderBottom: `1px solid ${theme.ui.border}` }}
    >
      {/* App icon + menu items */}
      <div className="flex items-center text-[13px]" style={{ color: '#cccccc' }}>
        <a href="https://joehunter.es/" target="_blank" rel="noopener noreferrer" title="Joe Hunter — Developer" className="mr-2">
          <div style={{ width: 24, height: 24, borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
            <img
              src="/logo.png"
              alt="Joe Hunter"
              style={{ width: '130%', height: '130%', objectFit: 'cover', objectPosition: 'center', position: 'absolute', top: '-15%', left: '-15%' }}
            />
          </div>
        </a>
        <DropdownMenu label="File" items={FILE_ITEMS} />
        {STATIC_MENUS.map(m => <StaticMenuItem key={m} label={m} />)}
      </div>

      {/* Center title */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-[11px] opacity-50"
        style={{ color: theme.ui.text }}
      >
        themelab.joehunter.dev — ThemeLab
      </div>

      {/* Window controls */}
      <div className="ml-auto flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
      </div>
    </div>
  )
}
