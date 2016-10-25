---
title: Decoupling with custom jQuery events
date: 2013-07-09
---

While the concept of [custom events in jQuery][1] may not be a new one, I tend to only see them used amongst plugins, mainly to keep their events namespaced for fear of collusion with other events.

The truth is they can be leveraged in everyday jQuery code to help make life a little easier.

## The problem

It&#8217;s not uncommon to see a single event handler finding itself responsible for many things:

``` js
$('.add-items').on('click', function(event) {
  $('.loading-message').show();

  $.ajax({
      // etc
  });

  $('.something-else').addClass('foo')

  event.preventDefault();
});
```

Having an event handler responsible for a lot of different tasks will typically result in large, incoherent event callbacks. These can often get worse when other developers have to add in additional functionality later.

## Decoupling all the things

One route I like to take is to separate the logic relating to the DOM event.

This means just handling anything relating to the event (`preventDefault` or `stopPropagation` calls, for example) and then firing a custom event and allowing another part of the application handle the &#8216;business&#8217; side of things:

``` js
var doc = $(document);

$('.add-items').on('click', function(event) {
  doc.trigger('addItem', [$(this)]);
  event.preventDefault();
});
```

The first thing to note is that I&#8217;m grabbing a reference to the document wrapped as a jQuery object:

``` js
var doc = $(document);
```

By triggering the events on this global object, it can become a sort of mediator between other parts of code.

Storing a reference to it outside of the event handler callback also means that it won&#8217;t be created each time the button is clicked. This is a good practice to get in the habit of.

Then all that is required is to trigger an event of our choice and pass any useful data along with it.

``` js
doc.trigger('addItem', [$(this)]);
```

An object or array can be passed along with the event. In this case I&#8217;m passing along a jQuery object that refers to the clicked button.

## Responding to the event

Listening for the `addItem` event is as simple as creating an event listener on the `document` object:

``` js
$(document).on('addItem', function(event, btnElement) {
  $('.something-else').addClass('foo')
});

$(document).on('addItem', function(event, btnElement) {
  $.ajax({
      // etc
  });
});
```

> The event object in the above callback handlers are related to the `addItem` custom event and have nothing to do with the earlier click event.

Now the logic is nicely separated, and additional chunks of functionality can be added or removed without any need to worry about the other parts of the application.

And seeing as the global `document` object was chosen to be the mediator, these events can be attached in other places (perhaps a different file completely) without any extra effort.

It seems like a bit more work initially, but as the code expands, this way of decoupling events will start to pay back in droves.

## Taking it a step further with Flight

If this technique takes your fancy then I strongly advise you to give [Twitter&#8217;s Flight library][2] a look. It builds upon the concept of using jQuery events to decouple modules of code, but adds on a plethora of other nice features. Plus it&#8217;s developed by some of the smartest JS developers around.

It&#8217;s also very easy to integrate into existing code bases, compared to switching to something more fully-fledged like Ember or Backbone.

I&#8217;ve also set up [a crude little demo][3] if you&#8217;d like to tinker.

 [1]: http://api.jquery.com/trigger/
 [2]: http://flightjs.github.io/
 [3]: http://jsfiddle.net/Blink/vRWRc/