import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import { createHtmlPlugin } from 'vite-plugin-html' 

export default defineConfig({
    plugins: [
      svgr(), 
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            siteUrl: env.VITE_OG_IMAGE_URL || 'http://localhost:3000',
          },
        },
      }),
    ],
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
})