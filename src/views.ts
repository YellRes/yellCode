// yellCode views viewsName
import { NodePlopAPI } from 'plop'

export const generatorViews = (plop: NodePlopAPI) => {
    plop.setGenerator('views', {
        description: '生成页面',
        prompts: [
            {
                type: 'input',
                name: 'viewName',
                message: '请输入页面名称',
            },
        ],
        actions: [
            {
                type: 'addMany',
                templateFiles: '/template/views/*',
            },
        ],
    })
}
