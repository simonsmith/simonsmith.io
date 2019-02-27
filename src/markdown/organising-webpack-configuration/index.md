---
date: 2017-04-20
title: Organising webpack configuration for different environments
path: "/organising-webpack-config-environments"
---

A common question is how best to organise webpack config files, especially
when it comes to different environments. In this post I'll share a pattern that
works well and allows scaling to as many environments as needed.

## A file per environment

The simplest way to start is with a `webpack` directory that contains a base
configuration and then an additional configuration for each environment:

```bash
webpack
├── base.config.js
├── dev.config.js
└── prod.config.js
```

## The base

As you could expect, this file will contain settings that are common across all
environments in your application. Good candidates are entry files, plugins and
loaders.

**base.config.js**

```js
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
  ],
};
```

## Extending for different for environments

From here we can make use of
[webpack-merge](https://github.com/survivejs/webpack-merge) to extend the base
configuration.

Common settings in development could be source maps, a [dev
server](https://github.com/webpack/webpack-dev-server) or different settings for
file loaders.

**dev.config.js**

```js
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',

  devServer: {
    inline: true,
    contentBase: 'src',
    port: '3001',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
        ],
      },
    ],
  },
});
```

In production it could include modification of assets, extracting CSS into a
separate file and outputting the chunks to a build directory.

**prod.config.js**

```js
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  output: {
    path: 'build',
    filename: '[name].bundle.[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    // Extract imported CSS into own file
    new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    // Minify JS
    new UglifyJsPlugin({
      sourceMap: false,
      compress: true,
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});
```

## Running webpack in different environments

With `webpack` and `webpack-dev-server` installed as dependencies in your
project it is a simple case of adding two npm scripts to `package.json`:

```bash
"scripts": {
  "build": "NODE_ENV=production webpack --config webpack/prod.config.js",
  "start": "NODE_ENV=development webpack-dev-server --config webpack/dev.config.js",
  "deploy": "npm run build && <some build script>"
}
```
```bash
npm run build
npm run start
```

## A working example

I used this setup on
[github-user-search](https://github.com/simonsmith/github-user-search) to run
the site locally and deploy it to github pages.

Further reading can be found in the [webpack
documentation](https://webpack.js.org/guides/production-build/).
