define(function(require) {
    'use strict';
    var prettify    = require('prettify');
    var mediator    = require('mediator-js');
    var prime       = require('prime');

    return prime({
        constructor: function(events) {
            this.attachEvents(events.render);
        },

        attachEvents: function(renderEvent) {
            mediator.subscribe(renderEvent, this.highlight, null, this);
        },

        highlight: function(meta) {
            if (meta.body_class.match(/single-post/)) {
                prettify.prettyPrint();
            }
        }
    });
});
