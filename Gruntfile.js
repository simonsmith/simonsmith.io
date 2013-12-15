module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            css: {
                files: 'assets/sass/**/*.scss',
                tasks: ['sass:dev', 'autoprefixer']
            },
            html: {
                files: [
                    '_layouts/*.html',
                    '_includes/*.html',
                    '_data/*.yml',
                    'blog/_posts/*.md',
                    'projects/_posts/*.md',
                    './*.html'
                ],
                tasks: ['jekyll:build']
            }
        },

        autoprefixer: {
            build: {
                src: 'assets/css/site.css',
                dest: 'assets/css/site.css'
            }
        },

        jekyll: {
            server: {
                options: {
                    serve: true
                }
            },
            build: {
                // Use defaults
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

    grunt.registerTask('css', [
        'sass:dev',
        'autoprefixer'
    ]);

    grunt.registerTask('default', [
        'css',
        'jekyll:build'
    ]);
};
