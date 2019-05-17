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

function watchTest() {
  gulp.watch('app/**/*.js', function() {
    console.log('Watch is working');
  });
};

// gulp.task('dbdump', function() {
//   const dbHelper   = require(path.join(__dirname, 'database', 'dbHelper'));
//   async.series([
//     function(callback) {
//       fs.mkdir(path.join(__dirname, 'dist', 'data'), function(err) {
//         if (_.isEqual(err.code, 'EEXIST')) {
//           console.log('Directory already exists. Creation was ignored.');
//           callback();
//         } else {
//           callback(err);
//         }
//       });
//     },
//     dbHelper.dump
//   ], function(err) {
//     'use strict';
//     let exitCode = 0;
//     if (err) {
//       exitCode = -1;
//       console.log('An error occurred');
//       console.log(err);
//     }
//     dbHelper.closeConnection(function() {
//       process.exit(exitCode);
//     });
//   });
// });

module.exports = {
  default: gulp.series(js, html, css),
  dev: gulp.series(js, html, css, gulp.parallel(watchJs, watchHtml, watchCss)),
  build: gulp.series(js, html, css),
  test: gulp.series(watchTest)
}
