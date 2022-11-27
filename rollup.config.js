// Configuration, used by `rollup -c` during `npm run build`.

import { homepage, description, license, name, version } from './package.json';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const banner = `/**\n`
    + ` * ${name} ${version}\n` // will be ' * Unit tests for ...' in test files
    + ` * ${description}\n`
    + ` * ${homepage}\n`
    + ` * @license ${license}\n`
    + ` */\n\n`;

export default [

    // Build Obscure’s distribution files. Tree-shaking should remove all tests.
    {
        input: 'src/main.js',
        output: {
            banner,
            file: 'dist/rufflib-obscure.es.js',
            format: 'es',
        },
        plugins: [nodeResolve({ resolveOnly:['rufflib-validate'] })]
    },
    {
        input: 'dist/rufflib-obscure.es.js',
        output: {
            file: 'dist/rufflib-obscure.umd.es5.min.js',
            format: 'umd',
            name: 'rufflib.obscure.main', // `var Obscure = rufflib.obscure.main`
        },
        // See https://babeljs.io/docs/en/babel-preset-env
        // and https://github.com/terser/terser#minify-options
        plugins: [
            babel({ babelHelpers: 'bundled' }),
            terser({ keep_classnames:true })
        ]
    },

    // Build demo files.
    {
        input: 'src/docs/demo/demo-1.js',
        output: {
            banner: banner.replace(' * ', ' * Demo 1 for '),
            file: 'docs/demo/demo-1.es.js',
            format: 'es',
        },
        plugins: [nodeResolve({ resolveOnly:['rufflib-validate'] })]
    },
    {
        input: 'docs/demo/demo-1.es.js',
        output: {
            file: 'docs/demo/demo-1.umd.es5.js',
            format: 'umd',
            name: 'rufflib.obscure.demo1' // `rufflib.obscure.demo1.obscureDemo1(...)`
        },
        plugins: [babel({ babelHelpers: 'bundled' })]
    },

    // Build unit test files.
    {
        input: 'src/main-test.js',
        output: {
            banner: banner.replace(' * ', ' * Unit tests for '),
            file: 'docs/test/rufflib-obscure-test.es.js',
            format: 'es',
        },
        plugins: [nodeResolve({ resolveOnly:['rufflib-validate'] })]
    },
    {
        input: 'docs/test/rufflib-obscure-test.es.js',
        output: {
            file: 'docs/test/rufflib-obscure-test.umd.js',
            format: 'umd',
            name: 'rufflib.obscure.test' // `rufflib.obscure.test(expect, Obscure)`
        },
        // See https://babeljs.io/docs/en/babel-preset-env
        plugins: [babel({ babelHelpers: 'bundled' })]
    }
];
