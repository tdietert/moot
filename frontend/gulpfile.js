var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var exec = require('child_process').exec;

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

gulp.task('bump-staticfiles', function() {
  return exec('touch ../src/Settings/StaticFiles.hs', function (err, stdout, stderr) {});
});

gulp.task('sass', function() {
  gulp.start('bump-staticfiles');
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(
      gulp.dest('../static/css')
    );
});

var watchTargets = [
  'sass',
  'bump-staticfiles'
];

gulp.task('default', watchTargets, function() {
  gulp.watch(['scss/**/*.scss'], watchTargets);
});
