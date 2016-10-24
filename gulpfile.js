var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var cleancss   = require('gulp-clean-css');
var browserSync = require('browser-sync').create();


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './'
      });

    gulp.watch('js/*.js', ['js-watch']);
    gulp.watch('sass/*.sass', ['sass-watch']);
    gulp.watch('*.html').on('change', browserSync.reload);
  });

// process JS files and return the stream.
gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
  });

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function(done) {
    browserSync.reload();
    done();
  });

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
  });

// create a task that ensures the `sass` task is complete before
// reloading browsers
gulp.task('sass-watch', ['sass'], function(done) {
    browserSync.reload();
    done();
  });

gulp.task('default', ['serve']);
