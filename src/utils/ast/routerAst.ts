import { babel } from '@babel/core'
import * as types from '@babel/types'
import { NodePath } from '@babel/traverse'
import { routerItemTemplate } from './template.ts'

export const routerAst = () => {
    return {
        visitor: {
            ArrayExpression(path: NodePath<types.ArrayExpression) {
                console.log(path.node.elements)
            },
        },
    }
}
