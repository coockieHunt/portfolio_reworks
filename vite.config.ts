import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            svgr(),
            tanstackRouter({
                target: 'react',
                autoCodeSplitting: true,
            }),
            // AJOUT: Configuration Babel pour Styled-Components
            react({
                babel: {
                    plugins: [
                        [
                            'babel-plugin-styled-components',
                            {
                                displayName: true,
                                fileName: true,
                                ssr: false,
                                pure: true
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
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            port: 3000,
            open: true,
            host: !!process.env.USE_NETWORK,
            // CORRECTION: watch doit être ICI, dans server
            watch: {
                usePolling: true,
            },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: [
                            'react',
                            'react-dom',
                            'framer-motion',
                            'styled-components',
                        ],
                    },
                },
            },
            outDir: 'build',
            sourcemap: false,
            target: 'esnext',
        },
    };
});