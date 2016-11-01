const gulp 	 	 = require('gulp'),
	  uglify 	 = require('gulp-uglify'),
	  concat 	 = require('gulp-concat'),
	  coffee 	 = require('gulp-coffee'),
	  es 	 	 = require('event-stream'),
	  sass	 	 = require('gulp-sass'),
	  sourcemaps = require('gulp-sourcemaps'),
	  plumber	 = require('gulp-plumber'),
	  jade		 = require('gulp-jade'),
	  connect    = require('gulp-connect'),
	  autoprefixer = require('gulp-autoprefixer'),
	  notify     = require('gulp-notify');
	  



//Scripts Task
gulp.task('scripts', () => {
	let jsScriptFromCoffe = gulp.src('src/js/**/*.coffee')
		.pipe(coffee());
	let js = gulp.src('src/js/**/*.js');
	return es.merge(jsScriptFromCoffe, js)
	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	.pipe(concat('all.min.js'))
	.pipe(uglify())
	.pipe(connect.reload())
	.pipe(gulp.dest('app/js'));
});


//Style Tasck
gulp.task('sass',  () => {
 return gulp.src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
  }))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(concat('all.min.css'))
  .pipe(sourcemaps.write('./maps'))
  .pipe(connect.reload())
  .pipe(gulp.dest('./app/css'));
});


//HTML Template
gulp.task('jade', () => {
	return gulp.src('src/template/**/*.jade')
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