// I sadly didn't have the time to get this to actually work 

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleancss = require('gulp-clean-css');

​
const { series } = require('gulp');
​
​
// Remove build directory.
function clean() {
    return del(['dist']);
}
​
// Lint all custom TypeScript files
async function lint() {
    return gulp.src(['src/*.ts', 'src/app/*.ts', 'src/app/components/**/*.ts', 'src/app/models/*.ts', "src/app/services/*.ts"])
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
}
​
// Compile TypeScript sources and create sourcemaps in build directory
async function tsFiles() {
    return gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write(".", { sourceRoot: '/src' }))
        .pipe(gulp.dest('dist/ts'));
}
​
// Gulp task to minify HTML files
async function htmlFiles() {
    return gulp.src(['./src/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist/html'));
}
​
​
async function sassFiles() {
    return gulp.src(['src/*.scss', 'src/app/*.scss', 'src/app/components/**/*.scss'])
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css'));
};
​
exports.default = (clean, series(lint, tsFiles, htmlFiles, sassFiles))