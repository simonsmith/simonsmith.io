---
title: Controlling CSS rems with Sass and LESS (sort of)
date: 2013-02-19
type: post
---

Everyone knows that `ems` are great for responsive design. All that relative sizing juiciness goes hand in with flexible layouts but some of the annoyances make reaching for pixels the more favourable option.

## My two main gripes with ems

1.  They inherit parent `em` sizing and make calculating the resulting size a pain
2.  It can be tough to work out what `14px` is equal to in `ems`

Fortunately, these are both easily fixed.

## Use rems

Basically `rems` are the same as `ems` but are all calculated from the root (`html`) element. That means any level of nesting and parent `em` values won&#8217;t get in the way. Just set `1rem` (for example) on the `html` element and you&#8217;re done. [Browser support has been the main factor in holding back `rem` adoption][1] (Hi, IE8) but [fortunately there are workarounds][2] if you don&#8217;t mind a minor JS hit.

## Converting pixels to rems

Once you have an easy way to convert pixel values to `rems` then it&#8217;s a breeze to use them for paddings, margins etc and not just font sizes. In [Responsive Web Design][3], Ethan Marcotte came up with a nice way to solve this:

> `target ÷ context = result`
>
> So with our formula in hand, let’s turn back to that 24px headline. Assuming that our base font-size: 100% on the body element equates to 16px, we can plug those values directly into our formula. So if we need to express our h1’s target font size (24px) relative to its context (16px), we get:
>
> `24 ÷ 16 = 1.5`
>
> And there we are: 24px is 1.5 times greater than 16px, so our font-size is 1.5em

With that in mind we can devise a simple Sass function to take care of this for us:

``` css
@function px($num) {
    @return ($num / 16) + 0rem; /* Adding 0rem here causes the output to be nrem instead of just n */
}

.some-selector {
    font-size: px(26); /* font-size: 1.625rem */
    margin: px(18) px(18); /* margin: 1.125rem 1.125rem */
}
```

The only thing we assume here is that the `html` element is set to `1rem` (equal to 16). This means if you bump your `html` to `1.2rem` then everything will scale up with it. This is great for smaller devices that need a little size boost as all your text, headings, buttons etc will remain in proportion. If you want to experiment with different base value settings then [I find this calculator helps][4].

The other great way of controlling all your sizing via one function is that if you decide you need to switch over to pixels for some reason, then the `px()` function can simply be altered and the whole website receives an instant update. Easy.

## Sooo, how about LESS?

As far as I know (and I&#8217;d love to be wrong) LESS does not support the kind of function syntax above. Therefore the only way I&#8217;ve managed to get it to work in the past is to list out all my variables by hand (into say `sizing-vars.less`) and use them that way. So something like:

``` css
@unit-type: 0rem;
@base-font-size: 16;

/* Rem conversions */
@px1: (1 / @base-font-size) + @unit-type;
@px2: (2 / @base-font-size) + @unit-type;
@px3: (3 / @base-font-size) + @unit-type;
@px4: (4 / @base-font-size) + @unit-type;
@px5: (5 / @base-font-size) + @unit-type;
@px6: (6 / @base-font-size) + @unit-type;
```

It&#8217;s not pretty, but it works. Being able to have a `px()` function is almost the main reason I&#8217;ve started to reach for Sass more often now.

Even if you don&#8217;t use `rems` right now, I&#8217;d still suggest using something like this so that when the time comes you can switch over painlessly.

Enjoy.

 [1]: http://caniuse.com/#search=rem
 [2]: https://github.com/chuckcarpenter/REM-unit-polyfill
 [3]: http://www.abookapart.com/products/responsive-web-design
 [4]: http://pxtoem.com/