---
title: Headless testing with Jasmine, PhantomJS and Grunt
date: 2014-02-05
draft: true
---

It's hard to find a good excuse _not_ to test your JavaScript these days. Previously it was a pain to write unit tests. One had to wire up an HTML spec runner page, include various dependencies and then manually refresh the page to see the test results. Whilst this was bearable it certainly made automation a pain.

Nowadays we have a [headless](http://phantomjs.org/headless-testing.html) browser option known as [PhantomJS](http://phantomjs.org/) and combined with [Grunt](gruntjs.com) as a taskrunner it makes testing a breeze.

In this post I'll look at [Jasmine](http://pivotal.github.io/jasmine/) (one of the most popular testing frameworks) and how it can be used to test some simple JS as well as a jQuery plugin.

## A few prerequisites

An understanding of Grunt is assumed. With that in mind the first thing to do is grab the [Jasmine plugin](https://github.com/gruntjs/grunt-contrib-jasmine)

```js
npm install grunt-contrib-jasmine --save-dev
```

I'll also be using [Bower](http://bower.io) in this post, but if you don't mind fetching libraries manually then it won't be compulsory.

## Starting simple

To begin, let's take a look an incredibly simple constructor function:

``` js
function Foo(name) {
  this.name = name;
}

Foo.prototype.sayHi = function() {
  return this.name + ' says hi!';
};
```

When an instance of `Foo` is created it can be used to say hi:

``` js
var foo = new Foo('Simon');
foo.sayHi(); // Simon says hi!
```

It would be nice to verify that this worked, so using Jasmine we'll write a simple spec for it.

``` js
describe('Simple object', function() {
  var foo;

  beforeEach(function() {
    foo = new Foo('John');
  });

  it('should say hi', function() {
    expect(foo.sayHi()).toEqual('John says hi!');
  });
});
```

It's often good practice to keep the specs separate to the actual code that is being tested. For the purpose of this post the specs will be listed under a `test` directory and the source code in `scripts` but you can use whatever suits best.

```bash
├── scripts
│  └── simple-object.js
└── test
   └── simple-object.spec.js
```

## Wiring up the Grunt task

The actual config of the Jasmine task is wonderfully terse. Just a couple of directory paths are required:

``` js
jasmine: {
  test: {
    src: 'scripts/*.js',
    options: {
        specs: 'test/*.spec.js'
    }
  }
}
```

```js
grunt jasmine
```

If all goes well we should see a message confirming the tests have passed

![](/images/posts/headless-testing-with-phantomjs-and-grunt/simple-test-result.png)

At this moment in time, 100% code coverage!

## Testing jQuery

jQuery is primarily a DOM manipulation library and so a lot of the time the code written with it will interact with and alter DOM elements in some way. How can we test for those kind of scenarios?

An easy way is to use the excellent [jasmine-jquery](https://github.com/velesin/jasmine-jquery) extension. It provides a set of custom matchers (things like `toBeVisible()` and `toHaveClass()`) as well as allow a simple way to load HTML fixtures to test against.

But first we'll write the most useless plugin in the world. It simply adds a class and sets some text content:

``` js
!function($) {
  var defaults = {
    'classes': 'my default classes',
    'text':    'Some default text'
  };

  $.fn.plugin = function(options) {
    options = $.extend(true, {}, defaults, options);

    return this.each(function() {
      $(this).addClass(options.classes).text(options.text);
    });
  }
}(jQuery);
```

At this point we will need a copy of [jQuery](https://github.com/jquery/jquery) and [jasmine-jquery](https://github.com/velesin/jasmine-jquery) to aid with our specs. The easiest way to get hold of these is via Bower:

    bower install jquery jasmine-jquery --save-dev

Once the files are downloaded they will need to be included in our Gruntfile:

``` js
jasmine: {
  test: {
    src: 'scripts/*.js',
    options: {
      vendor: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
      ],
      specs: 'test/*.spec.js'
    }
  }
}
```

### The plugin spec

Now to test it

``` js
jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('jquery plugin', function() {
  var elem;

  beforeEach(function() {
    loadFixtures('example.html');
    elem = $('.my-element');
  });

  it('should add default classes to the element', function() {
    elem.plugin();
    expect(elem).toHaveClass('my default classes');
  });

  it('should add default text to the element', function() {
    elem.plugin();
    expect(elem).toHaveText('Some default text');
  });

  it('should add add custom classes to the element', function() {
    elem.plugin({ 'classes': 'my custom classes' });
    expect(elem).toHaveClass('my custom classes');
  });

  it('should add add custom text to the element', function() {
    elem.plugin({ 'text': 'Hello' });
    expect(elem).toHaveText('Hello');
  });
});
```

The spec is pretty straight forward but what is interesting to note is the call to [`loadFixtures`](https://github.com/velesin/jasmine-jquery#html-fixtures). This makes a synchronous Ajax request, loads the content of an HTML file, injects into a container in the DOM and then cleans it up between each test. This HTML is required for the tests to run against.

In this case it's very simple (`<div class="my-element"></div>`) but for more complicated plugins, such as slideshows, it makes it very easy to organise test markup and keep it separate from the JS.

### Organisation

Once again we'll follow the practice of separating code and tests but this time also create a sub-directory for the HTML fixtures. You may need to adjust the fixtures path as I have done in the above example.

```bash
├── scripts
│  ├── jquery-plugin.js
│  └── simple-object.js
└── test
   ├── fixtures
   │  └── example.html
   ├── jquery-plugin.spec.js
   └── simple-object.spec.js
```

And hopefully the tests will pass

![](/images/posts/headless-testing-with-phantomjs-and-grunt/plugin-passed.png)

And there you have the very basics of testing a plugin.

## Wrapping up

Hopefully that has shed some light on how useful headless browser testing is. Not only is it less hassle than refreshing a browser but it can also be used with a [CI like Travis](https://travis-ci.org/).

If Mocha is more your thing then I can recommend [grunt-mocha-phantomjs](https://github.com/jdcataldo/grunt-mocha-phantomjs). It works much the same as Jasmine but I couldn't find a way to test HTML fixtures with the ease that jasmine-jquery provides.

For an even more fully featured solution consider the [Karma test runner](http://karma-runner.github.io/0.10/index.html) written by the Angular team. It uses Jasmine and PhantomJS but supports end to end testing as well as the ability to attach multiple browsers to one suite of tests.

The source code for this post is also [available on GitHub](https://github.com/simonsmith/headless-testing-phantomjs-grunt).

Happy testing!