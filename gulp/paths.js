var path = require('path');
var cssDir = path.resolve('./source/stylus');

var paths = {
  css: {
    stylusSrc: path.join(cssDir, '**/*.styl'),
    dest: path.resolve('./source/stylesheets'),
    tmpDir: path.resolve('./.css-compiled'),
    mainFile: 'main.css',
    builtFile: '_components.css'
  }
};

module.exports = paths;
