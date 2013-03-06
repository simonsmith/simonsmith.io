
define(function(require) {
    var prettyPrint = require('prettyprint');
    var mediator    = require('mediator');
    
    var CodeHighlight = function(events) {
        mediator.subscribe(events.render, this.highlight, null, this);
    };
    
    CodeHighlight.prototype = {
        
        highlight: function(bodyClass) {
            if (bodyClass.match(/single-post/)) {
                prettyPrint();
            }
        }

    };

    return CodeHighlight;
});
