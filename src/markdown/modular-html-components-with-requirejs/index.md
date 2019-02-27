---
title: Modular HTML components with RequireJS
date: 2013-07-04
path: "/modular-html-components-with-requirejs"
---

[RequireJS][1] is great, and if you are using or planning on using RequireJS for managing JavaScript then you&#8217;ll really notice the benefits.

However one of the trickier parts of RequireJS greatness is finding a way to organise JavaScript modules across multiple pages and on a more granular level, multiple HTML modules on those pages.

This post won&#8217;t be an intro to [what AMD modules are][2], or even [a RequireJS tutorial][3], as a basic understanding of AMD and RequireJS is assumed but I will break some of the concepts down where necessary.

One of the questions I had early on was:

> How do I organise my code across multiple pages?

This question [does seem to be a popular one][4] and I think one of the reasons is due to many RequireJS tutorials showing everything being initialised inside the `main.js` file and that&#8217;s it. Whilst this works great for single page applications, it doesn&#8217;t help the rest of us with larger, multi-page based sites.

## The goal

So what can we hope to achieve? Well, ideally our solution should:

*   Be able to load common site modules such as jQuery, Handlebars and any others that are needed on all pages.
*   Allow each HTML module to require its JS as it&#8217;s needed, instead of it being based on the page.
*   Be able to build all the dependencies into production ready code [via the r.js node script][5].

## Just a second, modular HTML?

The trend these days is to write modular HTML components. And with good reason.

Removing the tightly coupled nature of HTML and its corresponding CSS can allow developers to easily update, replace or move modules on a page. This is something we&#8217;ve previously found difficult with a more page based approach.

We can see it promoted by things like [OOCSS][6], [SMACSS][7], [BEM][8] and even [Bootstrap][9].

If an HTML module is a self contained unit on the page, then it can be quite common for these modules to require scripts to control their behaviour. A carousel module is a prime example. If the need to move the carousel arose, then ideally we should be able to do so without re-writing CSS and adjusting where scripts are included.

So we&#8217;re taking the idea of [page specific JS modules][10] a little further and instead using HTML module specific JS.

## Kicking things off with main.js

A lot of RequireJS examples and tutorials will talk about using a `main.js` file to kick off the loading and initialisation of your scripts. We&#8217;ll be making use of `main.js` to load just the core modules and libraries for all pages of our site

It&#8217;s not unusual to start with something like this in the page head:

``` html
<script src="scripts/components/requirejs/require.js" data-main="scripts/main"></script>
```

Once the RequireJS library has loaded it will look for the `data-main` attribute and attempt to load it asynchronously. In this case, our `main.js` file.

### Inside main.js

In almost all cases RequireJS will need some configuration options, so it makes sense that the first line of `main.js` is a call to `require.config()`. The API documentation has a [wonderfully comprehensive overview of all the options][11], so I won&#8217;t delve into it here. Let&#8217;s instead continue with a basic example:

``` js
require.config({
    baseUrl: 'scripts',
    paths: {
        jquery:     'components/jquery/jquery',
        domready:   'components/requirejs-domready/domReady',
        handlebars: 'components/handlebars/handlebars'
    },
    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        'jquery.pluginA.js': ['jquery'],
        'jquery.pluginB.js': ['jquery']
    }
});
```

So what are we doing here?

First we&#8217;re setting a `baseUrl` to the scripts folder, then letting RequireJS know where our libraries are with the `paths` option (compulsory when using jQuery as [it is a named module][12]) and then shimming any scripts that do not have AMD support. This is common with most jQuery plugins.

### Loading core modules and libraries

Just beneath the `require.config()` is where all our core libraries are required, and also any modules that you might want to load and initialise on every page. Keeping it simple again:

``` js
require(['jquery', 'handlebars'], function() {});
```

Seeing as we&#8217;re just loading these libraries (our modules will actually use them) we can leave the callback empty.

However, you might find that some modules *do* need to initialise here as they are used on every page (a navigation dropdown for example) and in that case I suggest using `define`, purely to take advantage of [the sugar syntax][13].

``` js
define(function(require) {
    var $        = require('jquery');
    // domReady would be necessary at this point as this module
    // may load before the page is ready
    var domReady = require('domready');
    var Nav      = require('modules/Navigation')
                   require('handlebars');

    domReady(function() {
        // Init common module code here
        new Nav($('#nav'));
    });
});
```

This is functionally the same as the following:

``` js
define(['jquery', 'handlebars', 'domready', 'modules/Navigation'], function($, Handlebars, domReady, Nav) {
    // etc
});
```

I prefer the sugar syntax when requiring multiple modules and interacting with them. It makes for a nicer read and also doesn&#8217;t rely on exact argument order in the callback. However, it&#8217;s totally up to you.

> One common pattern is to move the `define` call [into an app.js][14] that will return a module with an `init` function, and then [have main.js `require` that file][15] and instantiate it.

So, where are we at the moment?

