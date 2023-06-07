// yellCode views viewsName

export const generatorViews = {
    description: 'program create views',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'views name',
        },
    ],
    actions: [
        {
            type: 'addMany',
            templateFiles: '/template/views/*',
        },
    ],
}
