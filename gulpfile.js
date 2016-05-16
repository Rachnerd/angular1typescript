var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('./tsconfig.json'),
    browserSync = require('browser-sync').create(),
    inject = require('gulp-inject'),
    sourcemaps = require('gulp-sourcemaps');

// gulp
gulp.task('default', ['serve'], function () {
});
// gulp build
gulp.task('serve', ['clean'], function () {
    runSequence('copy:libs','ts-compile', 'js-copy', 'inject', 'html-copy', 'css-copy', 'copy:favicon', 'ts-watch', 'browser-sync')
});
// delete dist folder
gulp.task('clean', function (cb) {
    return rimraf('./dist', cb);
});

gulp.task('copy:libs', function () {
    var paths = [
        'node_modules/angular/angular.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/@angular/router/angular1/angular_1_router.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ];
    return gulp.src(paths)
        .pipe(gulp.dest('./dist/libs'));
});

gulp.task('inject', function () {
    return gulp.src('src/index.html')
        .pipe(inject(gulp.src(['./dist/libs/**/*.js', './dist/libs/**/*.css'], {read: false}), {
            ignorePath: 'dist'
        }))
        .pipe(gulp.dest('src'));
});
// compile typescript to javascript and place files in dist
gulp.task('ts-compile', function () {
    return gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
});
// watch TS files and compile when changed
gulp.task('ts-watch', function () {
    gulp.watch('./src/**/*.ts', ['ts-compile']);
});
// copy and watch html
gulp.task('html-copy', function () {
    gulp.src(['src/**/*.html'])
        .pipe(watch('src/**/*.html'))
        .pipe(gulp.dest('dist'));
});
// copy and watch js
gulp.task('js-copy', function () {
    gulp.src(['src/!(libs)/*.js', 'src/*.js'])
        .pipe(watch('src/**/*.js'))
        .pipe(gulp.dest('dist'));
});
// copy and watch css
gulp.task('css-copy', function () {
    gulp.src('src/**/*.css')
        .pipe(watch('src/**/*.css'))
        .pipe(gulp.dest('dist'));
});
gulp.task('copy:favicon', function () {
    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('dist'));
});
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ['dist', 'dist/src']
        },
        files: [
            'dist/**/*.js',
            'dist/**/*.html',
            'dist/**/*.css'
        ],
        logLevel: 'silent', //debug || info
        notify: false,
        online: true
    });
});