module.exports = {
  entry: './src/index.tsx',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }],
  },
};
