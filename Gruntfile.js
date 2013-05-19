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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
