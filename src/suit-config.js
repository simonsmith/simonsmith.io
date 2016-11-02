module.exports = {
  encapsulate: true,
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
