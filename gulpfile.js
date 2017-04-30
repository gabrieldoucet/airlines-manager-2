const gulp       = require('gulp');
const sass       = require('gulp-ruby-sass');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const pug        = require('gulp-pug');
const async      = require('async');
const fs         = require('fs');
const path       = require('path');
const _          = require('lodash');
const dbHelper   = require(path.join(__dirname, 'database', 'dbHelper'));

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
  return sass('./stylesheets/style.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['browserify']);
  gulp.watch('stylesheets/**/*.scss', ['sass']);
});

gulp.task('dbdump', function () {
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

gulp.task('default', ['browserify', 'index', 'views', 'sass', 'watch']);
gulp.task('dev', ['browserify', 'views', 'sass', 'watch']);
gulp.task('dist', ['dbdump', 'browserify', 'views', 'sass']);