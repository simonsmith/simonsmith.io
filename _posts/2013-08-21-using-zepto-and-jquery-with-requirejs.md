---
title: Using Zepto and jQuery with RequireJS
author: Simon
layout: post
permalink: /using-zepto-and-jquery-with-requirejs/
---
On a site I&#8217;m currently developing I started to realise just how much JS was being downloaded by the user. One of the quickest wins to be made in this scenario is to reduce the overhead of any JS libraries that are being used.

After a quick check I decided I only really need nice and easy DOM manipulation, Ajax and event handling &#8211; a common requirement.

This post will cover how to get [RequireJS][1] working with [Zepto.js][2], using [jQuery][3] as a fallback for IE (Zepto refuses to work, even in recent versions) and how to build it all with the [r.js optimiser][4].

## Zepto

The seemingly obvious thing to do first is grab a custom version of jQuery 2.0, but even after removing nearly all the optional modules it still didn&#8217;t seem *that* small. It also leaves IE8 support out of the equation and I feel like I can do better.

After learning that Zepto also [allowed custom builds][5], I was sold. For the few basics that I often require from a JS lib it means I can achieve a really small file size.

## $.ajax and Promises

The first bump in the road I encountered is the lack of support for Deferreds in Zepto ([at least for now][6]), and most notably the ability to use Promises with `$.ajax`. This means that if jQuery code is written to work with them it will fail when swapped over to Zepto. The code written against one library needs to be interchangeable with the other.

I came up with two solutions:

1.  Don&#8217;t include Ajax in the Zepto/jQuery build and instead use a different library entirely, such as [Reqwest][7].
2.  Include [Simply Deferred][8], a small library that uses the jQuery API for Deferreds and allows it to be easily dropped in to Zepto

The first option is simple, but I&#8217;ll cover how I used the second option at the end.

## Configuring RequireJS

The key to making this work comes from the `map` configuration option in RequireJS. All the modules will ask for Zepto as normal:

{% highlight js %}define(function(require) {
    var $ = require('zepto');

    return {
        html: '<p>moduleB loaded</p>'
    };
});{% endhighlight %}

Nothing special here.

However by using the `map` config, all calls for Zepto can be directed to a *different* module. It is here that the decision on what library to load is made.

### Using the map configuration

{% highlight js %}map: {
    '*': {
        'zepto': 'zepto-custom'
    },
    'zepto-custom': {
        'zepto': 'zepto'
    }
},{% endhighlight %}

The first config object here is saying *&#8220;If **any** module asks for the `zepto` module, instead load the `zepto-custom` module&#8221;* and the second config option essentially overrides this for the `zepto-custom` library to avoid cyclic dependencies.

> The RequireJS documentation [makes use of this technique][9] for using jQuery with `.noConflict()`

What this allows is for all requests to Zepto to be routed through to `zepto-custom.js` (the name is not really important), which looks a little like this:

{% highlight js %}define(('__proto__' in {} ? ['zepto'] : ['jquery']), function($) {
    return $;
});{% endhighlight %}

Here a simple check is made to see if the browser will work with Zepto (basically, anything but IE) and the dependency to load is decided by the result. Just to add, this is the recommended way to check for Zepto compatiabilty via the documentation.

If the page is loaded it will request either jQuery or Zepto depending on the browser. Ultimately, because both libraries share the same API so it should be a seamless transition.

## The build tool

So far the process has been quite simple. Packaging up everything for deployment via r.js is often the real test.

Typically just jQuery is used on a site. This means that it can be built together with all the other modules used by the site and deployed as one minified file. However, in this situation it becomes necessary to keep jQuery and Zepto separate from the main build of JS files. On top of this, the `zepto-custom` module also needs to be kept separate as the build tool does not play nicely with the conditional check as a first argument to `define()`.

This does mean that two more HTTP requests have been introduced, but the flipside is the size of the JS has potentially been reduced by quite a margin for most users. Like all things in front-end development, it&#8217;s a balancing act.

Fortunately the build configuration is incredibly simple. The only thing to pay attention to are the module options to ensure `zepto-custom` is excluded:

{% highlight js %}modules: [
    {
        name: 'main',
        exclude: ['zepto-custom']
    }
]{% endhighlight %}

For an idea of how this works with a few modules you can [check out this config][10].

## Using $.Deferred

To make this work will require an additional library known as [Simply Deferred][8]. It provides a handy API for installing it into Zepto.

Now the `zepto-custom` module looks a little different:

{% highlight js %}if ('__proto__' in {}) {
    define(['zepto', 'deferred'], function(Zepto, Deferred) {
        Deferred.installInto(Zepto);
        return Zepto;
    });
} else {
    define(['jquery'], function(jQuery) {
        return jQuery;
    });
}{% endhighlight %}

It&#8217;s a little tricker to share one callback this time, so I found it more readable to have two `define()` functions. Again, this is something the r.js tool will not be fond of so it can&#8217;t be part of the build.

I actually use the above technique on this site (the JS was already written to use `$.ajax` Promises) so you can also [check the code on GitHub][11] for a working example.

## Wrapping up

The code for the examples in this post can be found in [this GitHub repository][12], including the necessary `path` and `shim` configuration options.

This solution to loading Zepto and jQuery is something I thought up the other day and I can imagine there will be many ways to improve it.

I would welcome any comments/examples via Twitter.

 [1]: http://requirejs.org
 [2]: http://zeptojs.com
 [3]: http://jquery.org
 [4]: http://requirejs.org/docs/optimization.html
 [5]: https://github.com/madrobby/zepto#building
 [6]: https://github.com/madrobby/zepto/issues/353
 [7]: https://github.com/ded/reqwest
 [8]: https://github.com/sudhirj/simply-deferred
 [9]: http://requirejs.org/docs/jquery.html#noconflictmap
 [10]: http://pastebin.com/pq8b5sdu
 [11]: https://github.com/simonsmith/simonsmith.io/blob/master/assets/scripts/main.js
 [12]: https://github.com/simonsmith/requirejs-zepto-jquery
