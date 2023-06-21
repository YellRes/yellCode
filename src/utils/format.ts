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
            const [str1, str2] = commandLineInput.split('-')
            const str2UpperCase = str2.replace(/^[a-z]/, (val) => val.toUpperCase())
            const str1UpperCase = str1.replace(/^[a-z]/, (val) => val.toUpperCase())

            pathName = commandLineInput
            componentName = str1 + str2UpperCase
            dirName = str1UpperCase + str2UpperCase
        } else {
            const str1 = commandLineInput.slice(0, index)
            const str2 = commandLineInput.slice(index)

            const str1UpperCase = str1.replace(/^[a-z]/, (val) => val.toUpperCase())
            const str2LowCase = str2.replace(/^[A-Z]/, (val) => val.toLowerCase())

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
