# Yet Another Front End Gulp Boilerplate

I noticed that every time I started a new project I was rebuilding the same `gulpfile.js` that I had used in my previous project, and with very similar requirements as well. This process becomes tiresome after awhile, so I decided that something had to be done for to fix it.


### Install

- Download or clone this repo with `git clone https://github.com/brandonb927/gulp-boilerplate.git`
- Run `npm install` to install the dev dependencies


### What it does

Simply run `gulp`. This is the default and only main task. 

You'll have filesystem watchers and BrowserSync with livereload, plus your images will be optimized, and your CSS/JS minified and compressed which is all output into the `dist` folder. If you modify any HTML, Less, or Javascript files, you'll see your browser get updated on it's own, and if you access the project from another web-capable device, the scroll-position of the page will also be in sync across devices!


### License

[MIT](http://opensource.org/licenses/MIT)
