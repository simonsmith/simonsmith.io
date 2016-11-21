module.exports = {
  use: [
    'postcss-nested',
    'postcss-size',
  ],
  stylelint: {
    extends: 'stylelint-config-suitcss',
    ignoreFiles: '**/normalize.css',
    rules: {},
  },
};
