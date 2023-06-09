import template from 'babel-template'

export const routerItemTemplate = template(`
    {
        path: PATH,
        name: NAME,
        component: LAZY_LOAD_FUNCTION
    }
`)
