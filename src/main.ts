import type { Plugin } from 'vite';
import { getPages } from './utils.js';

function pagesPlugin(): Plugin {

    const virtualModuleId = '~pages'
    const resolvedVirtualModuleId = '\0' + virtualModuleId

    return {
        name: 'vite-plugin-react-pages', // required, will show up in warnings and errors
        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        load(id) {
            if (id === resolvedVirtualModuleId) {
                const pages = getPages()
                return `export default ${pages}`
            }
        },
    }

}

export default pagesPlugin