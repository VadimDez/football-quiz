/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var babel = require('gulp-babel')

gulp.task('babel', function () {
  return gulp.src([
    '**/*.js',
    '!./dist/**',
    '!gulpfile.js',
    '!./node_modules/**'
  ])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('develop', ['babel'], function () {
  nodemon({
    script: './dist/index.js',
    ext: 'js',
    tasks: ['babel'],
    ignore : [
      './node_modules/**',
      './dist/**'
    ],
  })
    .on('restart', function () {
      console.log('restarting...');
    })
})


gulp.task('default', ['develop']);