/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']]
            }
        }),
        tsconfigPaths()
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.js'
    }
});
