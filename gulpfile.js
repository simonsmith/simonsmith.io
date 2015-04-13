var fs   = require('fs');
var path = require('path');

var taskDir = path.resolve('./gulp/tasks');
var tasks = fs.readdirSync(taskDir);

tasks.forEach(function(file) {
  require(path.join(taskDir, file))
});

