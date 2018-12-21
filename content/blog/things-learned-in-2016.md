---
date: 2017-01-03T20:16:03Z
title: Things learned in 2016
draft: true
---

Last year it felt like the challenges of being a front end developer were always
just another blog post away:

![](/images/posts/things-learned-in-2016/google-search.png)

It can certainly feel like the list of things to learn [keeps on getting
larger](https://paul.kinlan.me/2017-exciting-times/) and that's unlikely to
change any time soon.

But what about all things you did learn? For posterity I decided to look back at
all the notable things I learned last year.

## React Native

I've been enjoying React for a couple years and helped ship [BBC
Three](http://www.bbc.co.uk/bbcthree) with it at the start of 2016. Seeing as I
have no prior native development experience I was curious as to how far React
Native could take me.

Since August I've been working on an e-commerce app for iOS and it's been a
very interesting experience.

Whilst React Native felt familiar at first, there are dozens of components and
APIs to get accustomed to as well as interesting nuances of native app
development. I'll never take setting `width: 50%` on an `<img/>` for granted
again!

It's a great framework though and the team have Facebook have done an amazing
job making it work seamlessly. Be sure [to thank
them](https://github.com/facebook/react/issues/8663).

I'll post a more thorough review of my experiences with React Native in the
future but in the meantime you can watch [this great talk](https://www.youtube.com/watch?v=ZqKYk0aTaYk).

## Redux

It was nice to finally see the JS community settle on one library to manage
state in an application. Naturally it was on my list to really dig into Redux
and fully understand it.

Using React Native, Redux and React Redux together has been a very enjoyable
experience. The new
[NavigationExperimental](https://facebook.github.io/react-native/docs/navigation.html#navigationexperimental)
component essentially treats your app as a SPA and I think this is where Redux
really shines.

We're storing the entire state of the app (data and UI) in the Redux which
has been useful for reproducing errors. [You might not need
it](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367),
but if you do it's a great tool.

## Touch typing

Since switching to Vim about a year ago I really began to notice how looking at
the keyboard was slowing me down. I wasn't staring down at the desk the
entire time but my knowledge of where keys were located was driven by rough
approximation and no real technique - a frequent source of errors.

I found [typing.io](https://typing.io/) about four months ago and it's entirely
focused around touch typing for programmers. On the upgraded plan it allows you
to upload any code snippets you want and also has an on screen keyboard that
shows exactly which finger should press each key:

![](/images/posts/things-learned-in-2016/typing.png)

That thing was a revelation. I think I spent a few hours in total just trying
different code samples and realising that for each key there is one finger that
is responsible for it. It seems obvious but it's much easier to type without
looking when you know the correct fingers to use for each key, especially with
more common code syntax like brackets.

Just like Vim it slows you down a bit at first but the effort is quickly
rewarded.

## Flexbox

I thought I knew Flexbox pretty well after working on
[utils-flex](https://github.com/suitcss/utils-flex) but being forced to use it
for everything in React Native really cemented my understanding. Not sure I
could bare to use floats for layout ever again.

## Working on open source

Maintaining [SUIT CSS](https://github.com/suitcss/suit) and helping with
projects like
[postcss-bem-linter](https://github.com/postcss/postcss-bem-linter) and
[onedark.vim](https://github.com/joshdick/onedark.vim) has taught me a lot about
just how much effort goes into open source.

Working with other developers, understanding how to release updates and
responding to issues is all good experience that can transfer into professional
work as well.

Finding your way around someone else's code is also a great way to learn. Even
if you make small contributions I can recommend it. Very satisfying to get that
PR merged!

## Functional programming

This is one topic I felt like everyone was talking about but I just couldn't
understand why. I used functions didn't I? I'm mapping and reducing all over the
place. This couldn't be what the fuss was about.

I think it was the second read through of chapters 1-6 in [Professor Frisby's
Mostly Adequate Guide to Functional Programming](https://www.gitbook.com/book/drboolean/mostly-adequate-guide/details)
when it finally clicked.

I [wrote a post about my
findings](https://simonsmith.io/dipping-a-toe-into-functional-js-with-lodash-fp/)
and received many kind words on how it helped other people 'get it' too.

Since then I'm using lodash/fp as much as possible and planning to write about
some more of the things I've learned.

## Flow

Flow is Facebook's take on adding type safety to JS. Seeing as it comes ready to
use with React Native I've spent time integrating it more and more into my code.

I remember thinking the syntax looked insane and I would never need it. Now I'm
certain I'd feel lost without it. When integrated into your editor alongside ESLint
it's a powerful tool.

## `async` functions and generators

Okay so there are lot of ES6/7 features, why mention this? Generators and `async`
always looked like magic to me. How could this possibly work?

```js
async function requestPhotos() {
  const response = await axios.get(`/photos`);
  console.log(response);
}
```

The key to this is to understand how generators work and see that `async` is a
nice sugar on top.

I had to read [this excellent series of
posts](https://davidwalsh.name/es6-generators) by Kyle Simpson a few times, and
play with various code samples but by the end it clicked.

It helped remind me that just sitting down and dedicating and hour or two to
something without getting distracted by Hacker News or Reddit can really work.
Who knew.

## Kwm

[Kwm](https://koekeishiya.github.io/kwm/) is a tiling window manager for macOS.
It's been one of the biggest boosts to my productivity since switching to Vim.
It's a bit [similar to i3](https://i3wm.org/) on Linux:

![](/images/posts/things-learned-in-2016/kwm.png)

Unlike other window managers it uses a layout algorithm to work out where
windows should be placed and how they are sized. You can resize, move
and switch between them with Vim-style shortcuts.

Expect a post on this soon.

## Bonus: My wonky spine

This is me standing up straight. The green line is where my spine is supposed to be.

![](/images/posts/things-learned-in-2016/spine.jpg)

Needless to say this was quite a surprise. Thankfully with regular
adjustments and specific exercises it's fixable.

## That's it!

It's good to think about everything we've learnt over the past year as it's
often much more than you realised. With so much to focus on don't forget about
your body too.

Let's do it again next year.
