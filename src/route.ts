import fs from 'fs';
import { globSync } from 'glob'
import path from 'path';


export class Route {
    path: string;
    page?: string;
    layout?: string;
    children: Route[] = [];

    constructor(baseDir: string, pathName: string = '/') {
        this.path = pathName
        const dirents = fs.readdirSync(baseDir, {
            withFileTypes: true
        })
        for (const dirent of dirents) {
            const filePath = path.join(baseDir, dirent.name)
            if (dirent.isDirectory() && !dirent.name.startsWith("_")) {
                this.children.push(new Route(filePath, dirent.name))
            } else if (/^layout\./i.test(dirent.name)) {
                this.layout = '/' + filePath
            } else if (/^page\./i.test(dirent.name)) {
                this.page = '/' + filePath
            }
        }
        // let path = this.trimStart(filePath, baseDir)
        // path = this.trimStart(path, "/")
        // path = path
        //     .replace(/\..*$/, "")
        //     .replace(/\[\.{3}.+\]/, '*')
        //     .replace(/\[(.+)\]/, ':$1')
        // this.path = path.toLowerCase()
        // if (isDirectory) {
        //     const children = this.getRoutes(filePath)
        //     const layout = children.find(item => item.layout)
        //     this.componentPath = layout?.componentPath
        //     this.children = children.filter(item => !item.layout)
        // } else {
        //     this.componentPath = "/" + filePath
        // }
    }

    toString() {
        let children = this.children.join(",")
        if (this.page) {
            const page = `{
                lazy: () => import("${this.page}"),
                index: true
            }`
            children = `${page}, ${children}`
        }
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
