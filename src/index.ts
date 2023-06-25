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
        if (!srcPath) return console.log('没有找到src目录，请确认命令的位置')

        const { dirName, componentName, pathName } = formatCommandLineInput(options.view)

        try {
            // 生产views中页面
            renderViews(path.join(__dirname, '../templates/views'), path.join(srcPath, 'views'), dirName)
            console.log('views 目录文件创建成功')

            // router
            // 修改router/routes.ts内容
            const routesStr = fs.readFileSync(path.join(srcPath, 'router/routes.ts'), { encoding: 'utf-8' })
            let astNormalizeStr = (await routerAst(routesStr, { dirName, componentName, pathName })) as string
            // 把 astNormalizeStr 重新写入routes.ts
            // console.log(astNormalizeStr, 'astNormalizeStr')
            const routerPath = path.join(srcPath, 'router', 'routes.ts')
            fs.writeFileSync(routerPath, astNormalizeStr, 'utf8')
            console.log('routers/routes.ts 文件修改成功')

            // api
            const apiPath = path.join(srcPath, 'apis', `${pathName}.ts`)
            const apiStr = fs.readFileSync(path.join(__dirname, '../templates/api/index.ts'), { encoding: 'utf-8' })
            fs.writeFileSync(apiPath, apiStr, 'utf-8')
            console.log('api 目录文件修改成功')
        } catch (e) {
            console.log('目录创建失败 请核实')
        }
    }
}

init()
