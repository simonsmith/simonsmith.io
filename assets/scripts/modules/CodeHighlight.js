define(function(require) {
    'use strict';
    var prettyPrint = require('prettyprint');
    var mediator    = require('mediator');
    
    var CodeHighlight = function(events) {
        this.attachEvents(events.render);
    };
    
    CodeHighlight.prototype = {

        attachEvents: function(renderEvent) {
            mediator.subscribe(renderEvent, this.highlight, null, this);
        },
        
        highlight: function(meta) {
            if (meta.body_class.match(/single-post/)) {
                prettyPrint();
            }
        }

    };

    return CodeHighlight;
});
