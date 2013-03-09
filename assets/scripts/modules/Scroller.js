define(function(require) {
    'use strict';
    var $        = require('jquery');
    var mediator = require('mediator');

    var Scroller = function(events) {
        this.attachEvents(events.contentLoad);
    };

    Scroller.prototype = {

        scrollable: $('html, body'),

        attachEvents: function(contentLoadEvent) {
            mediator.subscribe(contentLoadEvent, this.scrollToTop, null, this);
        },

        scrollToTop: function(data) {
            if (data.type == 'ajax') {
                this.scrollable.animate({
                    scrollTop: 0
                });
            }
        }

    };

    return Scroller;
});
