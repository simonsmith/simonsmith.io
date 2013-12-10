---
title: 10 things I learnt from building radiotimes.com
author: Simon
layout: post
permalink: /10-things-i-learnt-from-building-radiotimes/
type: post
---
Unless you&#8217;re incredibly uncool then you&#8217;ll no doubt be aware of [the shiny new Radio Times website][1] that was released a couple of weeks ago. I had quite a lot to do with the front-end side of things on that site so I thought I&#8217;d write a post about various things I learnt, and also things I already knew that were just re-enforced.

*At this stage it&#8217;s probably worth doing one of those disclaimers that we see in blog posts all the time. There are a lot of stupid people about so I&#8217;ll say now that all of these points/views/opinions are mine and nowt to do with the BBC or any of it&#8217;s affiliates.*

Idiot speech done, yay!

## MooTools is awesome

Radio Times was the first large site that I&#8217;ve built using MooTools as the main JS framework and it&#8217;s sealed itself as my preferred library. I particularly favour the way it encourages the developer to organise their code using OO concepts, something which I always longed for when writing JS with jQuery. My favourite quote comes from a site that enticed me into converting from jQuery shenanigans, the aptly named [jqueryvsmootools.com][2]:

> If jQuery makes the DOM your playground, MooTools aims to make JavaScript your playground

jQuery was the first library I got involved with (I was writing it before I even knew the correct syntax for a function, ugh) and it definitely helps novices get stuff done, but if you want to embrace JS as a language then MooTools helps you achieve that. Mind you, if I need to get stuff done fast on a small site I will always consider reaching for jQuery as it comes down to what tool is best for the job.

It&#8217;s on my list to properly explore [Dojo][3] as well, but that&#8217;s a task for another time.

## Should have used responsive design. Foolish error

Ah, I kick myself for not pushing this more at the beginning of the project. I remember sitting down with the product owner near the start of the project (December/January last year I believe) and explaining the benefits of this technique and why we should embrace it but unfortunately the design agency had already held us up long enough just getting desktop versions completed, so there certainly wasn&#8217;t time to start exploring layouts for different sized devices. The decision was made to &#8220;do it at the end&#8221; but as we all know, when dealing with the concept of &#8220;mobile first&#8221; that is largely impossible.

Responsive design is an even bigger deal now than it was when I had that discussion and I would go as far to say that there isn&#8217;t two ways to build a site anymore. Just do it responsively, end of. Now Radio Times wants to make a move into the mobile space and after seeing what [The Boston Globe][4] achieved I really regret not pursuing this more aggressively.

## Stop trying to replicate PSDs in all browsers

One thing I am proud of is breaking the mould a bit at the BBC when it comes to defining what &#8216;cross browser compatibility&#8217; actually means. If you have an ounce of interest in front-end development you can&#8217;t avoid being exposed to [the preachings of Andy Clarke][5]. Essentially he talks about the ridiculous notion of trying to achieve pixel perfect designs in all browsers. With so many devices (all with varying levels of standards support) it is next to impossible. Instead, embrace the modern browsers and their capabilities and degrade your design for the old, wheezing versions of IE that can&#8217;t keep up.

With that kind of awesome advice ringing in my ears I set out the rule early on that IE users would not get the same experience as Chrome, Firefox et al, but they should never think the site looked broken. Given that a lot of people involved with the site at BBC Worldwide were using IE8 it *could* be deemed a crazy idea and I was grateful that the product owner put trust in me to make this decision.

With some serious reliance on [Modernizr][6], that goal has been achieved and users of modern browsers are rewarded with some quite lovely CSS3 uses. Forward thinking, yes!

## When it comes to HTML5, 8 is the new 6

I am of course referring to the line of browsers prefixed with IE. We tried to fully embrace the use of HTML5 elements on Radio Times but by jumping ahead to this exciting new world of semantic joy, IE8 is once again holding developers back. Two tools that help us fight this sorry state of affairs are [Modernizr][6] and [Selectivizr][7]. Both are invaluable but one area that you can become unstuck in is needing to update the DOM with new elements. The [RT listings page][8] makes use of an article element for each channel and when the user selects a new time slot, the page is updated with Ajax. This is when things get a little ugly in IE.

We fought this beast by making use of [a handy script called innerShiv][9] and although it&#8217;s not ideal it&#8217;s certainly a viable way to get round IE and dynamic content issues, particularly if you don&#8217;t want to start wrapping all your clean markup in div elements.

If you&#8217;re gonna get all futuristic up in here with HTML5 and CSS3 then you need to accept that IE8 users and below are going to have an inferior experience. If you can deal with that (or rather your clients can!) then you&#8217;re all set.

## Don&#8217;t outsource your site design

And if you do, ensure it&#8217;s an agency that understands the limitations and strengths of a browser. Also, some User Experience erm.. experience will help as well. Not all agencies are bad, they can&#8217;t be, but unfortunately at BBC Worldwide I&#8217;ve seen a couple of projects outsourced to a poor design agency, even when there are perfectly good designers sitting around in-house.

