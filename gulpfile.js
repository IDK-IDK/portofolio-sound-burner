 
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require ('gulp-clean-css');
const uglify = require ('gulp-uglify');
const rename = require('gulp-rename');
// const browserSync = require ('browser-sync').create();
 
 
gulp.task('sassToCSSmin', function() {
  return gulp.src('app/sass/*.sass')
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 50 versions'],
      cascade: false}))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('sassToCSS', function() {
    return gulp.src('app/sass/*.sass')
        .pipe(sass({
            errorLogToConsole: true,
            // outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 50 versions'],
            cascade: false}))
        .pipe(gulp.dest('public/css/'));
});
 
 
gulp.task('copyJSmin', function() {
  return gulp.src('app/js/*.js')
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('copyJS', function() {
    return gulp.src('app/js/*.js')
        .pipe(sass({
            errorLogToConsole: true,
            // outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('public/js/'));
});
 
 
/*gulp.task('synch', function() {
  browserSync.init({
    server: 'public'
  });
  browserSync.watch('public/!**!/!*.*').on('change', browserSync.reload);
});*/
 
gulp.task('watchFiles', function() {
  gulp.watch('app/sass/*.sass', gulp.parallel('sassToCSS','sassToCSSmin'));
  gulp.watch('app/js/*.js', gulp.parallel('copyJS', "copyJSmin"));
});
 
 
 
gulp.task('default', gulp.parallel('watchFiles'));
 
