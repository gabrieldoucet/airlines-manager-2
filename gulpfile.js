const gulp       = require('gulp');
const sass       = require('gulp-ruby-sass');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const pug        = require('gulp-pug');


// 'dist-mdl' task for the mdl version of the application
gulp.task('browserify', function () {
  return browserify('./app/app-mdl.js')
    .bundle()
    .pipe(source('main-mdl.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('views', function buildHTML() {
  return gulp.src('views/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/views/')); // tell gulp our output folder
});

gulp.task('sass', function () {
  return sass('./stylesheets/style-mdl.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['browserify-mdl']);
  gulp.watch('stylesheets/**/*.scss', ['sass-mdl']);
});


gulp.task('dist', ['browserify', 'views', 'sass', 'watch']);