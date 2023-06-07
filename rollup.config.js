import { defineConfig } from 'rollup'
import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import deletePlugin from 'rollup-plugin-delete'

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            file: 'lib/index.cjs',
            format: 'cjs',
            banner: '#!/usr/bin/env node\n',
        },
        {
            file: 'lib/index.es.js',
            format: 'es',
            banner: '#!/usr/bin/env node\n',
        },
    ],
    plugins: [
        babel(),
        typescript(),
        resolve(),
        commonjs(),
        deletePlugin({
            targets: ['lib/*'],
        }),
    ],
    resolve: {
        alias: {
            '@/*': 'src/*',
            'utils/*': 'utils/*',
            'templates/*': 'templates/*',
        },
    },
})
