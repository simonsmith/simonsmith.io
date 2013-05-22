define(function(require, exports, module) {
    'use strict';
    var $             = require('jquery');
    var mediator      = require('mediator-js');
    var CodeHighlight = require('modules/CodeHighlight');
    var MorePosts     = require('modules/MorePosts');
                        require('templates/compiled-templates');

    return function() {
        // Set initial history page
        $.getJSON(location.href, { ajax: true }, function(json) {
            history.replaceState(json, null, location.href);
            mediator.publish('content:rendered', json.page_meta);
        });

        new CodeHighlight({
            render: 'content:rendered'
        });

        new MorePosts('.js-container', '.js-post-list', {
            render: 'content:rendered'
        });

        // Main ajax loading/pushState stuff
        if (Modernizr.history) {
            require(['modules/PageController'], function(PageController) {
                new PageController({
                     container: '.js-container',
                     links: '.ajax, .nav-ajax a',
                     injectTarget: '#content',
                     nav: '.js-nav-container'
                });
            });
        }

        // Load mobile fixes
        if (Modernizr.mq('(max-width: 48em)')) {
            require(['mobile']);
        }

        // Highslide just for desktops
/*        if (Modernizr.mq('(min-width: 48em)')) {
            require(['highslide'], function(hs) {
                hs.graphicsDir = module.config().templateDir + 'assets/images/hs/';
                hs.showCredits = false;
                hs.outlineType = null;
                hs.align = 'center';
                hs.dimmingOpacity = 0.85;
                hs.dimmingDuration = 100;

                $('.js-container').on('click', 'a.highslide', function(event) {
                    hs.expand(this);
                    event.preventDefault();
                });
            });
        }*/
    }
});
