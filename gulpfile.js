var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function () {
  return sass('./stylesheets/style.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['browserify']);
  gulp.watch('stylesheets/**/*.scss', ['sass']);
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src(['./node_modules/bootstrap-sass/assets/fonts/**/*'])
  .pipe(gulp.dest('public/fonts/'));
});

gulp.task('default', ['browserify', 'sass', 'fonts', 'watch']);