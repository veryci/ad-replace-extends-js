const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
// const connect = require('gulp-connect');
const replace = require('gulp-replace');
const config = require('config');

const adReplace640 = config.get('adReplace640');
const adReplace300 = config.get('adReplace300');
const adFixed640 = config.get('adFixed640');
const adFixed300 = config.get('adFixed300');
const ad0x0 = config.get('ad0x0');

gulp.task('watch', () => {
  gulp.watch('./src/*.js', ['dev']);
});

function build(env, v) {
  gulp.task(`${env}`, () => {
    const entries = v === 'vc' ? './src/vc.js' : './src/index.js';
    browserify({
      entries,
      debug: true,
    }).transform(babelify.configure({
      presets: ['es2015'],
    })).bundle().pipe(source(`${env}.js`))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(replace('%AD_REPLACE640', adReplace640))
      .pipe(replace('%AD_REPLACE300%', adReplace300))
      .pipe(replace('%AD_FIXED640%', adFixed640))
      .pipe(replace('%AD_FIXED300%', adFixed300))
      .pipe(replace('%AD_0XO%', ad0x0))
      .pipe(gulp.dest('./lib/cdn'));
  });
}
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
build('wdlt', 'vc');
build('wdqet', 'vc');
build('ads');
