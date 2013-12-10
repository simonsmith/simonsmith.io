---
title: Speeding things up with sessionStorage
author: Simon
layout: post
permalink: /speeding-things-up-with-sessionstorage/
---
If you pass data between the client and server via Ajax and aren&#8217;t too worried about the content being fresh (perhaps it&#8217;s some static article text) then you might want to consider leaning upon [the DOM Storage API][1] to help speed things up, and in particular, `sessionStorage`.

## What is sessionStorage?

At its most basic level `sessionStorage` is merely an in-memory object that allows you to get, set or remove items.

The key difference is that the data will stick with the user for their current session.

It allows strings of data to be saved, and this includes stringified JSON objects that can then be parsed back into objects when they are retrieved. This usage of `sessionStorage` (and indeed its close friend, `localStorage`) make it extremely useful for caching responses from the server.

### Example

We can easily save some data:

{% highlight js %}sessionStorage.setItem('data', JSON.stringify( {name: 'Simon'} ));{% endhighlight %}

And then grab it again later:

{% highlight js %}var person = JSON.parse(sessionStorage.getItem('data'));{% endhighlight %}

And if we&#8217;re done it can be thrown away:

{% highlight js %}sessionStorage.removeItem('data');{% endhighlight %}

Basics covered.

## Wrapping the API

Nine times out of ten you will find yourself storing and retrieving JSON. It&#8217;s just so damn useful. However one thing I find quite tedious is the constant need to stringify and then parse the storage values.

A way to alleviate the pain is to create a small wrapper object that will sit in front of `sessionStorage` (or `localStorage`, the APIs are identical) and handle it for you. Something a bit like this:

{% highlight js %}var storage = {
    storageAdaptor: sessionStorage,

    // Thanks Angus! - http://goo.gl/GtvsU
    toType: function(obj) {
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    },

    getItem: function(key) {
        var item = this.storageAdaptor.getItem(key);

        try {
            item = JSON.parse(item);
        } catch (e) {}

        return item;
    },

    setItem: function(key, value) {
        var type = this.toType(value);

        if (/object|array/.test(type)) {
            value = JSON.stringify(value);
        }

        this.storageAdaptor.setItem(key, value);
    },

    removeItem: function(key) {
        this.storageAdaptor.removeItem(key);
    }
};{% endhighlight %}

You&#8217;ll notice that the API is exactly the same. It&#8217;s a very simple wrapper and will merely get rid of the hassle of using `JSON.parse` or `JSON.stringify`. We&#8217;ll look at handling browsers that don&#8217;t support `sessionStorage` in a bit.

## Saving Ajax responses

Moving on now, let&#8217;s take a look at an example of saving a response from the server. We&#8217;ll start with a nice and easy click event:

{% highlight js %}$('.a-link').on('click', function(event) {
    loadContent(this.href);
    event.preventDefault();
});{% endhighlight %}

We need something to use as a key for a storage object. You can use what you like here, but for ease the `href` attribute will do fine.

{% highlight js %}function loadContent(href) {
    // Check if we already have the data saved. Using 
    // the wrapper object here so if it does exist 
    // we'll already have a JSON object to use
    var json = storage.getItem(href);

    // If nothing is found in the storage then we'll get 
    // null as the return value.
    // If it's a truthy value then we can assume it's all 
    // good to pass over to our doSomething function
    if (json) {
        doSomething(json);
    } else {
        // Otherwise get the data...
        $.getJSON(href, function(json) {
            doSomething(json);
            // ...aaand remember to save it
            storage.setItem(href, json);
        });
    }
}

function doSomething(json) {
    // Deal with our data regardless of 
    // where it came from
}{% endhighlight %}

The above is quite a crude example, but it demonstrates the idea of extracting the `doSomething` logic into its own function and simply passing the JSON to it.

I implemented something very similar on this site recently. Previously the links to other parts of my portfolio would always request the JSON via Ajax regardless of how many times it had been loaded. If you navigate round now you&#8217;ll start to see pages you previously visited loading instantly. They even survive a refresh!

I really noticed an improvement when loading the site on a mobile device.

If you&#8217;d like to how I hooked it up then [give it a look on GitHub][2]. Suggestions for improvement are welcome :)

## Faking sessionStorage for unsupported browsers

One of the good things about the way `sessionStorage` is implemented is that we can fake a version of it with a simple in-memory object. This means users of browsers without `sessionStorage` can feel some of the benefit, but of course they won&#8217;t see their data persist:

{% highlight js %}var storage;
if (Modernizr.sessionstorage) {
    storage = sessionStorage;
} else {
    storage = {
        items: {},
        getItem: function(key) {
            return this.items[key];
        },
        setItem: function(key, value) {
            this.items[key] = value;
        },
        removeItem: function(key) {
            delete this.items[key];
        }
    }
}{% endhighlight %}

Yeah, it&#8217;s quite crude but simulates the effect nicely.

As an aside, if you don&#8217;t have Modernizr you can perform a simple check for `sessionStorage` with the following:

{% highlight js %}if ('sessionStorage' in window) {  }{% endhighlight %}

If we put our little shim together with the storage wrapper then it makes for nice little utility to carry round to different projects. [Check this gist for a full example][3]. As you can probably see, it would be trivial to swap out `sessionStorage` for `localStorage`.

If you&#8217;re also in need of JSON support then look no further than [Crockford&#8217;s json2.js library][4].

## And we&#8217;re done!

That&#8217;s it. A pretty simple example but I think a lot of sites can benefit from caching some of their data into the browser storage. If you&#8217;d like a more fully-fledged solution then two libraries I can recommend are:

*   [depot.js][5] - Nice for saving thing as records. Supports localStorage/sessionStorage or any object that uses the same API.
*   [amplify.store][6] - Part of the [amplify.js][7] library. Supports the same things as depot.

Go forth and cache.

 [1]: https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Storage
 [2]: https://github.com/simonsmith/simonsmith.io/blob/master/assets/scripts/modules/PageController.js#L53
 [3]: https://gist.github.com/simonsmith/5501430
 [4]: https://github.com/douglascrockford/JSON-js
 [5]: https://github.com/mkuklis/depot.js
 [6]: http://amplifyjs.com/api/store/
 [7]: http://amplifyjs.com/
