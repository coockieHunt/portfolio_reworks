import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const isProd = mode === 'production';

    return {
        define: {
            '__APP_BUILD_TIME__': JSON.stringify(Date.now()),
        },
        server: {
            port: 3000,
            strictPort: true,
            proxy: {
                '/fallback/worker_cache.json': {
                    target: 'http://127.0.0.1:3002',
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/fallback', ''),
                },
                '/sitemap.xml': {
                    target: 'http://localhost:3001',
                    changeOrigin: true,
                    rewrite: () => '/api/sitemap.xml', 
                },
                '/robots.txt': {
                    target: 'http://localhost:3001',
                    changeOrigin: true,
                    rewrite: () => '/api/robots.txt',
                },
                '/ai.txt': {
                    target: 'http://localhost:3001',
                    changeOrigin: true,
                    rewrite: () => '/api/ai.txt',
                },
                '/manifest.json': {
                    target: 'http://localhost:3001',
                    changeOrigin: true,
                    rewrite: () => '/api/manifest.json',
                },
                
            },
        },
        plugins: [
            svgr(),
            react({
                babel: {
                    plugins: [
                        [
                            'babel-plugin-styled-components',
                            {
                                displayName: !isProd, 
                                fileName: !isProd,
                                ssr: false,
                                pure: true,
                                minify: true,
                                transpileTemplateLiterals: true
                            }
                        ]
                    ]
                }
            }),
            createHtmlPlugin({
                inject: {
                    data: {
                        siteUrl: env.VITE_SITE_URL || 'http://localhost:3000',
                    },
                },
                minify: isProd,
            }),
         
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            target: 'esnext',
            cssCodeSplit: true,
            sourcemap: false,
            outDir: 'build',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_debugger: isProd,
                    pure_funcs: ['console.info', 'console.debug', 'console.warn'],
                },
                format: {
                    comments: false, 
                },
            },
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: [
                            'react',
                            'react-dom',
                            'framer-motion',
                            'styled-components',
                            'scheduler' 
                        ],
                    },
                },
            },
        },
    };
});