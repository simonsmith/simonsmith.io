var gulp    = require('gulp');
var postcss = require('gulp-postcss');
var filter  = require('gulp-filter');
var rename  = require('gulp-rename');
var plugins = require('postcss-load-plugins')();

var processors = [
  plugins.import(),
  plugins.customProperties(),
  plugins.calc(),
  plugins.size,
  plugins.customMedia(),
  plugins.pxtorem({
    prop_white_list: [
      'font',
      'font-size',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left'
    ]
  }),
  plugins.nested(),
  plugins.autoprefixer(),
  plugins.logWarnings()
];

gulp.task('postcss', function() {
  return gulp.src('source/stylesheets/src/**/*.css')
    .pipe(postcss([
      // Parse the nested rules first so bemLinter doesn't choke
      plugins.nested(),
      plugins.bemLinter('suit'),
      plugins.logWarnings()
    ]))
    .pipe(filter(['index.css']))
    .pipe(postcss(processors))
    .pipe(rename('_components.css'))
    .pipe(gulp.dest('source/stylesheets/dist'))
});

gulp.task('css', ['postcss']);
gulp.task('default', ['css']);
gulp.task('watch', function() {
  gulp.watch('source/stylesheets/src/**/*.css', ['css']);
});
