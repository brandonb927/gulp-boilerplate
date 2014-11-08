var pluginsOptions = {
  pattern: '*' // wildcard fixes BrowserSync not being found
};

// Init Gulp and plugins
var gulp  = require('gulp');
var $     = require('gulp-load-plugins')(pluginsOptions);


// Setup BrowserSync task
gulp.task('browser-sync', function () {
  $.browserSync({
    browser: "google chrome",
    port: 9001,
    notify: false,
    server: {
      baseDir: "./dist"
    }
  });
});


// Compresses images
gulp.task('images', function (tmp) {
  gulp.src('src/images/**/*')
    .pipe(
      $.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest('dist/images'));
});


// Minify and uglify JS
gulp.task('vendor-scripts', function () {
  return gulp.src('src/scripts/vendor/**/*.js')
  .pipe($.concat('vendor-pack.js'))
  .on('error', $.util.log)
  .pipe($.uglify())
  .pipe(gulp.dest('src/scripts'));
});

gulp.task('scripts', ['vendor-scripts'], function () {
  return gulp.src([
    'src/scripts/**/*.js',
    '!src/scripts/{vendor,vendor/**}',
  ])
  .pipe($.jshint())
  .pipe($.jshint.reporter($.stylish))
  .pipe($.jshint.reporter('fail'))
  .on('error', $.util.log)
  .pipe($.uglify())
  .pipe(gulp.dest('dist/scripts'));
});


// Compile LESS/CSS styles
gulp.task('styles', function () {
  return gulp.src('src/styles/less/main.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .on('error', $.util.log)
    .pipe($.concat('styles.css'))
    .pipe(gulp.dest('dist/styles'));
});


// Copy fonts
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});


//
gulp.task('html', function () {
  return gulp.src('src/templates/**/*')
    .pipe(gulp.dest('dist/templates'));
});


gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});


gulp.task('deploy', function () {
  // grab any hidden files
  // gulp.src('src/.*')
  //   .pipe(gulp.dest('dist'));

  gulp.src('src/templates/*')
    .pipe(gulp.dest('dist/templates'));
});


// Clean slate for dist directory
gulp.task('clean', function () {
  del('dist');
});


gulp.task('default', ['browser-sync', 'scripts', 'styles', 'fonts'], function () {
  gulp.watch('src/scripts/src/**',    ['scripts', $.browserSync.reload]);
  gulp.watch('src/styles/less/**',    ['styles',  $.browserSync.reload]);
  gulp.watch('src/images/**',         ['images',  $.browserSync.reload]);
  gulp.watch('src/templates/*.html',  ['html',    $.browserSync.reload]);
});


gulp.task('deploy', ['clean'], function () {
  gulp.start('fonts', 'scripts', '', '');
});
