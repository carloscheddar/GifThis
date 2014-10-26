var gulp = require('gulp');

// Plugins
var compass = require('gulp-compass'),
    coffee = require('gulp-coffee');

// Paths
var basePath = './assets/';
var paths = {
  sass: basePath + 'sass/',
  css: basePath + 'css/',
  coffee: basePath + 'coffee/',
  js: basePath + 'js/',
  images: basePath + 'images/',
};

/**
 * Compile SASS down to CSS using compass
 */
function compileCSS() {
  var stream = gulp.src(paths.sass + '**/*.sass')
  .pipe(compass({
    css: 'assets/css',
    sass: 'assets/sass',
  }))
  .on('error', console.log)
  .pipe(gulp.dest('assets/css'));
  return stream;
}

/**
 * Compile Coffee down to JS
 */
function compileJS() {
  var stream = gulp.src(paths.coffee + '**/*.coffee')
    .pipe(coffee({bare: true})
    .on('error', console.log))
    .pipe(gulp.dest(paths.js));
  return stream;
}

function watch() {
  gulp.watch(paths.sass + '**', ['css']);
  gulp.watch(paths.coffee + '**', ['js']);
}

// CSS -> Sass
gulp.task('css', compileCSS);
gulp.task('compass', compileCSS);
// Coffee -> JS
gulp.task('coffee', compileJS);
gulp.task('js', compileJS);
// Watch
gulp.task('watch', watch);
// Default: this runs when you type gulp
gulp.task('default', ['css', 'js', 'watch']);
