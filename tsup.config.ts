import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['vite-plugin-react-pages/index.ts'],
    format: 'esm',
    clean: true,
    dts: true,
})