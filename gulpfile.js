// Including var
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync' ).create();
// var livereload = require('gulp-livereload');

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// Scripts Task
// Uglify
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('src/bild/js'))
  .pipe(browserSync.stream());
});

// Styles Task
// Sass
gulp.task('sass', function(){
  gulp.src('src/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass({
    // When we want min file !
    // style: 'compressed'
  }))
  .pipe(prefix('last 2 versions'))
  .pipe(gulp.dest('src/css/'))
  .pipe(browserSync.stream());
  // .pipe(livereload());
});

// Image Task
// Compress
gulp.task('image', function(){
  gulp.src('src/image/*')
  .pipe(imagemin())
  .pipe(gulp.dest('src/image/'));
});

// Watch Task
gulp.task('watch', function(){

  browserSync.init({
    server: "./src"  
});
  // var server = livereload();

  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/scss/components/*.scss', ['sass']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['scripts','sass','image', 'watch']); 