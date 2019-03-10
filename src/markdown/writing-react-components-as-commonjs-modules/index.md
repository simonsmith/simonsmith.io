---
title: Writing React components as CommonJS modules
date: 2014-01-21
path: "/writing-react-components-as-commonjs-modules"
draft: false
---

One of the libraries gaining interest at the moment is [Facebook's React JS library](http://facebook.github.io/react/index.html). It mainly concerns itself with "the V in MVC" and encourages developers to break their app into resuable, modular components. The Virtual DOM is a great feature on its own, and I encourage you to [investigate React](http://facebook.github.io/react/blog/2013/06/05/why-react.html) if you haven't yet.

In this post I'll be explaining how your React components can be used as [CommonJS modules](http://nodejs.org/docs/latest/api/modules.html#modules_modules) and then made browser friendly via [Grunt](http://gruntjs.com). Using React this way (as opposed to Bower, or just downloading the files manually) allows easy re-use of [components on the server](https://github.com/facebook/react-page) as well as all the benefits of modularising your code.

## J to the S to the X

At this point it's worth noting the use of [JSX in React](http://facebook.github.io/react/docs/jsx-in-depth.html). It transforms easy to read XML-like syntax into normal JS. This means your [render method](http://facebook.github.io/react/docs/component-specs.html#render) is a lot easier to read and maintain, particularly by less JS savvy developers.

Although it is not _required_ to use React you'd be a braver man than I to write heavily nested HTML structures without it.

``` jsx
// This easy to read syntax gets translated into...
<div className="Module">
  <h2 className="Module-header h3">{result.login}</h2>
  <Foo className="Foo--simple" link={url} imgUrl={result.avatar_url} text="View profile" />
</div>

// ...this normal not-so-easy to read JavaScript
React.DOM.div( {className:"Module"},
  React.DOM.h2( {className:"Module-header h3"}, result.login),
  Foo( {className:"Foo--simple", link:url, imgUrl:result.avatar_url, text:"View profile"} )
)
```

A JSX transformer ships with React that can be dropped straight into the browser. This makes prototyping simpler but is also an overhead that **should not** be used in production.

Seeing as a compile step is required to use CommonJS modules in the browser, it also makes sense to drop in an extra step to compile the JSX. Grunt will be handling both of these steps.

## But first

A few things will be needed from NPM before any fun can start.

* [React](https://npmjs.org/package/react) - The React library
* [Grunt](https://npmjs.org/package/grunt) - Grunt taskrunner
* [grunt-react](https://npmjs.org/package/grunt-react) - Compiles JSX files to JS
* [grunt-browserify](https://npmjs.org/package/grunt-browserify) - Grunt version of [Browserify](http://browserify.org/)

As well as the above node modules, a place for the React components and compiled JS file will be needed. I tend to favour a `react_components` directory (similar to Bower) for the former.

```bash
├── Gruntfile.js
├── index.html
├── node_modules
├── package.json
├── react_components
└── scripts
```

## Defining components

For the purpose of this post we'll pretend that a user profile needs to be created. It will contain an avatar, a bio snippet and allow this data to be passed in as `props`.

**bio.jsx**

``` jsx
/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="Bio">
          <p className="Bio-text">{this.props.text}</p>
      </div>
    )
  }
});
```

**avatar.jsx**

``` jsx
/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="Avatar">
        <img className="Avatar-img" src={this.props.imgSrc} alt="" />
      </div>
    )
  }
});
```

These are React components at their simplest.

The only things to note are the requiring of the React library at the top and the exporting of the constructor returned from `React.createClass`. This is the pattern typically used to write components in a CommonJS environment.

With the building blocks defined they can now be easily used to construct a profile component.

**profile.jsx**

``` jsx
/** @jsx React.DOM */

var React  = require('react');
var Avatar = require('./Avatar.jsx');
var Bio    = require('./Bio.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="Profile">
        <h2 className="Profile-title">{this.props.username}</h2>
        <div className="Profile-body">
          <Avatar imgSrc={this.props.avatar} />
          <Bio text={this.props.bio} />
        </div>
      </div>
    )
  }
});
```

In this component some `Profile` specific HTML is added and props are passed on to the `Avatar` and `Bio` components.

## Bringing the pieces together

All that is left is for a top-level component of some kind to make use of the `Profile` component. For this example I'll add an `App.jsx` component that will pass the necessary data into the `Profile` and render it in the page.

**App.jsx**

``` js
/** @jsx React.DOM */

var React   = require('react');
var Profile = require('./Profile.jsx');

React.renderComponent(
  <Profile
    username="Simon"
    bio="My name is Simon. I make websites"
    avatar="http://simonsmith.io/assets/images/me.jpg"
  />,
  document.body
);
```

### Overkill?

At this point it may seem unnecessary to break things up to such a granular level and instead it may be tempting to just have one `Profile` component that includes an avatar image and bio text. But what if the application also needs an avatar to be rendered in private messages or a status update?

By creating this level of abstraction it is trivial to require a few components and start piecing them together. Passing in props or making use of [`transferPropsTo`](http://facebook.github.io/react/docs/component-api.html#transferpropsto) allows re-use in different contexts whilst keeping all the logic in one place.

Making this modular approach so simple is one of my favourite parts of React.

### SUIT CSS

The HTML class naming conventions I use come from [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/README.md). The way components are handled there seem to complement React perfectly and I've found it very useful to keep the modular approach flowing through the CSS architecture.

## Build step

With the components ready to go, the final step is to configure Grunt to compile the JSX and then produce a browser friendly version of the CommonJS modules.

**Gruntfile.js**

``` js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      react: {
        files: 'react_components/*.jsx',
        tasks: ['browserify']
      }
    },

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      client: {
        src: ['react_components/**/*.jsx'],
        dest: 'scripts/app.built.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'browserify'
  ]);
};
```

The `grunt-browserify` task can make use of `grunt-react` to compile the JSX before producing the final, built JS file. Additionally I've included a configuration for the [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) task to recompile the React components when any of the files are changed.

With the config in place all that is left is to run `grunt` on the CLI and a `app.built.js` file will be created in the `scripts` directory. Drop this into an HTML page and you're done.

## What about AMD?

I'm a massive fan of AMD and [RequireJS](http://requirejs.org) but haven't tried it with React as of yet. I'm confident that [r.js](https://github.com/jrburke/r.js/) could be used to convert the JSX compiled templates [into AMD modules](https://github.com/jrburke/r.js/blob/master/build/example.build.js#L562) but I'll leave that to another post. There is already some [discussion around that topic](https://github.com/facebook/react/issues/28) in the React repository.

## Wrapping up

The example code used in this post can be found in [this GitHub repository](https://github.com/simonsmith/react-commonjs-example). Feel free to drop me [a tweet](http://twitter.com/blinkdesign) with any feedback/corrections.