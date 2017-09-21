var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var replace = require('gulp-string-replace');

gulp.task('sass', function () {
	gulp.src(['./css/**/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('../wordpress/wp-content/themes/lanwar-17'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('sassDev', function () {
	gulp.src(['./css/**/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./build'));
});

gulp.task('sassDev:watch', function () {
	gulp.watch('./css/**/*.scss', ['sassDev']);
});

gulp.task('css', function () {    
	gulp.src(['./css/**/*.css'])
		.pipe(gulp.dest('../wordpress/wp-content/themes/lanwar-17'));
});

gulp.task('css:watch', function () {
	gulp.watch('./css/**/*.css', ['css']);
});

gulp.task('cssDev', function () {    
	gulp.src(['./css/**/*.css'])
		.pipe(gulp.dest('./build'));
});

gulp.task('cssDev:watch', function () {
	gulp.watch('./css/**/*.css', ['cssDev']);
});

gulp.task('images', function () {
	return gulp.src(['./images/**', '!/**/build', '!/**/build/**'])
		.pipe(gulp.dest('../wordpress/wp-content/themes/lanwar-17/images'));
});

gulp.task('images:watch', function () {
	gulp.watch('./images/**', ['images']);
});

gulp.task('imagesDev', function () {
	return gulp.src(['./images/**', '!/**/build', '!/**/build/**'])
		.pipe(gulp.dest('./build/images'));
});

gulp.task('imagesDev:watch', function () {
	gulp.watch('./images/**', ['imagesDev']);
});

gulp.task('php', function () {    
	gulp.src(['./php/**/*.php'])
		.pipe(gulp.dest('../wordpress/wp-content/themes/lanwar-17'));
});

gulp.task('php:watch', function () {
	gulp.watch('./php/**/*.php', ['php']);
});

gulp.task('js', function () {    
	gulp.src('./js/**/*.js')
		.pipe(gulp.dest('../wordpress/wp-content/themes/lanwar-17'));
});

gulp.task('js:watch', function () {
	gulp.watch('./js/**/*.js', ['js']);
});

gulp.task('jsDev', function () {    
	gulp.src('./js/**/*.js')
		.pipe(gulp.dest('./build'));
});

gulp.task('jsDev:watch', function () {
	gulp.watch('./js/**/*.js', ['jsDev']);
});

gulp.task('htmlDev', function() {
	gulp.src(['header.html', 'index.html', 'footer.html'])
		.pipe(concat('index.html'))
		.pipe(gulp.dest('./build'));
});

gulp.task('htmlDev:watch', function() {
	gulp.watch('./**/*.html', ['htmlDev']);
});

gulp.task('devReplaceHtml', function() {
	gulp.src(['header.html', 'index.html', 'footer.html'])
		.pipe(concat('index.html'))
		.pipe(replace('/wp-content/themes/lanwar-17/', ''))
		.pipe(gulp.dest('./build'));
});

gulp.task('devReplaceSass', function() {
	gulp.src(['./css/**/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('/wp-content/themes/lanwar-17/', ''))
		.pipe(gulp.dest('./build'));
});

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
    	port: 9000,
      livereload: true,
      directoryListing: false,
      host: '0.0.0.0',
      fallback: 'index.html',
      proxies: [{source: '/wp-content/themes/lanwar-17', target: 'http://127.0.0.1:9000/'}]
    }));
});

gulp.task('default', ['images', 'images:watch', 'sass', 'sass:watch', 'css', 'css:watch', 'php', 'php:watch', 'js', 'js:watch']);
gulp.task('dev', ['imagesDev', 'imagesDev:watch', 'sassDev', 'sassDev:watch', 'cssDev', 'cssDev:watch', 'jsDev', 'jsDev:watch', 'htmlDev', 'htmlDev:watch', 'webserver']);
gulp.task('dev-build', ['imagesDev', 'cssDev', 'jsDev', 'devReplaceHtml', 'devReplaceSass']);