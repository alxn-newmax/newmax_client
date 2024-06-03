const { resolve } = require('path');

const webpack = {
  alias: {
    '@config': resolve(__dirname, 'src/config'),
    '@utils': resolve(__dirname, 'src/utils'),
    '@images': resolve(__dirname, 'src/assets/images'),
    '@components': resolve(__dirname, 'src/components'),
  },
};

module.exports = { webpack };