We have jQuery and Handlebars required in our `main.js` file and the file structure looks a little like this:

![](img1.png)

And if we load the page our two core or main modules should be fetched.

![](img2.png)

## Creating an HTML module

We&#8217;ll use an incredibly crude carousel (and by crude I mean it isn&#8217;t even a carousel) to demonstrate how a typical RequireJS module can be organised

``` html
<div class="carousel">
    <!-- Carousel markup -->
</div>
```

If this were a real carousel and all the HTML and CSS were in place, then it would also need some JS. We&#8217;ll create a `Carousel.js` module now, and place it in a directory such as `scripts/modules`.

The modules folder will be where our AMD modules will be stored. So think of this as the directory that stores all the JS modules for your site.

To spice things up we&#8217;ll also make an assumption that this carousel relies on two other jQuery plugins to function. These will be found in `scripts/plugins`.  You may have noticed I referenced these in the `shim` configuration earlier.

We&#8217;ll use the plugins directory for (you guessed it) any plugins and other third party code that we need, but haven&#8217;t authored ourselves.

> If you&#8217;re getting a bit lost with all the files and modules that are being referenced then [have a look at this repository][16] with the examples used in this post.

## Carousel.js

Inside our Carousel.js file we have a sort of pseudo module for example&#8217;s sake. It will accept a reference to a jQuery object and set some text on it, just so we can see the module loading in the page. You can use your imagination here as to how this might work with a more fully-fledged carousel module:

``` js
define(function(require) {
    // Ensure jQuery is required as it will likely be used in the carousel
    var $ = require('jquery');

    // jQuery plugins just augment the $.prototype and therefore
    // don't need to return anything. So these don't need to be assigned
    // to a variable
    require('plugins/jquery.pluginA');
    require('plugins/jquery.pluginB');

    // Define an object and then return it for instantiation later
    var Carousel = function(element) {
        element.append('Carousel module loaded!');
    };

    Carousel.prototype = {

    };

    return Carousel;
});
```

You can see that I&#8217;m using the sugar syntax that was mentioned earlier and then simply requiring jQuery, some plugins, and then returning a Carousel object as the definition of the module.

### Using the Carousel module

Using require we can request and initialise our Carousel module:

``` js
require(['jquery', 'modules/Carousel'], function($, Carousel) {
    new Carousel($('.carousel'));
});
```

In the above example we are passing a jQuery object into the Carousel constructor. To ensure that the `$` is available for use, jQuery is required as a dependency here as well.

*But didn&#8217;t it just get declared as a dependency by Carousel?*

Yes it did, and it most cases it will probably work because jQuery still registers itself globally even when used as an AMD module.

However this is not normal behaviour, and it&#8217;s worth remembering that modules execute in order, but are loaded as soon as possible, so it&#8217;s a good practice to always explicitly declare dependencies every time you need them and not rely on things loading by chance.

Additionally, a module will only load once so there is no harm in multiple require calls to it.

Now if we simply place that code in a script element beneath the carousel HTML module, you might expect everything to work

``` html
<div class="carousel">
    <!-- Carousel markup -->
</div>
<script>
    require(['jquery', 'modules/Carousel'], function($, Carousel) {
        new Carousel($('.carousel'));
    });
</script>
```

But we actually get a console error:

![](img3.png)

If you remember from earlier, we told RequireJS where to find our version of jQuery by using the paths configuration option. In this case RequireJS has attempted to load jQuery and our Carousel module <em>before</em> the <code>main.js</code> file has loaded. This means that the config options have not been read yet and therefore an error is shown.

## Waiting for main.js to be ready

They way to solve this is to ensure that main is loaded and ready before requesting the Carousel module. We can achieve this by simply wrapping the modules&#8217; `require` call in another `require`:

``` js
require(['main'], function() {
    require(['jquery', 'modules/Carousel'], function($, Carousel) {
        new Carousel($('.carousel'));
    });
});
```

Now any of the modules relied on in `main.js` will already be loaded and ready for use.

## Preparing for the build tool

Although dropping the above code beneath the module has worked, having it between two script tags makes it impossible for the `r.js` build tool to assist later on. To work around this, the code that requires the modules also needs to go into a JS file.

I usually create a directory called page to serve this purpose, but really the name can be anything as long as your AMD modules are separate.

Now the directory structure is looking a little like this:

![](img4.png)

By dropping the code into `carousel.js` (lowercase to signify the difference) the HTML page can simply `require` that file:

``` html
<div class="carousel">
   <h2>Carousel module</h2>
</div>
<script>require(['page/carousel']);</script>
```

The HTML module is a lot cleaner without the JS code littered amongst it, and now the build tool can be brought in to help.

## Optimisation with r.js

The goal of the build tool is to work out the dependency chains and then compile the modules into one (or more) files that can then be served to production.

Ideally we need `page/carousel.js` to contain `Carousel.js`, `jquery.pluginA.js` and `jquery.pluginB.js`, but leave out jQuery.

