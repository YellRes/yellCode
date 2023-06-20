import * as fs from 'node:fs'
import * as path from 'node:path'

export const renderTemplate = (src: string, dest: string) => {
    const stats = fs.statSync(src)

    if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true })
        for (const file of fs.readdirSync(src)) {
            renderTemplate(path.resolve(src, file), path.resolve(dest, file))
        }

        return
    }

    fs.copyFileSync(src, dest)
}

export const renderViews = (src: string, dest: string, directory: string) => {
    const finalDest = path.join(dest, directory)
    fs.mkdirSync(finalDest)

    renderTemplate(src, finalDest)
}
