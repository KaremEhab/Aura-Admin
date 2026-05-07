import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Prevent Vite from obscuring Rust errors
    clearScreen: false,
    // Tauri expects a fixed port, fail if it's already in use
    server: {
      strictPort: true,
    },
    // Use env variables prefixed with TAURI_
    envPrefix: ['VITE_', 'TAURI_'],
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'env-css-breakpoints',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.css')) {
            return code
              .replace(/__BP_MOBILE__/g, env.VITE_BP_MOBILE || '768px')
              .replace(/__BP_IPAD__/g, env.VITE_BP_IPAD || '1024px')
              .replace(/__BP_LANDSCAPE__/g, env.VITE_BP_LANDSCAPE || '1440px')
              .replace(/__FONT_FAMILY__/g, env.VITE_FONT_FAMILY || "'Inter', sans-serif");
          }
        }
      }
    ],
    build: {
      // Tauri supports es2021
      target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
      // Don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // Produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  }
})

