module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadTasks('grunt');

  grunt.registerTask('css', [
    'suitcss'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'ftp-deploy'
  ]);

	grunt.registerTask('serve', [
		'jekyll:server'	
	]);

  grunt.registerTask('build', [
    'css',
    'jekyll:prod',
    'cssmin:prod'
  ]);
};
