/**
 * 路径
 * 找到当前文件中的路由文件  src/router/routes.ts
 * 找到当前文件中的页面文件  src/views/
 * 找到当前文件中的api文件   src/apis/
 *
 *
 * 找到目录中的src目录
 * */
import node from 'node:path'
import fs from 'node:fs'

const findPath = () => {
    const executionPath = process.cwd()
    console.log('%c [ executionPath ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', executionPath)

    // 默认向上找 直到系统根目录
}
