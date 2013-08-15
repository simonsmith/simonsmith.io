module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            templates: {
                files: './templates/**/*.mustache',
                tasks: ['handlebars']
            },

            sass: {
                files: 'assets/sass/**/*.scss',
                tasks: ['sass', 'autoprefixer']
            }
        },

        autoprefixer: {
            build: {
                files: {
                    'assets/css/site.css': ['assets/css/site.css']
                }
            }
        },

        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'assets/css/site.css': 'assets/sass/site.scss'
                }
            }
        },

        cssmin: {
            build: {
                files: {
                    'assets/css/site.css': 'assets/css/site.css'
                }
            }
        },

        handlebars: {
            templates: {
                options: {
                    namespace: 'Handlebars.templates',
                    amd: true,
                    partialRegex: /.*/,
                    partialsPathRegex: /partials/,
                    processName: function(fileName) {
                        return fileName.split('/').pop();
                    }
                },
                files: {
                    'assets/scripts/templates/compiled-templates.js': './templates/**/*.mustache'
                }
            }
        },

        clean: {
            build: ['assets/scripts.dist/components/!(require|jquery)']
        },

        requirejs: {
            build: {
                options: {
                    baseUrl: 'assets/scripts',
                    dir: 'assets/scripts.dist',
                    mainConfigFile: 'assets/scripts/main.js',
                    optimizeCss: 'none',
                    removeCombined: true,

                    modules: [
                        {
                            name: 'main',
                            exclude: ['jquery', 'zepto']
                        },
                        {
                            name: 'mobile'
                        },
                        {
                            name: 'modules/PageController',
                            exclude: ['zepto', 'handlebars', 'mediator-js', 'prime', 'modules/Storage']
                        }
                    ],

                    optimize: 'uglify2',
                    preserveLicenseComments: false
                }
            }
        }
    });


    grunt.registerTask('default', [
        'handlebars:templates',
        'requirejs',
        'clean',
        'sass',
        'autoprefixer',
        'cssmin'
    ]);
};
