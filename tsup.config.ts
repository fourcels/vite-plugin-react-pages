import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['plugin/index.ts'],
    format: 'esm',
    clean: true,
    dts: true,
})