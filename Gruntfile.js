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
                dest: 'assets/css/site.css',
                src: [
                    'bower_components/normalize-css/normalize.css',
                    'bower_components/suit-**/*.css',
                    'assets/css/sass-compiled.css'
                ]
            }
        },

        cssmin: {
            build: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    'assets/css/site.css': 'assets/css/site.css'
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
