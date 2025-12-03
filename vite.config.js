import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import { createHtmlPlugin } from 'vite-plugin-html';

// Note la syntaxe : ({ mode }) => { ... }
export default defineConfig(({ mode }) => {
  // 1. On charge les variables d'environnement ICI
  const env = loadEnv(mode, process.cwd());

  return {
    // 2. On retourne la configuration
    plugins: [
      svgr(), 
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            // Ici 'env' est maintenant connu
            siteUrl: env.VITE_SITE_URL || 'http://localhost:3000',
          },
        },
      }),
    ],
    esbuild: {
      loader: 'jsx',
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      host: process.env.USE_NETWORK ? true : false,
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      target: 'esnext'
    }
  }
})