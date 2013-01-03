
define(function(require) {
    var $ = require('jquery');

    return {
        init: function(container) {
            this.container = $(container);
            this.elem.appendTo(this.container);
        },

        elem: $('<div></div>', {
            'class': 'loading',
            'aria-hidden': true
        }).hide(),

        show: function() {
            this.elem.attr('aria-hidden', false).show();
            this.container.attr('aria-busy', true);
        },

        hide: function() {
            this.elem.attr('aria-hidden', true).hide();
            this.container.attr('aria-busy', false);
        }
    };
});
