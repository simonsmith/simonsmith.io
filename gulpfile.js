const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');

gulp.task('icons', () => {
  return gulp.src(['source/svg/*.svg'])
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('icons.svg'))
    .pipe(gulp.dest('source/icons'));
});
