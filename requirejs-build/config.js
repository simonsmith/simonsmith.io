({
    baseUrl: '../assets/scripts',
    dir: '../assets/scripts.min',

    paths: {
        'jquery': 'lib/jquery',
        'handlebars': 'lib/handlebars',
        'prettyprint': 'lib/prettify',
        'domready': 'lib/domready',
        'highslide': 'lib/highslide'
    },
    shim: {
        'handlebars': {
            'exports': 'Handlebars'
        },
        'prettyprint': {
            'exports': 'prettyPrint'
        },
        'highslide': {
            'exports': 'hs'
        }
    },

    removeCombined: true,

    optimize: 'uglify',
    preserveLicenseComments: false,
    uglify: {
        max_line_length: 3500,
        no_copyright: true
    },

    modules: [
        {
            name: 'main',
            exclude: ['mobile', 'highslide']
        },
        {
            name: 'mobile'
        },
        {
            name: 'highslide'
        }
    ]
})
