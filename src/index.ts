import path from 'node:path'
import fs from 'node:fs'
import { Command } from 'commander'
import { renderViews } from '@/utils/renderTemplate.ts'
import { findPath } from '@/utils/findPath.ts'
import { routerAst } from '@/utils/ast/index.ts'
import { formatCommandLineInput } from '@/utils/index.ts'

const program = new Command()
program.name('yellCode').description('Cli to generate some file').version('1.0.0')

// 创建view页面

// TODO:
// yellCode create xxx

program.option('-v, --view <type>', 'views name')
program.parse(process.argv)

const init = async () => {
    const options = program.opts()
    if (options.view) {
        const srcPath = findPath()
        // TODO: 没有找到src目录需要提示错误
        if (!srcPath) return

        const { dirName, componentName, pathName } = formatCommandLineInput(options.view)

        // 生产views中页面
        // renderViews(path.join(__dirname, '../templates/views'), path.join(srcPath, 'views'), dirName)

        // router
        // 修改router/routes.ts内容
        const routesStr = fs.readFileSync(path.join(srcPath, 'router/routes.ts'), { encoding: 'utf-8' })
        let astNormalizeStr = await routerAst(routesStr, { dirName, componentName, pathName })
        // 把 astNormalizeStr 重新写入routes.ts
        console.log(astNormalizeStr, 'astNormalizeStr')

        // api
    }
}

init()
