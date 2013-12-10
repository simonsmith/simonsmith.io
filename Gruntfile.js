module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            css: {
                files: 'assets/sass/**/*.scss',
                tasks: ['sass:dev', 'autoprefixer', 'csslint', 'cssmin']
            }
        },

        autoprefixer: {
            build: {
                src: 'assets/css/site.css',
                dest: 'assets/css/site.css'
            }
        },

        cssmin: {
            build: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    'assets/css/site.css': [
                        'bower_components/normalize-css/normalize.css',
                        'bower_components/syntax.css/syntax.css',
                        'bower_components/suit-**/*.css',
                        'assets/css/sass-compiled.css'
                    ]
                }
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: 'assets/css/site.css'
        },

        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'assets/css/sass-compiled.css': ['assets/sass/site.scss']
                }
            }
        }
    });

    grunt.registerTask('default', [
        'sass:dev',
        'autoprefixer',
        'csslint',
        'cssmin'
    ]);

    grunt.registerTask('build', [

    ]);
};