The design process is and should be something that continues to iterate. The front end developers and designers need to work closely to produce the best work, especially if they plan to implement a responsive design. You simply can&#8217;t just send a list of requirements off, wait for a bit, get a bunch of PSDs back and start building them. The amount of changes and queries we had with some of the Radio Times designs were crazy, equally so were some of the user experience choices. Double clicking areas of the page? Yeah that was thrown in at one point.

Back-end and front-end devs work together, but in my mind it&#8217;s even more important that designers work in that group. Crucial.

## Universal IE6 is great

Fortunately the decision to drop IE6 support was made fairly early on due to the hideous amount of dev time soaked up in fixing things (IE7 & 8 were enough trouble). However, instead of just leaving a stupidly broken page for our unfortunate IE6 users it took all of five minutes to implement [Andy Clarke&#8217;s awesome Universal IE6 stylesheet][10]. It essentially strips away all layout styling and leaves a nice looking, linear page for IE6 users which is designed to allow them access to the content only.

So far I&#8217;ve not heard one complaint about this approach from our users.

## Remove obstacles from developers

One problem I continually see with the projects I have been on is the need to introduce process where it absolutely shouldn&#8217;t be. And I&#8217;m referring to little things that just stop a developer from developing. On the Radio Times project for example, we would spend time in our stand up meeting putting smiley faces on sprint goals that showed how we were progressing. If anything, Project Managers should be looking to strip away as much process as possible. No one will complain that there aren&#8217;t enough wall charts and meetings. Ever.

The most productive times I&#8217;ve ever had are when I&#8217;m given a task to complete and then just left for a day or two to complete it. No meetings, no continual interruptions. PMs don&#8217;t need to justify their position with fluffy processes.

## Script loaders are ace, but not the only solution

I made the mistake of thinking [RequireJS][11] was so awesome that it could simply work in every single scenario. Obviously all libraries have their uses and I got a little blinded by all the asynchronous script loading and module based sexiness. I wrote all the MooTools classes to take advantage of the dependency based approach that RequireJS affords and ensured nearly all our scripts were loaded this way.

I actually ended up having **a lot** of issues with load order of the scripts, particularly in IE. I&#8217;m confident I was using the library correctly as most browsers played nice and the loading issues appeared to be intermittent. However, it was deemed too risky to release with those hidden problems so I had the fun task of editing **all** the Moo classes!

Working with one of the back-end devs, we created a similar system that would load scripts but concatenate them into one file, all in order and also minified when the page loaded. This proved to be just as useful and even faster on the load speed (we tried the RequireJS build tool first and didn&#8217;t have much luck).

This actually inspired the creation of [BoxJS][12] and [BoxCSS][13] which essentially do the same thing.

## Embrace retrospectives

One thing I&#8217;m glad we did do on Radio Times was to really embrace fortnightly retrospectives. Now, this is not all to do with the beer and snacks that we would bring along, but if you&#8217;re gonna have a long meeting on a Friday afternoon I&#8217;ve noticed no one complains when a beer is on the table.

I think we tried about ten different ways of working the Agile board and cards on this project based on feedback from these meetings, but that is preferred over battling on with a system that doesn&#8217;t work. Being able to discuss negatives and positives openly in a dev team makes a big difference to the morale of the project, especially when measures are put in place to address the problems.

Never come out of a retrospective and start quietly moaning about problems on a project. Voice them!

## Using custom fonts? Test them without ClearType enabled

Here&#8217;s an interesting one.

The designs for the new site utilised the [Interstate font family][14] quite heavily and many of these fonts are quite thin. At BBC Worldwide if you&#8217;re not using a Mac then 90% of the time you&#8217;ll be on an XP machine, and helpfully the default setting for these boxes is to have ClearType disabled. Trying to read some of the Radio Times fonts like this was a taxing process, and it became more evident when the site first went into beta as many users complained about the legibility of the copy.

Being too far down the line to start altering fonts (and having paid a bucket load to license Interstate!) we had to find a fix, which came in the form of [this excellent technique for detecting aliasing with canvas][15].

&nbsp;

I&#8217;ll wait for one my colleagues to tell me ten things I *should* have learnt!

 [1]: http://www.radiotimes.com/
 [2]: http://jqueryvsmootools.com/
 [3]: http://dojotoolkit.org/
 [4]: http://www.bostonglobe.com/
 [5]: http://hardboiledwebdesign.com/
 [6]: http://www.modernizr.com/
 [7]: http://selectivizr.com/
 [8]: http://www.radiotimes.com/tv/tv-listings
 [9]: http://jdbartlett.com/innershiv/
 [10]: http://forabeautifulweb.com/blog/about/universal_internet_explorer_6_css
 [11]: http://requirejs.org/
 [12]: http://boxjs.com
 [13]: http://boxcss.com
 [14]: http://new.myfonts.com/fonts/fontbureau/interstate/
 [15]: http://www.useragentman.com/blog/2009/11/29/how-to-detect-font-smoothing-using-javascript/
