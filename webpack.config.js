const helper = require('./webpack.helper');

module.exports = [
  helper.getConfigTemplate({
    module: { rules: [helper.getCustomTsLoaderOptions({ configFile: 'tsconfig.esm.json' })] },
    entry: ['./src/index.ts'],
    output: helper.getOutput({ type: 'umd' }),
    resolve: helper.getResolveFallback(),
  }),
  helper.getConfigTemplate({
    module: { rules: [helper.getCustomTsLoaderOptions({ configFile: 'tsconfig.json' })] },
    entry: ['./src/index.ts'],
    target: 'node',
    output: helper.getOutput({ type: 'commonjs' }),
  }),
];
