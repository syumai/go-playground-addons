const path = require('path');
const config = require('./webpack.common');

module.exports = {
  ...config,

  output: {
    filename: 'bundle.dev.js',
    path: path.join(__dirname, './dist'),
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
