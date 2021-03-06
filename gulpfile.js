const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
// const connect = require('gulp-connect');
const replace = require('gulp-replace');
const config = require('config');

const cpId = config.get('cpId');
const jsId = config.get('jsId');
const adContentPath = config.get('adContentPath');


gulp.task('dev', () => {
  browserify({
    entries: './src/index.js',
    debug: true,
  }).transform(babelify.configure({
    presets: ['es2015'],
  })).bundle().pipe(source('ad-extends-dev.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(replace('%CP_ID%', cpId))
    .pipe(replace('%JS_ID%', jsId))
    .pipe(replace('%AD_CONTENT_PATH%', adContentPath))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('default', () => {
  browserify({
    entries: './src/index.js',
    debug: true,
  }).transform(babelify.configure({
    presets: ['es2015'],
  })).bundle().pipe(source('ad-extends.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(replace('%AD_CONTENT_PATH%', adContentPath))
    .pipe(gulp.dest('./lib/'));
});


gulp.task('prod', () => {
  browserify({
    entries: './src/index.js',
    debug: true,
  }).transform(babelify.configure({
    presets: ['es2015'],
  })).bundle().pipe(source('ad-extends-prod.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(replace('%AD_CONTENT_PATH%', adContentPath))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('beta', () => {
  browserify({
    entries: './src/index.js',
    debug: true,
  }).transform(babelify.configure({
    presets: ['es2015'],
  })).bundle().pipe(source('ad-extends-beta.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(replace('%AD_CONTENT_PATH%', adContentPath))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('alpha', () => {
  browserify({
    entries: './src/index.js',
    debug: true,
  }).transform(babelify.configure({
    presets: ['es2015'],
  })).bundle().pipe(source('ad-extends-alpha.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(replace('%AD_CONTENT_PATH%', adContentPath))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('test', () => {
  browserify({
    entries: './src/test.js',
    debug: true,
  }).transform(babelify.configure({
    presets: ['es2015'],
  })).bundle().pipe(source('test.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(replace('%CP_ID%', cpId))
    .pipe(replace('%AD_CONTENT_PATH%', adContentPath))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('watch', () => {
  gulp.watch('./src/*.js', ['dev']);
});
