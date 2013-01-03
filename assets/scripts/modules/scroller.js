
    define(function(require) {
        var $ = require('jquery');

        return {
            scrollable: $('html, body'),

            scrollToTop: function() {
                this.scrollable.animate({
                    scrollTop: 0
                });
            }
        }
    });
