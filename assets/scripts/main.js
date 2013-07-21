require.config({
    paths: {
        'handlebars':  'components/handlebars/handlebars.runtime',
        'mediator-js': 'components/mediator-js/index',
        'zepto':       'lib/zepto/zepto',
        'deferred':    'lib/deferred'
    },
    map: {
        '*': {
            'prettify':    'components/google-code-prettify/src/prettify',
            'prime':       'components/primish/prime',
            'zepto':       'lib/zepto/zepto-custom'
        },
        'lib/zepto/zepto-custom': {
            'zepto': 'zepto'
        }
    },
    shim: {
        deferred: {
            exports: 'Deferred'
        },
        zepto: {
            exports: 'Zepto'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

require(['app'], function(app) {
    app();
});
