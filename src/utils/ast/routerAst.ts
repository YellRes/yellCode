import babel from '@babel/core'
import * as types from '@babel/types'
import { NodePath } from '@babel/traverse'
import { formatCommandLineInput } from '@/utils/format.ts'
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

// 插件中如何获取 命令行中的信息
const routerAstPlugin = ({ types: t }: typeof babel) => {
    return {
        visitor: {
            // ObjectExpression: {
            //     enter(path: NodePath<types.ObjectExpression>) {
            //         // if (path.parent.type !== 'ArrayExpression') return
            //         // router中数组 最后的一个节点
            //         // if (!path.getNextSibling().toString()) {
            //         //     let obj = t.objectExpression([])
            //         //     obj.properties.push(t.objectProperty(t.identifier('name'), t.stringLiteral('John')))
            //         //     obj.properties.push(t.objectProperty(t.identifier('path'), t.numericLiteral(30)))
            //         //     // console.log(path.toString(), 'path')
            //         //     // path.insertAfter(obj)
            //         // }
            //     },
            // },
            ArrayExpression: {
                enter(path: NodePath<types.ArrayExpression>, state: any) {
                    const { dirName, componentName, pathName } = state.opts

                    let obj = t.objectExpression([])

                    let metaObj = t.objectExpression([])
                    metaObj.properties.push(t.objectProperty(t.identifier('title'), t.stringLiteral('')))

                    // 箭头函数
                    const arrowFnBody = t.blockStatement([
                        t.returnStatement(
                            t.callExpression(t.identifier('import'), [t.stringLiteral(`@/views/${dirName}/index.vue`)]),
                        ),
                    ])

                    obj.properties.push(t.objectProperty(t.identifier('path'), t.stringLiteral(`/${pathName}`)))
                    obj.properties.push(t.objectProperty(t.identifier('name'), t.stringLiteral(`${componentName}`)))
                    obj.properties.push(
                        t.objectProperty(t.identifier('component'), t.arrowFunctionExpression([], arrowFnBody)),
                    )
                    obj.properties.push(t.objectProperty(t.identifier('meta'), metaObj))
                    path.node.elements.push(obj)
                },
            },
        },
    }
}

const options = {
    plugins: [[routerAstPlugin]] as any,
    // TODO: 安装了 @babel/preset-typescript 没有配置 但依旧可以配置成功
    // presets: ['@babel/preset-typescript'],
}

export const routerAst = (code: string, params: Record<string, any>) => {
    options.plugins[0].push(params)
    return new Promise((res, rej) => {
        babel.transform(code, options, (err, result) => {
            if (err) return rej(err)
            res(result?.code)
        })
    })
}
