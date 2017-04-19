const gulp       = require('gulp');
const sass       = require('gulp-ruby-sass');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const pug        = require('gulp-pug');

// 'dist' task for the first version of the application
gulp.task('browserify', function () {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function () {
  return sass('./stylesheets/style.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['browserify']);
  gulp.watch('stylesheets/**/*.scss', ['sass']);
});

gulp.task('fonts', function () {
  return gulp.src(['./node_modules/bootstrap-sass/assets/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('index', function buildHTML() {
  return gulp.src('views/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/'));
});

gulp.task('views', function buildHTML() {
  return gulp.src('views/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/views/'));
});

gulp.task('dist', ['browserify', 'sass', 'fonts', 'index', 'views', 'watch']);