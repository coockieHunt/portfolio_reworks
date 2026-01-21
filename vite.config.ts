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
        server: {
            port: 3000,
            strictPort: true, 
        },
        plugins: [
            svgr(),
            TanStackRouterVite({
                target: 'react',
                autoCodeSplitting: true,
            }),
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
                    drop_console: isProd, 
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