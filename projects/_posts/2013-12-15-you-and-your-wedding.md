---
title: You &amp; Your Wedding
layout: project
permalink: /project/you-and-your-wedding/
type: project
intro: A mobile-first, responsive application for picking a wedding venue
projectUrl: youandyourwedding.co.uk/venues
imgPrefix: yayw
---

The You &amp; Your Wedding venue finder was one of the first projects at Immediate Media to implement a truly mobile-first responsive site. Previously the mobile experience had been to re-direct users to a different set of views based on their device.

I came into the project early on and was tasked with re-factoring the front-end and setting a good foundation for the site. Although [Bootstrap 3](http://getbootstrap.com) was not officially released at the time, we decided to use their layout grid to structure the site and provide a basis for the responsive layout.

Working with another front-end developer, we structured a modular front-end, broken up into various Sass files that allowed easy re-use of code across the site. I also structured and wrote a lot of the JS, making use of the [wonderful Primish OOP library](https://github.com/DimitarChristoff/primish).

In particular I developed the slide out mobile navigation (utilising CSS3 transitions for a smooth experience on mobile devices) and implemented the [Twitter Typeahead library](http://twitter.github.io/typeahead.js/) for the predictive search results.
