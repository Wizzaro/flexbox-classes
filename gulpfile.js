var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpCssMin = require('gulp-cssmin');
var gulpStripComments = require('gulp-strip-comments');
var gulpRename = require('gulp-rename');
var gulpHtmlReplace = require('gulp-html-replace');

gulp.task('styles', function() {
    gulp.src('./src/flexbox-class.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./test/dist/css'))
        .pipe(gulpStripComments())
        .pipe(gulp.dest('./dist'))
        .pipe(gulpCssMin())
        .pipe(gulpRename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles-test', function() {
    gulp.src('./test/src/sass/style.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./test/dist/css'));
});

gulp.task('move-files', function() {
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
        .pipe(gulp.dest('./test/dist'));
});

gulp.task('watch', function() {
    //style
    gulp.watch('components/**/*.scss', ['styles']);
    gulp.watch('src/**/*.scss', ['styles']);
    //test style
    gulp.watch('./test/src/sass/**/*.scss', ['styles-test']);
    //test
    gulp.watch('./test/src/**/*.html', ['move-files']);
});

gulp.task('default', ['styles', 'styles-test', 'move-files']);
