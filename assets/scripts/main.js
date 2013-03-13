
require.config({
    paths: {
        'jquery': 'lib/jquery',
        'handlebars': 'lib/handlebars',
        'prettyprint': 'lib/prettify',
        'domready': 'lib/require/domready',
        'highslide': 'lib/highslide',
        'mediator': 'lib/mediator'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars',
            init: function() {
                // Allow object of multiple partials to be added
                Handlebars.registerPartial = function(name, str) {
                    var type = Object.prototype.toString.call(name);
                    if (type === '[object Object]') {
                        for (var partial in name) {
                            if (name.hasOwnProperty(partial)) {
                                this.partials[partial] = name[partial];
                            }
                        }
                    } else {
                        this.partials[name] = str;
                    }
                };
            }
        },
        'prettyprint': {
            'exports': 'prettyPrint'
        },
        'highslide': {
            'exports': 'hs'
        }
    }
});

require(['app'], function(app) {
    app();
});
