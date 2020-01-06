const path = require('path');
const gulp = require('gulp');
const bro = require('gulp-bro');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function externalCss() {
  const popeyeCss = path.join(__dirname, 'node_modules', 'angular-popeye', 'release', 'popeye.css');
//  const fontAwesomeCss = path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free', 'css', 'all.css');
  const customBootstrap = path.join(__dirname, 'node_modules', 'gd-bootstrap', 'dist', 'css', 'gd-bootstrap.css');
  const cssFiles = [popeyeCss, customBootstrap];
  return gulp
    .src(cssFiles)
    .pipe(gulp.dest(path.join(__dirname, 'dist', 'stylesheets')));
}

function js() {
  return gulp
    .src(path.join(__dirname, 'app', 'app.js'))
    .pipe(bro())
    .pipe(rename('main.js'))
    .pipe(gulp.dest('dist/scripts'));
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
  default: gulp.series(externalCss, js, html, css),
  dev: gulp.series(js, html, externalCss, css, gulp.parallel(watchJs, watchHtml, watchCss)),
  build: gulp.series(externalCss, js, html, css)
}
