/**
 *
 * 格式化 页面的名称
 * yellCode --view order-management
 * yellCode --view orderManagement
 *
 * - views
 *  - OrderManagement
 *   - src
 *    - xxxx
 *   - index.vue
 *
 * - router
 *  - routes.ts
 * {
 *   path: '/order-management',
 *   name: 'orderManagement',
 *   component: () => import('@/views/OrderManagement/index.vue')
 * }
 *
 * order-management
 * orderManagement
 *
 * ==>
 * OrderManagement
 *
 */

export const formatCommandLineInput = (commandLineInput: string) => {
    // 判断是否有大写字母 或者破折号
    const { index } = commandLineInput.match(/(-|[A-Z])/) || {}

    let pathName = commandLineInput
    let componentName = commandLineInput
    let dirName = commandLineInput

    if (index) {
        if (commandLineInput.includes('-')) {
            const [str1, ...otherStr] = commandLineInput.split('-')
            const other = otherStr.reduce((pre, cur) => pre + cur.replace(/^[a-z]/, (val) => val.toUpperCase()), '')
            const str1UpperCase = str1.replace(/^[a-z]/, (val) => val.toUpperCase())

            pathName = commandLineInput
            componentName = str1 + other
            dirName = str1UpperCase + other
        } else {
            const str1 = commandLineInput.slice(0, index)
            const str2 = commandLineInput.slice(index)

            const str1UpperCase = str1.replace(/^[a-z]/, (val) => val.toUpperCase())
            const str2LowCase = str2.replace(/[A-Z]/g, (val) => `-${val.toLowerCase()}`)

            pathName = `${str1}-${str2LowCase}`
            componentName = commandLineInput
            dirName = `${str1UpperCase}${str2}`
        }
    }

    return {
        pathName,
        componentName,
        dirName,
    }
}
