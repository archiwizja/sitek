var gulp = require('gulp')
var concat = require('gulp-concat')
var uncss = require('gulp-uncss')
var sass = require('gulp-sass')(require('sass'))
var webserver = require('gulp-webserver');

gulp.task('assets', () => {
    return gulp.src('src/assets/**')
    .pipe(gulp.dest('dist/assets'))
})

gulp.task('index', () => {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('templates', () => {
    return gulp.src(['src/templates/*.html'])
    .pipe(gulp.dest('dist/templates'))
})

gulp.task('styles', () => {
    return gulp.src('src/styles/styles.scss')
    .pipe(sass())
    // .pipe(uncss({html: ['dist/index.html'], 
    // ignore: [
    //     ".header__nav--visible",
    // ]}))
    .pipe(gulp.dest('dist'))
})

gulp.task('scripts', () => {
    return gulp.src([
        'src/scripts/tools.js',
        'src/scripts/gallery.js',
        'src/scripts/menu.js',
        'src/scripts/router.js',
        ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', gulp.series('index', 'templates', 'scripts', 'assets', 'styles', ))

gulp.task('watch', () => {
    gulp.watch('src/index.html', gulp.series('index'))
    gulp.watch('src/templates/*.html', gulp.series('templates'))
    gulp.watch('src/scripts/*.js', gulp.series('scripts'))
    gulp.watch('src/styles/**/*.scss', gulp.series('styles'))
    gulp.watch('src/assets/**', gulp.series('assets'))
})

gulp.task('webserver', () => {
    return gulp.src('dist')
    .pipe(webserver({
        fallback: 'index.html',
        livereload: true,
        open: true
    }))
})

gulp.task('default', 
    gulp.series('build','webserver','watch')
)