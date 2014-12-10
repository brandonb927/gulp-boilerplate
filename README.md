# Yet Another Front End Gulp Boilerplate

I noticed that every time I started a new project I was rebuilding the same `gulpfile.js` that I had used in my previous project, and with very similar requirements as well. This process becomes tiresome after awhile, so I decided that something had to be done for to fix it.


### Install

- Download or clone this repo with `git clone https://github.com/brandonb927/gulp-boilerplate.git`
- Run `npm install` to install the dev dependencies

This boilerplate comes bundled with Normalize.css and a basic structure for architecting your styles and scripts.


### Usage

Simply run `gulp`. This nets you:

- [BrowserSync](http://www.browsersync.io/) with livereload for cross-browser synchronized testing
- LESS CSS preprocessor
- `rem` to `px` support for older browsers, write in rems and have px automatically generated when compiled
- Autoprefixer support for prefix-free LESS/CSS
- Bower support for other front-end dependencies (comes with [DOMtastic](https://github.com/webpro/DOMtastic), a lightweight jQuery alternative)
- Filesystem watchers to recompile LESS/CSS/JS on file changes
- Outputted CSS/JS can be minified and compressed, while retaining sourcemaps
- JS Linting
- Image/SVG optimization

This is the default and only main task, however you can run the individual tasks themselves if you need to. 

Example:

    gulp browser-sync

The command above will run the browsersync server by itself. There are a few more tasks, be sure to check out the gulpfile for more.


### License

[MIT](http://opensource.org/licenses/MIT)
