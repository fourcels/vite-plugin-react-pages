import type { Plugin } from 'vite';
import { Route } from './route.js';

function pagesPlugin(baseDir: string = "src/pages"): Plugin {

    const virtualModuleId = '~pages'
    const resolvedVirtualModuleId = '\0' + virtualModuleId
    baseDir = baseDir.replace(/^\/+|\/+$/g, "")
    return {
        name: 'vite-plugin-react-pages', // required, will show up in warnings and errors
        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        load(id) {
            if (id === resolvedVirtualModuleId) {
                const route = new Route(baseDir)
                return `export default [${route}]`
            }
        },
    }

}

export default pagesPlugin