module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            css: {
                files: 'assets/sass/**/*.scss',
                tasks: ['sass:dev', 'concat:css', 'autoprefixer']
            }
        },

        autoprefixer: {
            build: {
                files: {
                    'assets/css/main.css': ['assets/css/main.css']
                }
            }
        },

        concat: {
            css: {
                files: {
                    'assets/css/main.css': [
                        'bower_components/normalize-css/normalize.css',
                        'bower_components/suit-utils-**/*.css',
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
                    'assets/css/sass-compiled.css': ['assets/sass/main.scss']
                }
            }
        }
    });

    grunt.registerTask('default', [
        'sass:dev',
        'concat:css',
        'autoprefixer'
    ]);
};
