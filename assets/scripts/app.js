
define(function(require) {
    var mediator      = require('mediator');
    var domReady      = require('domready');
    var CodeHighlight = require('modules/CodeHighlight');

    return function() {
        domReady(function() {
            new CodeHighlight({
                highlight: 'content:rendered'
            });

            // Fire on initial page load in case user lands on post with code snippets
            mediator.publish('content:rendered', document.body.className);
        });

        // Main ajax loading/pushState stuff
        if (Modernizr.history) {
            require(['modules/PageController'], function(PageController) {
                domReady(function() {
                     new PageController({
                         container: '.js-container',
                         links: '.ajax, .nav-ajax a',
                         injectTarget: '#content',
                         nav: '.js-nav-container'
                    });
                });
            });
        }

        // Load mobile fixes
        if (Modernizr.mq('(max-width: 48em)')) {
            require(['mobile']);
        }

        // Highslide just for desktops
        if (Modernizr.mq('(min-width: 48em)')) {
            require(['settings', 'jquery', 'highslide'], function(settings, $, hs) {
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
    }
});
