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
const adContentPath = config.get('adContentPath');


gulp.task('watch', () => {
  gulp.watch('./src/*.js', ['dev']);
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
    .pipe(replace('%CP_ID%', cpId))
    .pipe(replace('%AD_CONTENT_PATH%', adContentPath))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('vc', () => {
  browserify({
    entries: './src/vc.js',
    debug: true,
  }).transform(babelify.configure({
    presets: ['es2015'],
  })).bundle().pipe(source('ad-extends-vc.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(replace('%CP_ID%', cpId))
    .pipe(replace('%AD_CONTENT_PATH%', adContentPath))
    .pipe(gulp.dest('./lib/'));
});

function build(env) {
  gulp.task(`${env}`, () => {
    browserify({
      entries: `./src/${env}/index.js`,
      debug: true,
    }).transform(babelify.configure({
      presets: ['es2015'],
    })).bundle().pipe(source(`${env}.js`))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./lib/cdn'));
  });
}
build('ads');
build('uecuh');
build('ueo');
build('uebdn');
build('uebds');
build('tc');
build('rumzr');
build('hzt');
build('hzo');
build('gye');
build('gyo');
build('wdlt');
build('wdqet');
build('test');
