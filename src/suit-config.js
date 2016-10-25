module.exports = {
  use: [
    'postcss-nested',
    'postcss-size',
    'postcss-generate-preset',
  ],
  // stylelint: {
  //   extends: 'stylelint-config-suitcss',
  //   ignoreFiles: '**/normalize.css',
  //   rules: {},
  // },
  'postcss-generate-preset': {
    useImportant: true,
  },
};
