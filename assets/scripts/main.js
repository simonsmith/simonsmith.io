require.config({
    paths: {
        'jquery':                   'components/jquery/jquery',
        'handlebars':               'components/handlebars/handlebars.runtime',
        'prettify':                 'components/google-code-prettify/src/prettify',
        'mediator-js':              'components/mediator-js/index',
        'fancybox':                 'components/fancybox/source/jquery.fancybox',
        'hammer':                   'components/hammerjs/dist/hammer'
    },
    map: {
        '*': {
            'prime': 'lib/prime/node_modules/prime/index'
        }
    },
    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        highslide: {
            exports: 'hs'
        },
        'fancybox': ['jquery']
    }
});

require(['app'], function(app) {
    app();
});
