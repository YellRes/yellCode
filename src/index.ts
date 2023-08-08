import path from 'node:path'
import fs from 'node:fs'
import { Command } from 'commander'
import { findPath } from '@/utils/findPath.ts'
import { routerAst } from '@/utils/ast/index.ts'
import { renderViews } from '@/utils/renderTemplate.ts'
import { formatCommandLineInput } from '@/utils/index.ts'

const init = async (str: string) => {
    // const options = program.opts()
    if (str) {
        const srcPath = findPath()
        // TODO: 没有找到src目录需要提示错误
        if (!srcPath) return console.log('没有找到src目录，请确认命令的位置')

        console.log(str, 'str')
        const { dirName, componentName, pathName } = formatCommandLineInput(str)
        console.log(dirName, componentName, pathName, 'dirName, componentName, pathName')

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
            console.log(e, 'e')
            console.log('目录创建失败 请核实')
        }
    } else {
        console.log('请输入页面名称')
    }
}

const program = new Command()
program
    .name('yellCode')
    .command('create')
    .description('Cli to generate some file')
    .argument('<string>', 'file name')
    .version('1.0.0')
    .action((str) => {
        init(str)
    })

// 创建view页面

// TODO:
// yellCode create xxx
// DONE:

// program.option('-v, --view <type>', 'views name')
program.parse(process.argv)
