---
date: 2017-05-20
title: Simplifying module resolution with Babel or webpack
---

I like to keep my projects organised and this usually means varying levels of
directory structure to satisfy my OCD. One side effect of this which I often
bump into is trying to work out how many `../` to add in an `import` or
`require` module path:

```js
import Component from '../../../components/Component'; // not found - argh!
```

It's ugly, but also makes moving files around prone to error. It can be equally
frustrating within various test directories to know how far away from the
source code you are.

Thankfully this can be solved by tooling and I'll cover two solutions that can
be used.

## webpack and `resolve.alias`

The first option for webpack users is to configure [the `alias` option](https://webpack.js.org/configuration/resolve/#resolve-alias). This works as you might expect:

```js
/* webpack.config.js */

resolve: {
  alias: {
    components: path.resolve('./assets/scripts/components'),
  },
}
```

```js
import Component from 'components/Component'; // works!
```

### A problem

Whilst it seems to work well it can fall apart when loading modules inside
tests. It's highly unlikely that test files will be loaded via webpack so when a
module path like `components/Component` is encountered it will complain it can't
be found.

If you're using Jest this can be fixed [via
configuration](https://facebook.github.io/jest/docs/en/configuration.html#modulenamemapper-object-string-string)
with `moduleNameMapper`:

```js
moduleNameMapper: {
  '^components/(.*)': '<rootDir>/assets/scripts/components/$1.js',
},
```

This works as expected but now the configuration exists in two places which is
less than ideal. And what about other test runners?

## Using a Babel plugin

It's likely that Babel exists in your build process these days. If so we can
instead use [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) to handle the aliases. This has the benefit of keeping configuration in one
place and allows all JS files passed through Babel to pick up the configuration.
This is good news for our test files.

Let's say I have the following structure in a React application:

```bash
src
├── client.js
├── components
│  ├── Avatar
│  ├── Bio
│  └── Search
├── store
│  ├── index.js
│  ├── reducers
```

It would be nice to be able to require modules directly not just from `src` but
also from within `store` as well. The configuration would look like this:

```js
// .babelrc
{
  "plugins": [
    ["module-resolver", {
      "root": ["./src/**", "./src/store/**"]
    }]
  ]
}
```

Now from either the source files or the tests we can use the shorter module
paths:

```js
import UserReducer from 'store/reducers/User';
import Component from 'components/Component';
```

> This relies on your test runner of choice using Babel on the test files. I can
  highly recommend Jest as it will automatically use a `.babelrc` if one is
  found.

## Done!

Be sure to consult [the
README](https://github.com/tleunen/babel-plugin-module-resolver#eslint-plugin)
for tips on handling ESLint and flow.
