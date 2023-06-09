import { babel } from '@babel/core'
import { routerItemTemplate } from './template.ts'

export const routerAst = () => {
    return {
        visitor: {
            BinaryExpression() {},
        },
    }
}
