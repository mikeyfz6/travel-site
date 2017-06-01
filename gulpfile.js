const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const simpleVars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const browserSync = require('browser-sync').create();



gulp.task('default', () => {
	console.log('Great you created a gulp task!!');
});

gulp.task('html', () => {
	console.log('Imagine something useful being done to your HTML here.');
});

gulp.task('styles', () => {
	return gulp.src('./app/assets/styles/styles.css')
	.pipe(postcss([cssImport, simpleVars, nested, autoprefixer]))
	.pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', () => {

	browserSync.init({
		notify: false,
		server: {
			baseDir: 'app'
		}
	});
	watch('./app/index.html', () => {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', () => {
		gulp.start('cssInject');
	});
});

gulp.task('cssInject', ['styles'],  () => {
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});

