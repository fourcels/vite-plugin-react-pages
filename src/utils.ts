import { globSync } from 'glob'
import { defaultConfig } from './config.js'


export function getPages() {
    const pages: string[] = []
    const baseDir = defaultConfig.dir
    const routes = getRoutes(baseDir)
    const layoutPath = globSync(`${baseDir}/_layout*`)
    if (layoutPath.length > 0) {
        pages.push(`{
            path: "/",
            lazy: () => import("/${layoutPath[0]}"),
            children: ${routes},
        }`)
    } else {
        pages.push(`{
            path: "/",
            children: ${routes},
        }`)
    }
    const noMatch = globSync(`${baseDir}/404*`)
    if (noMatch.length > 0) {
        pages.push(`{
            path: "*",
            lazy: () => import("/${noMatch[0]}"),
        }`)
    }
    return `[${pages.join(",")}]`
}
export function getRoutes(baseDir: string) {
    const pages: string[] = []
    const paths = globSync(`${baseDir}/[a-z[]*`, { withFileTypes: true })
    for (const path of paths) {
        pages.push(getRoute(path.relative(), path.isDirectory(), baseDir))
    }

    return `[${pages.join(',')}]`
}

export function getRoute(path: string, isDirectory: boolean, baseDir: string) {
    let pagePath = trimStart(path, baseDir + "/")
    pagePath = pagePath
        .replace(/\..*$/, "")
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1')
    if (isDirectory) {
        const layoutPath = globSync(`${path}/_layout*`)
        if (layoutPath.length > 0) {
            return `{
                path: "${pagePath}",
                lazy: () => import("/${layoutPath[0]}"),
                children: ${getRoutes(path)},
            }`
        } else {
            return `{
                path: "${pagePath}",
                children: ${getRoutes(path)},
            }`
        }
    } else if (/index$/.test(pagePath)) {
        return `{
            index: true,
            lazy: () => import("/${path}"),
        }`
    } else {
        return `{
            path: "${pagePath}",
            lazy: () => import("/${path}"),
        }`
    }
}


function trimStart(str: string, start: string) {
    if (start.length > 0 && str.startsWith(start)) {
        return str.substring(start.length)
    }
    return str
}