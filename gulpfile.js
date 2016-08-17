var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var wiredep = require('wiredep').stream;

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'wiredep'], function() {

	browserSync.init({
		server: {
			baseDir: 'app',
			index: 'index.html',
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch('app/**/*').on('change', browserSync.reload);

    gulp.watch('bower.json', ['wiredep']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('wiredep', function () {
  gulp.src('app/*.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task('build', function() {
  return gulp.src([
    'app/**/*.css',
    'app/**/*.js',
    'app/*.html'
    ], {dot: true})
       .pipe(gulp.dest('build'));
});