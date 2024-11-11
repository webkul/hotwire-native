const themePath = './assets/';
const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const terser = require('gulp-terser');


const compileLess = () => {
    return gulp.src(themePath + 'less/*.less')
        .pipe(less())
        .pipe(gulp.dest(themePath + 'build/css/'));
};

const minifyCss = function () {
    this.minCssPath = themePath + 'dist/css/';
    return gulp.src(themePath + 'build/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename(function (path) {
            path.basename += '.min';
            this.minCssPath = themePath + 'dist/css/';
        }))
        .pipe(gulp.dest(() => {
            return this.minCssPath
        }));
}

const minifyJs = () => {
    return gulp.src(themePath + 'javascript/application.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(themePath + 'dist/js/'))
}

const watchJs = () => {
    // gulp.watch(themePath + 'js/*.js', minifyJs);
    gulp.watch(themePath + 'javascript/application.js', minifyJs);
}

const watchCss = () => {
    gulp.watch(themePath + 'build/css/*.css', minifyCss);
}

const watchLess = () => {
    gulp.watch(themePath + 'less/**/*.less', compileLess);
}

const build = gulp.parallel(watchLess, watchCss, watchJs);

exports.watchLess = watchLess;
exports.watchCss = watchCss;
exports.watchJs = watchJs;
exports.compileLess = compileLess;
exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;
gulp.task('default', build);
