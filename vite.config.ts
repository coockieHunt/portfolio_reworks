import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path' 

//plugins
import { createHtmlPlugin } from 'vite-plugin-html';
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      svgr(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            siteUrl: env.VITE_SITE_URL || 'http://localhost:3000',
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      open: true,
      host: !!process.env.USE_NETWORK, 
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // manual chunking for better caching
            vendor: ['react', 'react-dom', 'framer-motion', 'styled-components'],
          },
        },
      },
      outDir: 'build',
      sourcemap: false,
      target: 'esnext'
    }
  };
});