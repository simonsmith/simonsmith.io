module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
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
        }
    });


    grunt.registerTask('default', [
        'sass',
        'autoprefixer',
    ]);
};
