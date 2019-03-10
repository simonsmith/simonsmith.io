---
title: Writing AMD compatible plugins for jQuery
date: 2012-12-21
path: "/writing-amd-compatible-plugins-for-jquery"
draft: false
---

I&#8217;ve been tinkering with jQuery a lot these days. My love for [the Moo][1] is still strong, but I like switching around from time to time. I also find myself using [RequireJS][2] for almost every project big or small and I decided to find a nice way to write jQuery plugins that work with AMD or without.

## Straight to the point

The code doesn&#8217;t require a massive amount of explanation

``` js
// UMD dance - https://github.com/umdjs/umd
!function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(root.jQuery);
  }
}(this, function($) {
  'use strict';

  // Default options
  var defaults = {

  };

  // Constructor, initialise everything you need here
  var Plugin = function(element, options) {
    this.element = element;
    this.options = options;
  };

  // Plugin methods and shared properties
  Plugin.prototype = {
    // Reset constructor - http://goo.gl/EcWdiy
    constructor: Plugin,

    someMethod: function() {

    }
  }

  // Create the jQuery plugin
  $.fn.plugin = function(options) {
    // Do a deep copy of the options - http://goo.gl/gOSSrg
    options = $.extend(true, {}, defaults, options);

    return this.each(function() {
      var $this = $(this);
      // Create a new instance for each element in the matched jQuery set
      // Also save the instance so it can be accessed later to use methods/properties etc
      // e.g.
      //    var instance = $('.element').data('plugin');
      //    instance.someMethod();
      $this.data('plugin', new Plugin($this, options));
    });
  };

  // Expose defaults and Constructor (allowing overriding of prototype methods for example)
  $.fn.plugin.defaults = defaults;
  $.fn.plugin.Plugin = Plugin;
});
```

##  Using the plugin

For non-AMD users they can just use the plugin the same way they always have:

``` js
$('.test li').plugin({
  test: 'option1',
  test2: 'option2'
});
```

Hot sauce AMD users have a familiar experience but without a need to use shim:

``` js
require(['jquery', 'jquery.plugin'], function($) {
  $('.test li').plugin({
    test: 'option1',
    test2: 'option2'
  });
});
```

This is just something I came up with whilst fiddling around. Some [ideas for improvements are welcomed][3].

 [1]: http://mootools.net
 [2]: http://requirejs.org
 [3]: https://gist.github.com/4353587