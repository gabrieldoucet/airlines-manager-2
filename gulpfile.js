const gulp       = require('gulp');
const sass       = require('gulp-sass');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const pug        = require('gulp-pug');

sass.compiler = require('node-sass');

function js() {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js/'));
};

function html() {
  return gulp.src('views/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/views/')); // tell gulp our output folder
};

function css() {
  return gulp.src('./app/stylesheets/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/stylesheets'));
};

function watchJs() {
  gulp.watch(['app/**/*.js'], js);
};

function watchCss() {
  gulp.watch(['app/stylesheets/**/*.scss'], css);
};

function watchHtml() {
  gulp.watch(['views/**/*.pug'], html);
};

module.exports = {
  default: gulp.series(js, html, css),
  dev: gulp.series(js, html, css, gulp.parallel(watchJs, watchHtml, watchCss)),
  build: gulp.series(js, html, css)
}
