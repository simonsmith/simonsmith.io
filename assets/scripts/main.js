
// Only bother with the fancy history stuff if we can use it
if (Modernizr.history) {
    require(['modules/pageController', 'domready'], function(pageController, domReady) {
        domReady(function() {
            pageController.init({
                container: '.js-container',
                links: '.ajax, .nav-ajax a',
                injectTarget: '#content',
                nav: '.js-nav-container'
            });
        });
    });
}

require(['domready'], function(domReady) {
    domReady(function() {
        if (document.body.className.match(/single-post/)) {
            require(['prettyprint'], function(prettyPrint) {
                prettyPrint();
            });
        }
        
        if (document.body.className.match(/home/)) {
            require(['modules/morePosts'], function(morePosts) {
                morePosts.init($('.excerpt-list'));
            });
        }
    });
});

// Load mobile fixes
if (Modernizr.mq('(max-width: 48em)')) {
    require(['mobile']);
}

// Highslide just for desktops
if (Modernizr.mq('(min-width: 48em)')) {
    require(['settings', 'jquery', 'highslide', 'domready'], function(settings, $, hs, domReady) {
        hs.graphicsDir = settings.templateDir + 'assets/images/hs/';
        hs.showCredits = false;
        hs.outlineType = null;
        hs.align = 'center';
        hs.dimmingOpacity = 0.85;
        hs.dimmingDuration = 100;

        domReady(function() {
            $('.container').on('click', 'a.highslide', function(event) {
                hs.expand(this);
                event.preventDefault();
            });
        })
    });
}
