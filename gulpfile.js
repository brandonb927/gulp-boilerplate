/**
 * Standard handler
 */

function errorHandler (err) {
  // Notification
  var notifier = new $.nodeNotifier.Notification();
  notifier.notify({ message: 'Error: ' + err.message });

  // Log to console
  $.util.log($.util.colors.red('Error'), err.message);
}


// Configuration paths and data
var config = {
    paths: {
        fonts: {
           src: ['src/fonts/**/*'],
           dest: 'dist/fonts'
        },
        images: {
           src: ['src/images/**/*'],
           dest: 'dist/images'
        },
        styles: {
           src: ['src/styles/less/**'],
           dest: 'dist/styles'
        },
        main_styles: {
           src: ['src/styles/less/main.less'],
           dest: 'dist/styles'
        },
        vendor_scripts: {
           src: ['src/scripts/vendor/**/*.js'],
           dest: 'src/scripts'
        },
        scripts: {
          src: [
            'src/scripts/**/*.js',
            '!src/scripts/{vendor-pack.js,vendor,vendor/**}'
          ],
          dest: 'dist/scripts'
        },
        clean: ['dist/*']
    },
    plugins: {
      pattern: '*' // wildcard fixes BrowserSync and other non `gulp-*`
                   // packages not being found while lazy-loading
    }
};


// Init Gulp and plugins
var path = require('path');
var gulp = require('gulp');
var $    = require('gulp-load-plugins')(config.plugins);


/**
 * Setup BrowserSync task
 */

var browserSyncTask = function () {
  $.browserSync({
    browser:  "google chrome",
    port:     9001,
    notify:   false,
    open:     false,
    server: {
      baseDir: "./dist"
    }
  });
};


/**
 * Compresses images
 */

var imagesTask = function (tmp) {
  return gulp.src(config.paths.images.src)
    .pipe($.plumber({ errorHandler: errorHandler }))
    .pipe(
      $.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest(config.paths.images.dest));
};


/**
 * Minify and uglify JS
 */

var vendorScriptsTask = function () {
  return gulp.src(config.paths.vendor_scripts.src)
    .pipe($.concat('vendor-pack.js'))
    .pipe(gulp.dest(config.paths.vendor_scripts.dest));
};

var scriptsTask = function () {
  return gulp.src(config.paths.scripts.src)
    .pipe($.plumber({ errorHandler: errorHandler }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    // .pipe($.uglify())
    .pipe(gulp.dest(config.paths.scripts.dest));
};


/**
 * Compile LESS/CSS styles
 */

var stylesTask = function () {
  // The process goes alitle somethin like dis:
  //  - run the less files through the less compiler
  //  - initialize the sourcemap to be written against the less
  //  - run the css through
  //      --autoprefixer for vendor prefxing, etc.
  //      -- pixrem to generate pixel values from rem values alongside eachother
  //  - concatenate everything into one file
  //  - write sourcemap after everything is done
  //  - reload browsersync so the new css can be injected into the page

  return gulp.src(config.paths.main_styles.src)
    .pipe($.plumber({ errorHandler: errorHandler }))
    .pipe($.sourcemaps.init())
      .pipe($.less())
      .pipe($.autoprefixer())
      .pipe($.pixrem())
      .pipe($.concat('site.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.paths.styles.dest));
};


/**
 * Minification and uglification takes place here
 */

var minifyScriptsTask = function () {
  return gulp.src(config.paths.scripts.dest + '/site.js')
    .pipe($.plumber({ errorHandler: errorHandler }))
    .pipe($.uglify())
    .pipe($.concat('site.min.js'))
    .pipe(gulp.dest(config.paths.scripts.dest));
};

var minifyStylesTask = function () {
  return gulp.src(config.paths.main_styles.dest + '/site.css')
    $.cssmin()
    .pipe($.concat('site.min.css'))
    .pipe(gulp.dest(config.paths.main_styles.dest));
};


/**
 * Font-related stuff
 */

var fontsTask = function () {
  return gulp.src(config.paths.fonts.src)
    .pipe(gulp.dest(config.paths.fonts.dest));
};


/**
 * Clean slate for dist directory
 */

var cleanTask = function () {
  $.del(config.paths.clean);
};


/**
 * Default task, from cli
 */

var defaultTask = function () {
  gulp.watch(config.paths.scripts.src, ['scripts', $.browserSync.reload]);
  gulp.watch(config.paths.styles.src,  ['styles',  $.browserSync.reload]);
  gulp.watch(config.paths.images.src,  ['images',  $.browserSync.reload]);
};


/**
 * Build task to be done before deploy to prod, from cli
 */

var buildTask = function () {
  gulp.start('images', 'fonts', 'minify_scripts', 'minify_styles');
};


/**
 * Individual tasks
 */

gulp.task('browser-sync',   browserSyncTask);
gulp.task('clean',          cleanTask);
gulp.task('images',         imagesTask);
gulp.task('fonts',          fontsTask);
gulp.task('styles',         stylesTask);
gulp.task('vendor_scripts', vendorScriptsTask);
gulp.task('scripts',        ['vendor_scripts'], scriptsTask);
gulp.task('minify_styles',  ['styles'],         minifyStylesTask);
gulp.task('minify_scripts', ['scripts'],        minifyScriptsTask);


/**
 * CLI tasks
 */

gulp.task('build', ['clean'], buildTask);
gulp.task('default', [
  'browser-sync',
  'images',
  'scripts',
  'styles',
  'fonts'
], defaultTask);
