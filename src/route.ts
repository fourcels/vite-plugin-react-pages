import fs from 'node:fs';
import path from 'node:path/posix';


export class Route {
    path: string;
    page?: string;
    layout?: string;
    notFound?: string;
    children: Route[] = [];

    get isSplat(): boolean {
        return this.path === '*'
    }
    get isPathless(): boolean {
        return /^\(.+\)$/.test(this.path)
    }

    constructor(baseDir: string, pathName: string = '/') {
        this.path = pathName
        const dirents = fs.readdirSync(baseDir, {
            withFileTypes: true
        })
        for (const dirent of dirents) {
            const filePath = path.join(baseDir, dirent.name)
            if (dirent.isDirectory() && !dirent.name.startsWith("_")) {
                const pathName = dirent.name.trim().toLowerCase()
                    .replace(/^\[(\.{3}.+)\]$/, '*')
                    .replace(/^\[\[(.+)\]\]$/, ':$1?')
                    .replace(/^\[(.+)\]$/, ':$1')
                    .replace(/^\{(.+)\}$/, '$1?')

                this.children.push(new Route(filePath, pathName))
            } else if (/^layout\./i.test(dirent.name)) {
                this.layout = '/' + filePath
            } else if (/^page\./i.test(dirent.name)) {
                this.page = '/' + filePath
            } else if (/^404\./i.test(dirent.name)) {
                this.notFound = '/' + filePath
            }
        }
    }

    toString(): string {
        if (this.isSplat) {
            if (this.page) {
                return `{
                    path: "${this.path}",
                    lazy: () => import("${this.page}")
                }`
            } else {
                return `{
                    path: "${this.path}",
                }`
            }
        }

        const children = this.children.map(item => item.toString())
        if (this.page) {
            const page = `{
                    lazy: () => import("${this.page}"),
                    index: true
                }`
            children.push(page)
        }
        if (this.notFound) {
            const notFound = `{
                    lazy: () => import("${this.notFound}"),
                    path: "*"
                }`
            children.push(notFound)
        }
        if (this.isPathless) {
            if (this.layout) {
                return `{
                    lazy: () => import("${this.layout}"),
                    children: [${children}]
                }`
            } else {
                return `{
                    children: [${children}]
                }`
            }
        } else {
            if (this.layout) {
                return `{
                    path: "${this.path}",
                    lazy: () => import("${this.layout}"),
                    children: [${children}]
                }`
            } else {
                return `{
                    path: "${this.path}",
                    children: [${children}]
                }`
            }
        }

    }
}
