import { NodePlopAPI } from 'plop'
import { input } from '@inquirer/prompts'
import { program } from 'commander'

program.option('--first').option('-s, --separator <char>')
program.parse()

const options = program.opts()
const limit = options.first ? 1 : undefined
console.log(program.args[0].split(options.separator, limit))

// export default function (plop: NodePlopAPI) {
//     plop.setGenerator('basic', {
//         description: 'this is a skeleton plopFile',
//         prompts: [],
//         actions: [],
//     })
// }
