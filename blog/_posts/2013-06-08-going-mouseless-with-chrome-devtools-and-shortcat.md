---
title: Going mouseless with Chrome DevTools and Shortcat
author: Simon
layout: post
permalink: /going-mouseless-with-chrome-devtools-and-shortcat/
type: post
---
Today I found a [great Mac app called Shortcat][1]. The idea is it taps into the Accessibility API available to all apps and lets you hit a hotkey to select parts of the app.

If you open Shortcat and hit `.` it will reveal all available shortcuts in the app. You can then focus on the desired shortcut by holding `Ctrl+<shortcut letter>`. Alternatively you can just start typing the name of something on the screen and it will begin filtering options.

## Using Chrome

With excitement I opened Chrome and found only a few shortcuts

<figure class="Figure">
    <a class="Figure-link js-imgPop" href="/assets/images/uploads/2013/06/Screen-Shot-2013-06-08-at-18.44.27.png">
        <img class="Figure-img" src="/assets/images/uploads/2013/06/Screen-Shot-2013-06-08-at-18.44.27.png">
    </a>
    <figcaption class="Figure-caption">
        Boo :(
    </figcaption>
</figure>

Good, but not great. However, [according to the documentation][2] we can force Chrome to reveal more shortcuts to us with `--force-renderer-accessibility`. Simply tap this into the terminal:

    open -a "/Applications/Google Chrome.app" --args --force-renderer-accessibility

<figure class="Figure">
    <a class="Figure-link js-imgPop" href="/assets/images/uploads/2013/06/Screen-Shot-2013-06-08-at-18.46.14.png">
        <img class="Figure-img" src="/assets/images/uploads/2013/06/Screen-Shot-2013-06-08-at-18.46.14.png">
    </a>
    <figcaption class="Figure-caption">
        Cooking with gas!
    </figcaption>
</figure>

Now we&#8217;re talking!

## Bring out the DevTools

Now that Chrome is playing nice with Shortcat we can pop open the DevTools and see that the same level of shortcut bliss is also offered.

For example, start typing &#8216;elements&#8217;, &#8216;console&#8217; or even the id of an element to position focus on that part of the window. It&#8217;s worth noting that if you hold `Ctrl` when pressing `Enter` then it will trigger the context menu usually found with a right click. Really handy.

<figure class="Figure">
    <a class="Figure-link js-imgPop" href="/assets/images/uploads/2013/06/Screen-Shot-2013-06-08-at-19.25.40.png">
        <img class="Figure-img" src="/assets/images/uploads/2013/06/Screen-Shot-2013-06-08-at-19.25.40.png">
    </a>
</figure>

## Issues

*   The most important thing to remember is that Shortcat is in the early stages of development so there can (and probably will be) bugs. But so far it&#8217;s worked pretty well for me.
*   Chrome doesn&#8217;t currently update the position of the shortcuts when you scroll. This makes interacting with a web page fairly limiting. From what I&#8217;ve read [this issue has been resolved and is in Canary currently][3]. Hopefully that fix will make its way down to the more stable versions soon.
*   A drawback to the way Shortcat works is it&#8217;s up to each app to implement support for the API, so some offer much better experiences than others. The good thing is that if this gains popularity we might see app developers increase the quality of their accessibility support and that will help everyone.
*   Opening Chrome with a long terminal command is a pain in the arse.

## Options for opening Chrome with the accessibility flag

The simplest way round this is [to alias the command][4] to something like `chrome`. If (like me) you have iTerm 2 open almost permanently then this is hardly an inconvenience:

    alias chrome='open -a "/Applications/Google Chrome.app" --args --force-renderer-accessibility'

Fortunately there is also [another Chromium issue][5] open for this, so this may become easier in the future.

A somewhat trickier way round it [is to use AppleScript][6], but I didn&#8217;t have any joy with that solution.

I can see Shortcat, [Divvy][7] and [Alfred][8] being a formidable trio in the future.

 [1]: http://shortcatapp.com/
 [2]: http://shortcatapp.com/readme.html
 [3]: https://code.google.com/p/chromium/issues/detail?id=222636
 [4]: http://www.moncefbelyamani.com/create-aliases-in-bash-profile-to-assign-shortcuts-for-common-terminal-commands/
 [5]: https://code.google.com/p/chromium/issues/detail?id=181531
 [6]: http://productforums.google.com/forum/#!msg/chrome/_CnkF0tj6xk/yynqSTnTNnUJ
 [7]: http://mizage.com/divvy/
 [8]: http://www.alfredapp.com/
