// rollup.config.js
const { terser } = require('rollup-plugin-terser');

module.exports = {
  input: './build/build.js',
  output: {
    file: './build/bundle.js',
    format: 'umd',
    name: 'myBundle'
  },
  plugins: [
    // Add terser plugin to minify the code
    terser()
  ]
};
