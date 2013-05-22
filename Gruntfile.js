module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            templates: {
                files: './templates/**/*.mustache',
                tasks: ['handlebars']
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
            build: ['assets/scripts.dist/components']
        },

        uglify: {
            build: {
                files: {
                    'assets/scripts.dist/main.js': ['assets/scripts.dist/main.js'],
                    'assets/scripts.dist/modules/PageController.js': ['assets/scripts.dist/modules/PageController.js'],
                    'assets/scripts.dist/lib/modernizr.js': ['assets/scripts.dist/lib/modernizr.js'],
                    'assets/scripts.dist/mobile.js': ['assets/scripts.dist/mobile.js'],
                    'assets/scripts.dist/components/requirejs/require.js': ['assets/scripts/components/requirejs/require.js'],
                    'assets/scripts.dist/requirejs-config.js': ['assets/scripts.dist/requirejs-config.js']
                }
            }
        },

        requirejs: {
            build: {
                options: {
                    baseUrl: 'assets/scripts',
                    dir: 'assets/scripts.dist',
                    mainConfigFile: 'assets/scripts/requirejs-config.js',
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
                            exclude: ['jquery', 'handlebars', 'mediator-js', 'prime']
                        }
                    ],

                    optimize: 'none',
                    preserveLicenseComments: false
                }
            }
        }
    });

    grunt.registerTask('default', ['handlebars:templates', 'requirejs:build', 'clean:build', 'uglify:build']);

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
};
