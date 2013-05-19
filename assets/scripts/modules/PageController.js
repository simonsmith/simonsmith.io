define(function(require) {
    'use strict';
    var $           = require('jquery');
    var mediator    = require('mediator-js');
    var Spinner     = require('modules/Spinner');
    var Scroller    = require('modules/Scroller');
    var PageUpdater = require('modules/PageUpdater');

    function PageController(elements) {
        $.each(elements, function(key, value) {
            this[key] = $(value);
        }.bind(this));

        new Spinner(this.container, {
            show: 'content:get:before',
            hide: 'content:get:always'
        });

        new Scroller({
            contentLoad: 'content:get:done'
        });

        new PageUpdater(this.nav, this.injectTarget, {
            contentLoad: 'content:get:done'
        });

        this.attachEvents();
    }

    PageController.prototype = {

        attachEvents: function() {
            this.container.on('click', this.links.selector, this.getPageContent.bind(this));

            window.addEventListener('popstate', function(event) {
                // Chrome/Safari seem to fire popstate on normal page load, bah
                // http://goo.gl/JJfwR
                if (!event.state) {
                    return;
                }

                mediator.publish('content:get:done', {
                    response: event.state,
                    navType: 'popstate'
                });
            }.bind(this));
        },

        getPageContent: function(event) {
            var $elem = $(event.currentTarget);
            var req = $.ajax({
                data: { ajax: true },
                dataType: 'json',
                context: this,
                timeout: 6000,
                url: $elem.attr('href'),
                beforeSend: function() {
                    mediator.publish('content:get:before');
                }
            });

            req.always(function() {
                mediator.publish('content:get:always');
            });
            req.fail(function() {
                mediator.publish('content:get:fail', { element: $elem });
            });
            req.done(function(json) {
                mediator.publish('content:get:done', {
                    response: json,
                    navType: 'ajax',
                    element: $elem
                });
            });

            event && event.preventDefault();
        }

    };

    return PageController;
});
