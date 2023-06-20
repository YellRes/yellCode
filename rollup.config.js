import { defineConfig } from 'rollup'
import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import deletePlugin from 'rollup-plugin-delete'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'

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
        json(),
        resolve(),
        commonjs(),
        deletePlugin({
            targets: ['lib/*'],
        }),
        alias({
            entries: {
                '@': './src',
                utils: './utils',
                templates: './templates',
            },
        }),
    ],
})
