# Yet Another Front End Gulp Boilerplate

I noticed that every time I started a new project I was rebuilding the same `gulpfile.js` that I had used in my previous project, and with very similar requirements as well. This process becomes tiresome after awhile, so I decided that something had to be done for to fix it.


### Install

- Download or clone this repo with `git clone https://github.com/brandonb927/gulp-boilerplate.git`
- Run `npm install` to install the dev dependencies


### What it does

Simply run `gulp`. This is the default and only main task. This nets you:

- [BrowserSync](http://www.browsersync.io/) with livereload for cross-browser synchronized testing
- LESS CSS preprocessor
- `rem` to `px` support for older browsers
- filesystem watchers to recompile LESS/CSS/JS on file changes
- outputted CSS/JS can be minified and compressed, while retaining sourcemaps
- image/svg optimization


### License

[MIT](http://opensource.org/licenses/MIT)
