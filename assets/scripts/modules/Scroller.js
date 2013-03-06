
define(function(require) {
    var $        = require('jquery');
    var mediator = require('mediator');

    var Scroller = function(events) {
        mediator.subscribe(events.contentLoad, this.scrollToTop, null, this);
    };

    Scroller.prototype = {

        scrollable: $('html, body'),

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