### Installing r.js

The simplest way is to install it as a global module via npm:

    npm install -g requirejs

Then you can either pass it configuration options on the command line or (the way I prefer) pass it a single configuration file:

    r.js -o build.js

### Configuring the build tool

Before going any further I must point out [example.build.js][17] over in the r.js repo. It&#8217;s a heavily commented example file that makes it very clear what all the build options do. I tend to only use a handful.

The build file I used with this example can be found in [the GitHub repo][18], but I&#8217;ll go over two of the important options.

#### Reusing the config options

    mainConfigFile: 'site/scripts/main.js'

The build tool is smart enough to be able to reuse your configuration options. By ensuring that `require.config()` is the first thing in `main.js`, we can simply point the build tool there and avoid having to retype all the paths and shim options.

> If specified with the path to your main JS file, the first `requirejs({}), requirejs.config({}), require({}), or require.config({}) `found in that file will be parsed out and used as part of the configuration options passed to the optimizer &#8211; [Source][19]

#### Configuring modules

One of the slight pains of the whole process is manually configuring the modules on the site, however, this step is crucial for creating a correctly built output.

Each entry in the modules array will mean r.js will attempt to create that module with all its dependencies included. Using the `include` and `exclude` properties will allow you to ensure modules aren&#8217;t accidentally included twice or left out completely.

``` js
modules: [
    {
        name: 'main'
    },
    {
        name: 'page/carousel',
        exclude: ['main']
    }
]
```

By setting the `findNestedDependencies` property to `true` it means that r.js will pick up the `require` calls within the `require(['main'])` call. If this property wasn&#8217;t used then the module would need to be explicitly declared with `include`.

## Reviewing the built output

Upon completion, r.js will output a summary of what files were built and what modules were included. This is a great way to ensure you haven&#8217;t missed anything, or duplicated a module.

I find it useful to set up a build script early on in the process and run it occasionally to ensure everything is being included correctly:

```bash
scripts/main.js
----------------
scripts/components/jquery/jquery.js
scripts/components/handlebars/handlebars.js
scripts/components/requirejs-domready/domReady.js
scripts/main.js

scripts/page/carousel.js
----------------
scripts/page/carousel.js
scripts/plugins/jquery.pluginA.js
scripts/plugins/jquery.pluginB.js
scripts/modules/Carousel.js
```

One thing to mention is that by breaking things up into modules of code (carousel.js, nav.js etc) there are going to be more HTTP requests made than if it was all in one file.

Even though these modules are optimised they still exist as separate JS files, albeit far fewer than if you hadn&#8217;t run the build tool at all.

Personally I think this minor performance hit is worth taking, considering what it pays back in ease of maintenance. The JS files are still loaded asynchronously, so there should be minimal impact of page rendering speed.

## Final steps

Depending on what config options you used, you might end up with a copy of the site directory with all the built scripts included, or you might have just built the scripts directory on its own.

Deploying the site with the built scripts is often decided by platform choice and other environment restrictions, but I use [Grunt JS][20] to handle the building of the modules and copying of script directories etc.

### That&#8217;s about it

I hope that sheds some light on some of the benefits RequireJS brings, and how to use it.

## Useful links

*   [Example code used in this post][16]
*   [Multi page example from the RequireJS repo][10]
*   [Same as above, but with shim configuration examples][21]
*   [Build tool for Grunt JS][22]
*   [Addy Osmani&#8217;s post on modular JS][2]

*Thanks to [@jrburke][23] for feedback on this post*

 [1]: http://requirejs.org/
 [2]: http://addyosmani.com/writing-modular-js/
 [3]: http://requirejs.org/docs/api.html#usage
 [4]: http://stackoverflow.com/questions/10815454/how-does-requirejs-work-with-multiple-pages-and-partial-views
 [5]: http://requirejs.org/docs/optimization.html
 [6]: http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/
 [7]: http://smacss.com/
 [8]: http://coding.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/
 [9]: http://twitter.github.io/bootstrap/components.html#media
 [10]: https://github.com/requirejs/example-multipage
 [11]: http://requirejs.org/docs/api.html#config
 [12]: http://requirejs.org/docs/api.html#modulename
 [13]: http://requirejs.org/docs/whyamd.html#sugar
 [14]: https://github.com/simonsmith/flight-demo/blob/master/app/app.js
 [15]: https://github.com/simonsmith/flight-demo/blob/master/app/main.js
 [16]: https://github.com/simonsmith/modular-html-requirejs
 [17]: https://github.com/jrburke/r.js/blob/master/build/example.build.js
 [18]: https://github.com/simonsmith/modular-html-requirejs/blob/master/build.js
 [19]: http://requirejs.org/docs/optimization.html#basics
 [20]: http://gruntjs.com
 [21]: https://github.com/requirejs/example-multipage-shim
 [22]: https://github.com/gruntjs/grunt-contrib-requirejs
 [23]: https://twitter.com/jrburke