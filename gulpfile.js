const gulp       = require('gulp');
const sass       = require('gulp-ruby-sass');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const pug        = require('gulp-pug');


// 'dist-mdl' task for the mdl version of the application
gulp.task('browserify', function () {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('index', function () {
  return gulp.src('views/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/')); // tell gulp our output folder
});

gulp.task('views', function () {
  return gulp.src('views/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/views/')); // tell gulp our output folder
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

gulp.task('dist', ['browserify', 'index', 'views', 'sass', 'watch']);