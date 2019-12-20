const gulp = require('gulp');
const { series } = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
var clean = require('gulp-clean');
const concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var nodemon = require('gulp-nodemon');
const exec = require('gulp-exec')


//Remove build directory.
gulp.task('clean', function(){
  return del('dist/**', {force:true});
});
function lint(cb) {
  gulp.src(['./**/*.js', '!node_modules/**/*', '!gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  cb();
}

function test(cb) {
  gulp.src('tests/test.js',['lint'], { read: false })
  // `gulp-mocha` needs filepaths so you can't have any plugins before it
    .pipe(mocha({ reporter: 'nyan' }));
  cb();
}
function build(){
  gulp.src('controllers/**/*.js')
  .pipe(gulp.dest('dist/controllers'));
  gulp.src('helper/**/*.js')
  .pipe(gulp.dest('dist/helper'));
  gulp.src('bin/**/*.js')
  .pipe(gulp.dest('dist/bin'));
  gulp.src('app.js')
  .pipe(gulp.dest('dist/'));
  gulp.src('models/**/*.js')
  .pipe(gulp.dest('dist/models'));
  gulp.src('routes/**/*.js')
  .pipe(gulp.dest('dist/routes'));

}
function start(){
  return gulp.src("./bin")
  .pipe(exec('nodemon www.js'))
  .pipe(exec.reporter());
}



exports.default = series(lint,test);
