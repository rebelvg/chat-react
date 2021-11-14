const baseConfig = require('./webpack.config.production');

module.exports = {
  ...baseConfig,
  mode: 'development',
  output: undefined,
  devServer: {
    port: 3000,
  },
};
