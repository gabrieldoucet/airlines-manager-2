const path = require('path');
const gulp = require('gulp');
const bro = require('gulp-bro');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function js() {
  return gulp
    .src(path.join(__dirname, 'app', 'app.js'))
    .pipe(bro())
    .pipe(rename(path.join(__dirname, 'dist', 'main.js')))
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
};

function html() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
};

function css() {
  return gulp.src(path.join(__dirname, 'app', 'stylesheets', 'style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(__dirname, 'dist', 'stylesheets')));
};

function watchJs() {
  gulp.watch(['app/**/*.js'], js);
};

function watchCss() {
  gulp.watch(['app/stylesheets/**/*.scss'], css);
};

function watchHtml() {
  gulp.watch(['app/**/*.html'], html);
};

module.exports = {
  default: gulp.series(js, html, css),
  dev: gulp.series(js, html, css, gulp.parallel(watchJs, watchHtml, watchCss)),
  build: gulp.series(js, html, css)
}
