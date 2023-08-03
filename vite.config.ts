import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pages from './plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pages()],
})
