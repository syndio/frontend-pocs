import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import transformer from 'typescript-transform-paths';

const packageJson = require('./package.json');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './index.ts',
  output: [
    {
      file: './dist/index.ts',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: [...Object.keys(packageJson.peerDependencies || {})],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      transformers: {
        afterDeclarations: [
          {
            type: 'program',
            factory: (program) => {
              return transformer(program);
            },
          },
        ],
      },
    }),
    commonjs(),
    peerDepsExternal(),
    resolve({
      skip: ['react', 'react-dom'],
    }),
    json(),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extract: true,
    }),
  ],
};
