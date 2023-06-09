import path from 'node:path'
import { Command } from 'commander'
import { renderViews } from '@/utils/renderTemplate.ts'

const program = new Command()
program.name('yellCode').description('Cli to generate some program file').version('1.0.0')

// 创建view页面
program.option('-v, --view <type>', 'views name')
program.parse(process.argv)

const init = () => {
    const options = program.opts()
    if (options.view) {
        renderViews(path.join(__dirname, '../templates/views'), process.cwd(), options.view)
    }
}

init()
