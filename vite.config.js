import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ghPages } from 'vite-plugin-gh-pages'

export default defineConfig({
  plugins: [react(), ghPages()],
  base: '/Basic-Authentication/',
  resolve: {
    alias: {
      '@emotion/styled': '@emotion/styled/base',
    },
  },
})
