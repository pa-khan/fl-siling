
// PATHS
const DIR_SOURCE    = 'source/',
	  DIR_SRC      = DIR_SOURCE  + 'src/',
	  DIR_DIST     = DIR_SOURCE  + 'dist/',
	  DIR_TEMP     = DIR_SRC    + '_/templates/temp/',
	  DIR_PUG      = DIR_TEMP   + 'markup/pug/',
	  DIR_STYLES   = DIR_TEMP   + 'styles/',
	  DIR_SASS     = DIR_STYLES + 'sass/',
	  DIR_CSS      = DIR_STYLES + 'css/',
	  DIR_JS       = DIR_TEMP   + 'scripts/js/',
	  DIR_LIBS     = DIR_TEMP   + 'libs/';


var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith  = require('gulp.spritesmith'),
	pug          = require('gulp-pug');



gulp.task('sprite', function () {
	var spriteData = gulp.src(DIR_TEMP + 'img/icons/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.sass'
	}));
	return spriteData.pipe(gulp.dest(DIR_TEMP + 'sprite/'));
});

gulp.task('sass', function(){
	return gulp.src(DIR_SASS + '**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest(DIR_TEMP + 'styles/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: DIR_SRC
		},
		notify: false
	});
});

gulp.task('pug', function(){
	return gulp.src(DIR_PUG + 'pages/**/*.pug')
	.pipe(pug())
	.pipe(gulp.dest(DIR_SRC))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		DIR_LIBS + 'jquery/dist/jquery.js',
		DIR_LIBS + 'jquery-mask-plugin/dist/jquery.mask.js',
		DIR_LIBS + 'slick-carousel/slick/slick.js',
		DIR_LIBS + 'fancybox/dist/jquery.fancybox.js',
		DIR_LIBS + 'nouislider/distribute/nouislider.js',

	])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest(DIR_JS));
});



gulp.task('css-libs', gulp.parallel('sass'), function() {
	return gulp.src(DIR_CSS + 'libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(DIR_CSS));
});

gulp.task('watch', function() {
	gulp.watch(DIR_SASS + '**/*.sass', gulp.parallel('sass'));
	gulp.watch(DIR_JS   + '**/*.js', browserSync.reload);
	gulp.watch(DIR_SRC + '**/*.pug', gulp.parallel('pug'));
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src(DIR_TEMP + 'img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});


gulp.task('default', gulp.parallel('watch', 'pug', 'browser-sync', 'css-libs', 'scripts'));
