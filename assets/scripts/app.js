define(function(require) {
    'use strict';
    var $             = require('jquery');
    var mediator      = require('mediator');
    var domReady      = require('domready');
    var CodeHighlight = require('modules/CodeHighlight');
    var MorePosts     = require('modules/MorePosts');

    return function() {
        // Set initial history page
        $.getJSON(location.href, { ajax: true }, function(json) {
            history.replaceState(json, null, location.href);
            mediator.publish('content:rendered', json.page_meta);
        });

        domReady(function() {
            new CodeHighlight({
                render: 'content:rendered'
            });

            new MorePosts('.js-container', '.js-post-list', {
                render: 'content:rendered'
            });

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
            require(['settings', 'highslide'], function(settings, hs) {
                hs.graphicsDir = settings.templateDir + 'assets/images/hs/';
                hs.showCredits = false;
                hs.outlineType = null;
                hs.align = 'center';
                hs.dimmingOpacity = 0.85;
                hs.dimmingDuration = 100;

                domReady(function() {
                    $('.js-container').on('click', 'a.highslide', function(event) {
                        hs.expand(this);
                        event.preventDefault();
                    });
                })
            });
        }
    }
});
