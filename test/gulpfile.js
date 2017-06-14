var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {
    return gulp.src('app/css/**/*.less')
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist'));
});
gulp.task('clean', function () {
    return del('dist');
});
gulp.task('assets', function () {
    return gulp.src('app/assets/**')
        .pipe(gulp.dest('dist'));
});
gulp.task('default', ['assets', 'styles'], function () {

});
gulp.task('build', ['assets', 'styles'], function () {

});