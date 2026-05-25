import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { version } from './package.json'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-inject-version',
      transformIndexHtml(html) {
        return html.replace(/__APP_VERSION__/g, version)
      },
    },
  ],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    reportCompressedSize: false,
  },
  server: {
    host: 'themelab.joehunter.localhost',
    port: 80,
  },
})
