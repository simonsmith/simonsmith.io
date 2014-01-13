module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            css: {
                files: 'assets/sass/**/*.scss',
                tasks: ['css']
            },
            html: {
                files: [
                    '_layouts/*.html',
                    '_includes/*.html',
                    'assets/css/*.css',
                    '_data/*.yml',
                    'blog/_posts/*.md',
                    'blog/_drafts/*.md',
                    'projects/_posts/*.md',
                    './*.html'
                ],
                tasks: ['jekyll:dev']
            }
        },

        autoprefixer: {
            build: {
                src: 'assets/css/site.css',
                dest: 'assets/css/site.css'
            }
        },

        concat: {
            css: {
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

        jekyll: {
            server: {
                options: {
                    serve: true,
                    drafts: true
                }
            },
            dev: {
                options: {
                    drafts: true
                }
            },
            prod: {
                // Use defaults
            }
        },

        cssmin: {
            prod: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    '_site/assets/css/site.css': '_site/assets/css/site.css'
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
        },

        'ftp-deploy': {
            deploy: {
                auth: {
                    host: 'simonsmith.io',
                    port: 21,
                    authKey: 'me'
                },
                src: './_site',
                dest: '/public_html',
                exclusions: ['./_site/assets/images/uploads']
            }
        }
    });

    grunt.registerTask('css', [
        'sass:dev',
        'autoprefixer',
        'concat:css'
    ]);

    grunt.registerTask('default', [
        'css',
        'jekyll:prod',
        'cssmin:prod',
        'ftp-deploy'
    ]);
};
