/**
 * 路径
 * 找到当前文件中的路由文件  src/router/routes.ts
 * 找到当前文件中的页面文件  src/views/
 * 找到当前文件中的api文件   src/apis/
 *
 *
 * 找到目录中的src目录
 * */
import path from 'node:path'
import fs from 'node:fs'

const validateSrcPath = (srcPath: string) => {
    const pathDirs = fs.readdirSync(srcPath)
    const targetDirs = ['router', 'views', 'apis']

    // router views apis
    for (let i = 0; i < pathDirs.length; i++) {
        let index = targetDirs.findIndex((item) => item === pathDirs[i])
        if (index !== -1) {
            targetDirs.splice(index, 1)
        }
    }

    return targetDirs.length === 0
}

export const findPath = () => {
    let currentPath = process.cwd()

    // 默认向上找 直到系统根目录
    let srcPath: string | boolean = ''
    while ((currentPath = path.dirname(currentPath))) {
        // currentPath 所在的目录中是否有src 目录
        // src中是否有 router 的目录
        const pathDirs = fs.readdirSync(currentPath)
        let currentSrcPath = pathDirs.find((item) => item === 'src') || ''
        let isValidSrcPath = currentSrcPath ? validateSrcPath(path.join(currentPath, currentSrcPath)) : false

        // 到了根目录后 停止
        if (path.dirname(currentPath) === currentPath || isValidSrcPath) {
            srcPath = isValidSrcPath && path.join(currentPath, currentSrcPath)
            break
        }
    }

    return srcPath
}
