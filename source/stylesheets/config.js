const postcss = require('postcss');
const nested = require('postcss-nested');

module.exports = {
  beforeLint(css) {
    return postcss([nested]).process(css).css;
  },
  use: [
    'postcss-property-lookup',
    'postcss-size',
    'autoprefixer',
    'postcss-reporter'
  ],
  "postcss-import": {
    'path': 'source/stylesheets/src'
  }
};
