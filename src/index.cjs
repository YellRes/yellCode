const path = require('path')
const fs = require('fs')

//  找上级目录
// console.log(path.join(process.cwd(), '..'))

// 判断是否根目录
// console.log(path.dirname(process.cwd()))

const currentPath = process.cwd()

const validateSrcPath = (srcPath) => {
    console.log('%c [ srcPath ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', srcPath)

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
const findFilePathRoadToPath = (currentPath) => {
    let srcPath = ''
    while ((currentPath = path.dirname(currentPath))) {
        // currentPath 所在的目录中是否有src 目录
        // src中是否有 router 的目录
        const pathDirs = fs.readdirSync(currentPath)

        let srcPath = pathDirs.find((item) => item === 'src')
        let isValidSrcPath = srcPath ? validateSrcPath(path.join(currentPath, srcPath)) : false
        // 到了根目录后 停止
        if (path.dirname(currentPath) === currentPath || isValidSrcPath) {
            srcPath = isValidSrcPath
            break
        }
    }

    return srcPath
}

console.log(findFilePathRoadToPath(currentPath))
