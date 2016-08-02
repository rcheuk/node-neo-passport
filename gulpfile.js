var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// base task for starting server 
gulp.task('serve', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:3000",  
    port: 5000,  
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return plugins.nodemon({
    script: 'server/server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['serve'], function () {
  gulp.watch(['client/*.html','client/**/*.html'], reload);
});

/*// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);*/
