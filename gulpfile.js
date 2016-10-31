const gulp 	 	 = require('gulp'),
	  uglify 	 = require('gulp-uglify'),
	  concat 	 = require('gulp-concat'),
	  coffee 	 = require('gulp-coffee'),
	  es 	 	 = require('event-stream'),
	  sass	 	 = require('gulp-ruby-sass'),
	  sourcemaps = require('gulp-sourcemaps'),
	  plumber	 = require('gulp-plumber'),
	  jade		 = require('gulp-jade'),
	  connect    = require('gulp-connect');
	  



//Scripts Task
gulp.task('scripts', () => {
	let jsScriptFromCoffe = gulp.src('src/js/**/*.coffee')
		.pipe(coffee());
	let js = gulp.src('src/js/**/*.js');
	return es.merge(jsScriptFromCoffe, js)
	.pipe(plumber())
	.pipe(concat('all.min.js'))
	.pipe(uglify())
	.pipe(connect.reload())
	.pipe(gulp.dest('app/js'));
});


//Style Tasck
gulp.task('sass', () => {
    sass('src/scss/**/*.scss', {sourcemap: true})
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(connect.reload())
        .pipe(gulp.dest('app/css'));
});


//HTML Template
gulp.task('jade', () => {
	return gulp.src('src/template/**/*.jade')
		.pipe(plumber())
		.pipe(jade())
		.pipe(connect.reload())
		.pipe(gulp.dest('app'));
});


//Watch tasks
gulp.task('watch', () => {
	gulp.watch('src/js/**/*.{js,coffee}', ['scripts']);
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/template/**/*.jade', ['jade']);
});

//Localhost Livereload
gulp.task('connect', function() {
  connect.server({
  	port: 8888,
    root: 'app',
    livereload: true
  });
});

//gulp
gulp.task('default', ['scripts', 'sass', 'jade', 'watch', 'connect']);