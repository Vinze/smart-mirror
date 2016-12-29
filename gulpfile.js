var gulp    = require('gulp');
var less    = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var path    = require('path');

gulp.task('build-css', function () {
    return gulp.src('src/stylesheet.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'src') ]
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('assets'));
});

gulp.task('build-js', function () {
    return gulp.src([
            'src/app.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets'));
});

gulp.task('start-server', function() {
    nodemon({
        script: 'app.js',
        ignore: ['assets', 'src']
    });
})

gulp.task('watch', function() {
    gulp.watch('src/*.less', ['build-css']);
    gulp.watch('src/app.js', ['build-js']);
});

gulp.task('default', ['build-css', 'build-js', 'start-server', 'watch']);