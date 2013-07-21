define(function(require) {
    'use strict';
    var $        = require('zepto');
    var mediator = require('mediator-js');
    var prime    = require('prime');

    return prime({
        constructor: function(events) {
            this.attachEvents(events.contentLoad);
        },

        scrollable: $('html, body'),

        attachEvents: function(contentLoadEvent) {
            mediator.subscribe(contentLoadEvent, this.scrollToTop, null, this);
        },

        scrollToTop: function(data) {
            if (data.navType == 'ajax') {
                this.scrollable.animate({
                    scrollTop: 0
                });
            }
        }
    });
});
