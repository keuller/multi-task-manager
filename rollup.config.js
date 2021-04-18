import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';

const isProd = (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'prod');
const plugs = (isProd ? [terser()] : []);

export default {
    input: "src/index.js",

    output: {
        file: 'public/dist/bundle.js',
        format: 'iife',
        sourcemap: true,
        plugins: plugs
    },

    plugins: [
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

        nodeResolve({
            extensions: ['.js']
        }),

        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react']
        }),

        commonjs()
    ]

}
