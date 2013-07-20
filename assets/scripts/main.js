require.config({
    paths: {
        'handlebars':  'components/handlebars/handlebars.runtime',
        'fancybox':    'components/fancybox/source/jquery.fancybox',
        'jquery':      'components/jquery/jquery',
        'mediator-js': 'components/mediator-js/index'
    },
    map: {
        '*': {
            'prettify':    'components/google-code-prettify/src/prettify',
            'prime':       'components/primish/prime'
        }
    },
    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        'fancybox': ['jquery']
    }
});

require(['app'], function(app) {
    app();
});
