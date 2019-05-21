const path = require('path');
const config = require('./webpack.common');

module.exports = {
  ...config,

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist'),
  },
};
