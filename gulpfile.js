var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpLess = require('gulp-less');
var gulpCssMin = require('gulp-cssmin');
var gulpStripCssComments = require('gulp-strip-css-comments');
var gulpRename = require('gulp-rename');
var gulpHtmlReplace = require('gulp-html-replace');

gulp.task('styles', function() {
    gulp.src('./src/sass/flexbox-class.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./test/dist/sass/css'))
        .pipe(gulpStripCssComments())
        .pipe(gulp.dest('./dist'))
        .pipe(gulpCssMin())
        .pipe(gulpRename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/less/flexbox-class.less')
        .pipe(gulpLess().on('error', console.error.bind(console)))
        .pipe(gulp.dest('./test/dist/less/css'));
});

gulp.task('styles-test', function() {
    gulp.src('./test/src/sass/style.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./test/dist/sass/css'));

    gulp.src('./test/src/less/style.less')
        .pipe(gulpLess())
        .pipe(gulp.dest('./test/dist/less/css'));
});

gulp.task('move-test-files', function() {
    gulp.src('./test/src/**.html')
        .pipe(gulpHtmlReplace({
            items:  '<div class="item">1</div>' +
                    '<div class="item">2</div>' +
                    '<div class="item">3</div>' +
                    '<div class="item">4</div>' +
                    '<div class="item">5</div>' +
                    '<div class="item">6</div>' +
                    '<div class="item">7</div>' +
                    '<div class="item">8</div>' +
                    '<div class="item">9</div>' +
                    '<div class="item">10</div>',
            items_position: '<div class="item">1</div>' +
                            '<div class="item">2</div>' +
                            '<div class="item">3</div>' +
                            '<div class="item">4</div>'
        }))
        .pipe(gulp.dest('./test/dist/sass'))
        .pipe(gulp.dest('./test/dist/less'));
});

gulp.task('watch', function() {
    //style
    gulp.watch('components/**/*.scss', ['styles']);
    gulp.watch('components/**/*.less', ['styles']);
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/less/**/*.less', ['styles']);
    //test style
    gulp.watch('./test/src/sass/**/*.scss', ['styles-test']);
    gulp.watch('./test/src/less/**/*.less', ['styles-test']);
    //test
    gulp.watch('./test/src/**/*.html', ['move-test-files']);
});

gulp.task('default', ['styles', 'styles-test', 'move-test-files']);
