module.exports = {
  use: [
    'postcss-import',
    'postcss-nested',
    'postcss-custom-properties',
    'postcss-calc',
    'postcss-custom-media',
    'postcss-property-lookup',
    'postcss-size',
    'autoprefixer',
    'postcss-reporter'
  ],
  'postcss-import': {
    'path': 'source/stylesheets/src'
  }
};
