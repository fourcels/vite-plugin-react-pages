import { globSync } from 'glob'

export class Route {
    path: string;
    componentPath?: string;
    children?: Route[];
    get index() {
        return this.path === "index"
    }
    get layout() {
        return this.path === "layout"
    }
    get noMatch() {
        return this.path === "404"
    }
    get hidden() {
        return this.children && this.path.startsWith("_")
    }
    constructor(baseDir: string, filePath: string = baseDir, isDirectory: boolean = true) {
        let path = this.trimStart(filePath, baseDir)
        path = this.trimStart(path, "/")
        path = path
            .replace(/\..*$/, "")
            .replace(/\[\.{3}.+\]/, '*')
            .replace(/\[(.+)\]/, ':$1')
        this.path = path.toLowerCase()
        if (isDirectory) {
            const children = this.getRoutes(filePath)
            const layout = children.find(item => item.layout)
            this.componentPath = layout?.componentPath
            this.children = children.filter(item => !item.layout)
        } else {
            this.componentPath = "/" + filePath
        }
    }


    getRoutes(baseDir: string) {
        const routes: Route[] = []
        const paths = globSync(`${baseDir}/*`, { withFileTypes: true })
        for (const path of paths) {
            routes.push(new Route(baseDir, path.relative(), path.isDirectory()))
        }
        return routes
    }

    trimStart(str: string, start: string) {
        if (start.length > 0 && str.startsWith(start)) {
            return str.substring(start.length)
        }
        return str
    }

    toString() {
        const path = this.noMatch ? "*" : this.path
        const lazy = this.componentPath ? `() => import("${this.componentPath}")` : undefined
        const children = this.children ? `[${this.children.join(",")}]` : undefined
        if (this.index) {
            return `{
                index: true,
                lazy: ${lazy},
                children: ${children}
            }`
        } else if (this.hidden) {
            return `{
                lazy: ${lazy},
                children: ${children}
            }`
        } else {
            return `{
                path: "${path}",
                lazy: ${lazy},
                children: ${children}
            }`
        }
    }
}
