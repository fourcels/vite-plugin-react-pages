import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['plugin-react-pages/index.ts'],
    format: 'esm',
    clean: true,
    dts: true,
})