define(function(require, exports, module) {
    'use strict';
    var $             = require('jquery');
    var mediator      = require('mediator-js');
    var Hammer        = require('hammer');
    var storage       = require('modules/Storage');
    var CodeHighlight = require('modules/CodeHighlight');
    var MorePosts     = require('modules/MorePosts');
                        require('fancybox');
                        require('templates/compiled-templates');

    return function() {
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
        } else {
            // Fire event anyway as other modules still need to know
            mediator.publish('content:rendered', {
                body_class: document.body.className
            });
        }

        // Load mobile fixes
        if (Modernizr.mq('(max-width: 48em)')) {
            require(['mobile']);
        }

        // Fancybox init
        $('.js-container').on('click', 'a', function(event) {
            if (/([.]png|jpg|jpeg)$/.test(this.href)) {
                $.fancybox(this.href);
                event.preventDefault();
            }
        });

        // Set initial history page
        // TODO - Improve this
        // This is bad and is repeating code from PageController
        // but fixing replaceState in there is tough for now
        var initialJSON = storage.getItem(location.href);
        var load = function(json) {
            history.replaceState(json, null, location.href);
            mediator.publish('content:rendered', json.page_meta);
        };
        if (initialJSON) {
            load(initialJSON);
        } else {
            $.getJSON(location.href, { ajax: true }, function(json) {
                load(json);
                storage.setItem(location.href, json);
            });
        }
    }
});
