module.exports = function(grunt) {
  grunt.config('jekyll', {
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
  });

  grunt.loadNpmTasks('grunt-jekyll');
};