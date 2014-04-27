module.exports = function(grunt) {
  grunt.config('suitcss', {
    site: {
      src: 'component.json',
      dest: 'assets/css/site.css'
    }
  });

  grunt.loadNpmTasks('grunt-suitcss');
};