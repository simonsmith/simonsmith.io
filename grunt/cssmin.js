module.exports = function(grunt) {
  grunt.config('cssmin', {
    prod: {
      options: {
        keepSpecialComments: 0
      },
      files: {
        '_site/assets/css/site.css': '_site/assets/css/site.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};