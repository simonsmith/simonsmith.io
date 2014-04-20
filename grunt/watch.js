module.exports = function(grunt) {
  grunt.config('watch', {
    css: {
      files: 'suit_components/**/*.*',
      tasks: ['css'],
      options: {
        spawn: false
      }
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
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};