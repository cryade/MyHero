const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if'); // new dependency added



// new function added to check if ESLint has run the fix
function isFixed(file) {
  return file.eslint !== null && file.eslint.fixed;
}

// new lint and fix task
gulp.task('eslint-fix-modules', () => {
  return gulp.src('modules/*.js',{base: './'})
      .pipe(eslint({fix: true,}))
      .pipe(eslint.formatEach())
  // if running fix - replace existing file with fixed one
      .pipe(gulpIf(isFixed, gulp.dest('./modules/')))
      .pipe(eslint.failAfterError());
});
gulp.task('eslint-fix-routes', () => {
    return gulp.src('routes/*.js')
        .pipe(eslint({fix: true,}))
        .pipe(eslint.formatEach())
    // if running fix - replace existing file with fixed one
        .pipe(gulpIf(isFixed, gulp.dest('./routes/')))
        .pipe(eslint.failAfterError());
  });
  gulp.task('eslint-fix-bin', () => {
    return gulp.src('bin/*.js')
        .pipe(eslint({fix: true,}))
        .pipe(eslint.formatEach())
    // if running fix - replace existing file with fixed one
        .pipe(gulpIf(isFixed, gulp.dest('./bin/')))
        .pipe(eslint.failAfterError());
  });
  gulp.task('eslint-fix-app', () => {
    return gulp.src('app.js')
        .pipe(eslint({fix: true,}))
        .pipe(eslint.formatEach())
    // if running fix - replace existing file with fixed one
        .pipe(gulpIf(isFixed, gulp.dest('./')))
        .pipe(eslint.failAfterError());
  });