import { globSync } from 'glob'
import { defaultConfig } from './config.js'


type Route = {
    path: string;
    index: boolean;
    componentPath?: string;
    children?: Route[];
}

export function getPages() {
    const route = getRoute(defaultConfig.dir, true, defaultConfig.dir)
    return `[${route}]`
}
export function getRoutes(baseDir: string) {
    const pages: string[] = []
    const paths = globSync(`${baseDir}/[a-zA-Z0-9[]*`, { withFileTypes: true })
    for (const path of paths) {
        pages.push(getRoute(path.relative(), path.isDirectory(), baseDir))
    }

    return `[${pages.join(',')}]`
}

export function getRoute(filePath: string, isDirectory: boolean, baseDir: string) {
    let path = trimStart(filePath, baseDir)
    path = trimStart(path, "/")
    path = path
        .replace(/\..*$/, "")
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1')
    if (isDirectory) {
        const layoutPath = globSync(`${filePath}/_layout*`)
        if (layoutPath.length > 0) {
            return `{
                path: "${path}",
                lazy: () => import("/${layoutPath[0]}"),
                children: ${getRoutes(filePath)},
            }`
        } else {
            return `{
                path: "${path}",
                children: ${getRoutes(filePath)},
            }`
        }
    } else if (isIndex(path)) {
        return `{
            index: true,
            lazy: () => import("/${filePath}"),
        }`
    } else if (is404(path)) {
        return `{
            path: "*",
            lazy: () => import("/${filePath}"),
        }`
    } else {
        return `{
            path: "${path}",
            lazy: () => import("/${filePath}"),
        }`
    }
}

function is404(path: string) {
    return /404$/.test(path)
}

function isIndex(path: string) {
    return /index$/.test(path)
}


function trimStart(str: string, start: string) {
    if (start.length > 0 && str.startsWith(start)) {
        return str.substring(start.length)
    }
    return str
}