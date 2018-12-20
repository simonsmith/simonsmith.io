---
title: An introduction to SUIT CSS
date: 2015-05-22
type: post
published: false
---

CSS has always had a bit of a bad reputation for quickly descending into a tangled mess of code. Reuse and maintenance often becomes tricky on large web projects due to the global nature and cascade of CSS.

Thankfully many smart people have seen the light and we have things like Web Components (that bring us true encapsulation) and also methodologies like BEM and OOCSS to assist with naming.

In this post I'd like to delve into how SUIT CSS approaches this problem and how you can use it to architect a modular UI.

## What is SUIT CSS?

[SUIT CSS](http://suitcss.github.io/) is a methodology for writing component based user interfaces based on [BEM](https://en.bem.info/method/definitions/). It has a set of rules and guidelines on how to structure HTML and CSS, a collection of useful components and utilities and a set of build tools.

It was created by [Nicolas Gallagher](http://nicolasgallagher.com/) and is used on [Twitter](http://twitter.com), [Segment](https://segment.com/) and a few others.

## But first, how I used to write HTML and CSS

Back in the day I would scoff at the idea of using classes for everything. "It's not semantic!" I would cry, leading to things like this:

``` html
<div id="news-post">
  <h2>A new post</h2>
  <div class="content">
    <!-- Content -->
  </div>
</div>
```

``` css
#news-post {
  background-color: #ddd;
}

#news-post h2 {
  font-size: 20px;
}

#news-post .content {
  padding: 10px;
}
```

### What's wrong?

Although it's a simple example, there a few issues that can be identified.

#### Lack of reuse

What if there is a post that isn't news, like a blog? How about needing more than one news post on a page?

#### Specificity

Now that an `id` has been thrown into the mix it becomes trickier to override later on.

#### Cohesion

It's not all that clear what things are supposed to belong together. Can `.content` work elsewhere, or just with `#news-post`? The boundaries are not obvious

## Striving for a modular approach

Ideally each part of the UI would be a separate component, using them as Lego blocks to build more complex interfaces. Each component knows how to represent itself visually and doesn't have any knowledge of other components. Then it's up to a parent component to worry about how they all fit together, like a grid.

Aiming to reach this goal of encapsulation makes it easy to reuse components and maintain them without fear of affecting other parts of our application.

From the [SUIT documentation](https://github.com/suitcss/suit/blob/master/doc/design-principles.md):

> Each component should have a single focus and contain everything necessary to realise a specific part of the UI. Components may contain HTML, CSS, JavaScript, and associated assets without making assumptions about the outer rendering context. Components do not have direct influence over each other.

If you've worked with [React](https://facebook.github.io/react/) then this may sound like familiar ground, and it is. SUIT works perfectly with component based JS frameworks like React, Ember, and Flight.

Let's try the previous example again:

``` html
<div class="Post Post--news">
  <h2 class="Post-header">A new post!</h2>
  <div class="Post-body">
    <!-- Content -->
  </div>
</div>
```

``` css
.Post {
  background-color: #ddd;
}

.Post--news {
  border-radius: 2px;
}

.Post-header {
  font-size: 20px;
}

.Post-body {
  padding: 10px;
}
```

Our component is now more clearly defined. The HTML shows us where the boundaries lie and all the descendant elements that are associated with it

The CSS accompanies the HTML nicely by keeping the specificity low and maintenance simple. No more fighting the cascade.

Also the choice of `Post` as the name means this component can easily accommodate different content types should we require it.

If you've spent any time playing with BEM then this should feel very familiar. It has "blocks", "elements", and "modifiers" whilst SUIT calls them "components", "descendants", and "modifiers". The [documentation](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) covers these naming conventions in greater detail.

## What's in the toolbox?

As useful as the naming conventions are SUIT also offers a set of components, some utility classes and build tools built on [Rework](https://github.com/reworkcss/rework) (although this has been superseded by [PostCSS](https://github.com/postcss/postcss)).

### Components

SUIT only comes with [a handful of components](https://github.com/suitcss/components) and they don't prescribe to a certain visual style as you may expect if you're used to a framework like [Bootstrap](http://getbootstrap.com/components/). They are intended to be used as a base for you to build upon and mix with your own application specific components, and this in turn means they are fairly lightweight.

Carrying on from the earlier example, we could easily position two `Post` components adjacently by making use of the [SUIT Grid component](https://github.com/suitcss/components-grid/):

``` html
<div class="Grid">
  <div class="Grid-cell u-size1of2">
    <div class="Post Post--news">
      <!-- ... -->
    </div>
  </div>
  <div class="Grid-cell u-size1of2">
    <div class="Post Post--news">
      <!-- ... -->
    </div>
  </div>
</div>
```

This also demonstrates why components should not concern themselves with positioning. Here we are leaving that responsibility to the `Grid` which means we can easily reuse `Post` in a different context.

### Utilities

[Utilities](https://github.com/suitcss/utils) provide a way of reusing common patterns across components, such as clearing floats or overriding positioning:

``` html
<div class="Tweet u-cf">
  <a class="u-sizeFit" href="{{url}}">
    <img class="u-block" src="{{src}}" alt="">
  </a>
  <p class="Tweet-text u-sizeFill u-textBreak"></p>
</div>
```

SUIT provides a good collection of useful utilities already, but as your codebase grows it's common to extract repeated patterns into your own collection.

The [documentation](https://github.com/suitcss/suit/blob/master/doc/utilities.md) goes into further detail on why and how to use them.
