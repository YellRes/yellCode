import babel from '@babel/core'
import * as types from '@babel/types'
import { NodePath } from '@babel/traverse'
// import { routerItemTemplate } from './template.ts'

/**
 *   
 *  {
        path: '/api-order',
        name: 'apiOrder',
        component: () => import('@/views/ApiOrder/index.vue'),
        meta: {
            title: 'api订单'
        }
    }
 * 
 */

// name: NAME,
// component: LAZY_LOAD_FUNCTION,
// meta: {
//     title: META
// }
const routerAstPlugin = ({ types: t, template }: typeof babel) => {
    const routerTemplateBuilder = template(`{path: PATH}`)
    return {
        visitor: {
            ObjectExpression: {
                enter(path: NodePath<types.ObjectExpression>) {
                    // router中数组 最后的一个节点
                    if (!path.getNextSibling().toString()) {
                        const addedNode = routerTemplateBuilder({
                            PATH: t.stringLiteral('xx'),
                            // NAME: t.stringLiteral('xx'),
                            // LAZY_LOAD_FUNCTION: t.stringLiteral('xx'),
                            // META: t.stringLiteral('xx'),
                        })
                        console.log(path.type, path)
                        // path.insertAfter(addedNode)
                    }
                },
            },
        },
    }
}

const options = {
    plugins: [routerAstPlugin],
    // TODO: 安装了 @babel/preset-typescript 没有配置 但依旧可以配置成功
    // presets: ['@babel/preset-typescript'],
}

export const routerAst = (code: string) => {
    return new Promise((res, rej) => {
        babel.transform(code, options, (err, result) => {
            if (err) return rej(err)
            res(result?.code)
        })
    })
}

// TODO:
// type A = { b: number; c: number; z: string }
// type D = { e: number }
// type F = A | D

// const g: F = {
//     e: 12,
//     c: 10,
// }
