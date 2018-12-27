const gulp       = require('gulp');
const sass       = require('gulp-sass');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const pug        = require('gulp-pug');
const async      = require('async');
const fs         = require('fs');
const path       = require('path');
const _          = require('lodash');

sass.compiler = require('node-sass');

gulp.task('browserify', function () {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('views', function () {
  return gulp.src('views/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/views/')); // tell gulp our output folder
});

gulp.task('sass', function () {
  return gulp.src('./stylesheets/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('watch-js', function() {
    gulp.watch(['app/**/*.js'], ['browserify'])
});

gulp.task('watch-sass', function() {
    gulp.watch(['stylesheets/**/*.scss'], ['sass'])
});


gulp.task('dbdump', function () {
  const dbHelper   = require(path.join(__dirname, 'database', 'dbHelper'));
  async.series([
    function (callback) {
      fs.mkdir(path.join(__dirname, 'dist', 'data'), function (err) {
        if (_.isEqual(err.code, 'EEXIST')) {
          console.log('Directory already exists. Creation was ignored.');
          callback();
        } else {
          callback(err);
        }
      });
    },
    dbHelper.dump
  ], function (err) {
    'use strict';
    let exitCode = 0;
    if (err) {
      exitCode = -1;
      console.log('An error occurred');
      console.log(err);
    }
    dbHelper.closeConnection(function () {
      process.exit(exitCode);
    });
  });
});

gulp.task('default', gulp.series('browserify', 'views', 'sass', 'watch-js', 'watch-sass'));
gulp.task('dev', gulp.series('browserify', 'views'));
gulp.task('dist', gulp.series('dbdump', 'browserify', 'views', 'sass'));
