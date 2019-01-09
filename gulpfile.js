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

build('uecuh'); // 腾达补贴购        清cookie
build('ueo'); // 腾达N300           清cookie
build('uebdn'); // 腾达AC9          清cookie
build('uebds'); // 腾达AC6          清cookie
build('tc'); // 烧包                清cookie
build('rumzr'); // 其他路由器       清cookie
build('hzt'); // 捷云2
build('hzo'); // 捷云1
build('gye'); // 斐讯2018
build('gyo'); // 斐讯2016           清cookie
build('wdlt', 'vc'); // vc昆时
build('wdqet', 'vc'); // vc平顶山1
build('wdqet2', 'vc'); // vc平顶山2
build('wdqet3', 'vc'); // vc平顶山3-胡松伟
build('wdma', 'vc'); // vc联众国际
build('ads');
