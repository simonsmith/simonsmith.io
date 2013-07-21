module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            templates: {
                files: './templates/**/*.mustache',
                tasks: ['handlebars']
            },

            sass: {
                files: 'assets/sass/**/*.scss',
                tasks: ['sass:dev']
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'assets/css/site.css': 'assets/sass/site.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'assets/css/site.css': 'assets/sass/site.scss'
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
            build: ['assets/scripts.dist/components/!(require)']
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
                            name: 'main'
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

    grunt.registerTask('default', ['handlebars:templates', 'requirejs:build', 'clean:build', 'sass:build']);

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
};
