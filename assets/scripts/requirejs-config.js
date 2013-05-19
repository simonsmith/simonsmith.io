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
            exports: 'Handlebars'
        },
        'prettyprint': {
            'exports': 'prettyPrint'
        },
        'highslide': {
            'exports': 'hs'
        }
    }
});
