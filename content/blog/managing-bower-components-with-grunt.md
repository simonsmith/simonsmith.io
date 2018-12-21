---
title: Managing Bower components with Grunt
date: 2014-01-13
draft: true
---

Originally it took me a while to get on board with using [Bower](http://bower.io) as part of my main development workflow. My biggest gripe was the way it handled repositories that were missing a `bower.json` file to configure ignored files etc.

In that scenario the whole repository is installed into the `bower_components` folder and although there are [two sides to it](http://addyosmani.com/blog/checking-in-front-end-dependencies/), checking that fluff into my Git repository doesn't feel right. That is of course, until [Grunt](http://gruntjs.com) came along.

## Grunt to the rescue

Like most of life's problems, Grunt can help.

The process goes a little like this:

1. Instructing Git (or your chosen VCS) to ignore the `bower_components` folder
2. Checking for and installing any updated packages
3. Copying the required files across into a directory that gets checked in to the VCS

By selectively copying files this way our repository can be kept free from test folders, READMEs and other cruft.

If you then needed to update jQuery to the latest version all it would require is changing the version number in the `bower.json` (or by installing it on the CLI), running the Grunt task and then committing the updated files to the repository. No manual downloads or file copying required.

## Bower?

It's hard not to have heard of [Bower](http://bower.io/) by now, so for brevity I'll drop a quote from their documentation:

> Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management. Bower runs over Git, and is package-agnostic. A packaged  component can be made up of any type of asset, and use any type of transport

If you're unfamiliar then there is a nice post [on the Treehouse blog](http://blog.teamtreehouse.com/getting-started-bower) that covers the basics.

## First steps

The best place to start is by creating a fresh `bower.json` file. This will keep track of the dependencies that your project requires and also their versions.

If you've used [NPM](https://npmjs.org/) and `package.json` then this will be familiar. You can do this manually or by running `bower init` on the command line, and walk through it in stages.

I prefer to create a `scripts/vendor` directory and move dependencies from the `bower_components` directory to there. To demonstrate this I've created an example directory with three installed dependencies - React, Angular and jQuery.

![](2014-01-13-managing-bower-components-with-grunt/initial-dir.png)

## Bringing in the Grunt

There are two ways to use Grunt in this situation. The easiest is to use one of the many Bower plugins found in the [Grunt plugins directory](http://gruntjs.com/plugins). These will typically handle the Bower install/update for you and then copy the files across to a directory of your choosing.

The second is to use a task just to do the Bower install and then use [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat). This not only allows you to move files to the vendor directory as before but also makes it easy to move multiple files into one.

### Why bother with concat?

A good example of this being useful is when a library is broken up into multiple files and you'd only like to use the ones you need. jQuery UI brings down each part of the UI library as a separate file, so by using the concat task you can create your own custom build and move just one file across to the `vendor` directory to be checked into your repository.

I tend to find the second option most effective, but let's look at both.

## Using grunt-bowercopy

When I have just some simple Bower packages to copy over I reach for [grunt-bowercopy](https://github.com/timmywil/grunt-bowercopy). It has a very simple configuration and will also ensure that `bower install` is run before moving any files.

``` js
bowercopy: {
  options: {
    srcPrefix: 'bower_components'
  },
  scripts: {
    options: {
      destPrefix: 'scripts/vendor'
    },
    files: {
      'jquery/jquery.js': 'jquery/jquery.js',
      'angular/angular.js': 'angular/angular.js',
      'react/react.js': 'react/react.js'
    }
  }
}
```

The `srcPrefix` and `destPrefix` options are a nice touch and keep the file paths simple. When `grunt bowercopy` is run it will create the specified files inside the `vendor` folder.

![](2014-01-13-managing-bower-components-with-grunt/dir-after-bower-copy.png)

If nothing more is required then great, you're pretty much done here. The only place I could see a shortcoming with this task was not tapping into some of the more advanced file path matching that is usually allowed with the `files` object in Grunt. Matching `*.js` is a good example.

It's worth noting at this point that although I've picked JavaScript packages in my examples you can just as easily use Bower to install Bootstrap, Normalize or SuitCSS and copy across CSS files as well.

## Doing it yourself

Using the `concat` task is pretty simple, but the first thing to do is be able to install any updated packages. Fortunately there is an abundance of Grunt tasks already available for this and the one I opted it for is [grunt-bower-install-simple](https://github.com/rse/grunt-bower-install-simple). By default it requires no configuration and will just run a `bower install` for you.

Then configure the concat task:

``` js
concat: {
  angular: {
    files: {
      'scripts/vendor/angular/angular.js': ['bower_components/angular/angular.js']
    }
  },
  jquery: {
    files: {
      'scripts/vendor/jquery/jquery.js': ['bower_components/jquery/jquery.js']
    }
  },
  react: {
    files: {
      'scripts/vendor/react/react.js': ['bower_components/react/react.js']
    }
  }
}
```

I like the idea of breaking up each library into a sub-task. It seems unnecessary at this point but if Angular or jQuery plugins are added at a later point it makes it easier to maintain. Choice is yours.

Finally tie them together with `registerTask`:

``` js
grunt.registerTask('bower', [
  'bower-install-simple',
  'concat'
]);
```

    grunt bower

Now that the concat task is being used you could compose your own jQuery UI build:

``` js
'app/js/vendor/jquery/jquery-ui.js': [
  'bower_components/jquery-ui/ui/jquery.ui.core.js',
  'bower_components/jquery-ui/ui/jquery.ui.widget.js',
  'bower_components/jquery-ui/ui/jquery.ui.mouse.js',
  'bower_components/jquery-ui/ui/jquery.ui.sortable.js'
]
```

Or in the case of [SuitCSS](https://github.com/suitcss) it installs each component into a folder prefixed with suit, so `suit-utils-display`, `suit-grid` etc. These can be gathered up into a single CSS file with the concat task:

```js
'styles/vendor/suit.css': ['bower_components/suit-**/*.css']
```

## That's it

It takes a bit of configuration but for a large site/app it pays to make dependency management as easy as possible. I've reaped the benefits on work projects as well as personal ones.

Try it out and if you find ways to make it more efficient then by all means [let me know](http://twitter.com/blinkdesign).