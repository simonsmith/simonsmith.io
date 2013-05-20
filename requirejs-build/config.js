({
    baseUrl: '../assets/scripts',
    dir: '../assets/scripts.min',
    mainConfigFile: '../assets/scripts/requirejs-config.js',
    removeCombined: true,

    optimize: 'uglify',
    preserveLicenseComments: false,
    uglify: {
        max_line_length: 3500,
        no_copyright: true
    },
    optimizeCss: 'none',

    modules: [
        {
            name: 'main'
        },
        {
            name: 'mobile'
        },
        {
            name: 'modules/PageController',
            exclude: ['jquery', 'handlebars', 'mediator-js']
        }
    ]
})
