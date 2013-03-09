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
        
        highlight: function(bodyClass) {
            if (bodyClass.match(/single-post/)) {
                prettyPrint();
            }
        }

    };

    return CodeHighlight;
});
