# ThemeLab — Content Plan

**Domain:** themelab.joehunter.dev  
**Author site:** joehunter.es  
**Goal:** SEO content launch — target devs searching for VS Code theme tools  
**Languages:** English + Spanish  
**Status:** 🟢 Created May 2026

---

## Target Keywords

### English
| Keyword | Intent | Difficulty |
|---|---|---|
| VS Code theme editor online | Tool | Medium |
| VS Code theme creator | Tool | Medium |
| how to create a VS Code theme | Informational | Low |
| customize VS Code colors online | Tool | Low |
| VS Code theme builder | Tool | Medium |
| best VS Code dark themes | Informational | High |

### Spanish
| Keyword | Intención | Dificultad |
|---|---|---|
| editor de temas VS Code online | Herramienta | Baja |
| crear tema VS Code | Informacional | Baja |
| personalizar VS Code colores | Herramienta | Baja |
| cómo hacer un tema para VS Code | Informacional | Baja |

---

## Pages / Articles

| File | Lang | Title | Primary Keyword | Status |
|---|---|---|---|---|
| `public/en/about.html` | EN | About ThemeLab | VS Code theme editor | ✅ |
| `public/en/vscode-theme-editor.html` | EN | The Best Online VS Code Theme Editor | VS Code theme editor online | ✅ |
| `public/en/how-to-create-vscode-themes.html` | EN | How to Create a VS Code Theme | how to create a VS Code theme | ✅ |
| `public/es/acerca-de.html` | ES | Acerca de ThemeLab | editor de temas VS Code | ✅ |
| `public/es/editor-temas-vscode.html` | ES | El Mejor Editor de Temas de VS Code Online | editor de temas VS Code online | ✅ |
| `public/es/como-crear-temas-vscode.html` | ES | Cómo Crear un Tema para VS Code | crear tema VS Code | ✅ |
| `public/en/best-vscode-dark-themes.html` | EN | Best Dark VS Code Themes 2026 | best VS Code dark themes | 🔜 |
| `public/en/customize-vscode-theme.html` | EN | How to Customise Your VS Code Theme | customize VS Code colors | 🔜 |
| `public/es/mejores-temas-oscuros-vscode.html` | ES | Los Mejores Temas Oscuros para VS Code 2026 | mejores temas VS Code oscuros | 🔜 |
| `public/es/personalizar-tema-vscode.html` | ES | Cómo Personalizar tu Tema de VS Code | personalizar VS Code colores | 🔜 |
| `public/sitemap.xml` | — | XML Sitemap | — | ✅ |

---

## OG / Meta Strategy

- `og:title` → tool-focused, includes "ThemeLab"
- `og:description` → 150-160 chars, action-oriented
- `og:image` → `/example.png` (live in public folder) ✅
- `twitter:image` → `/example.png` ✅
- `twitter:card` → `summary_large_image`
- `canonical` → each page self-references
- `hreflang` → EN ↔ ES on each page pair

---

## Internal Linking

- All articles link back to `https://themelab.joehunter.dev` (the app)
- All pages link to `/sitemap.xml`
- EN pages link to their ES equivalent and vice versa
- Logo on all pages links to `https://joehunter.es`

---

## Next Steps / TODO

- [x] `og:image` + `twitter:image` — `/example.png` wired to all pages
- [ ] Write 4 new articles (see table above 🔼)
- [ ] Add GA4 snippet to all static HTML pages + `index.html`
- [ ] Add Google Search Console & submit `/sitemap.xml`
- [ ] Add JSON-LD `SoftwareApplication` schema to `index.html`
- [ ] Add JSON-LD `Article` schema to each article page
- [ ] Spanish social copy for launch tweet

---

## Decisions

1. **og:image** — `/example.png` ✅
2. **Analytics** — GA4 (add snippet next)
3. **More articles** — yes: best themes listicle + customise guide, EN + ES
4. **Blog route** — static HTML for now (best for SEO without added complexity; can migrate to `/blog/` in React later with `react-helmet` + SSG)
5. **Spanish SEO** — Spanish language broadly (neutral es)