---
title: CSS inherit property
date: 2012-04-13
type: post
---
The CSS `inherit` property is one of those basic things that tends to get overlooked for some of the more glitzy CSS3 effects, but I just wanted to show a quick example of a common use that might help your day to day CSS antics.

Essentially the inherit property forces a child element to use (or inherit) its parent properties on a specific value. You might think that this happens automatically but one common example where this isn&#8217;t applied is changing the colour of an `<a/>` element.

``` html
<div class="wrap">
  <a href="#">Oh hai, a link</a>
</div>
```

``` css
.wrap {
  color: red;  /* My link didn't change */
}
```

The link would still be it&#8217;s original (usually ugly blue) colour and a common pattern is to now write a separate declaration to target the `<a/>` and repeat the colour again. A cleaner workaround is to force the `<a/>` to inherit the red colour applied to its parent like so:

``` css
.wrap {
  color: red;
}
.wrap a {
  color: inherit;
}
```

A very slight change, but it saves you repeating the same value