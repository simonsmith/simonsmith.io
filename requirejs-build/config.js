({
    baseUrl: '../assets/scripts',
    dir: '../assets/scripts.min',

    paths: {
        'jquery': 'lib/jquery',
        'handlebars': 'lib/handlebars',
        'prettyprint': 'lib/prettify',
        'domready': 'lib/domready'
    },
    shim: {
        'handlebars': {
            'exports': 'Handlebars'
        },
        'prettyprint': {
            'exports': 'prettyPrint'
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
            exclude: ['mobile']
        },
        {
            name: 'mobile'
        },
    ]
})
