module.exports = function(grunt) {
  grunt.config('ftp-deploy', {
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
  });

  grunt.loadNpmTasks('grunt-ftp-deploy')
};