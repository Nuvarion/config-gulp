const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('serve', function() {
    browserSync({
        server:{
            baseDir: './dist'
        },
        notify: false
    })
})

gulp.task('build:css', function() {
    return gulp.src(path.resolve(__dirname, "./src/*.scss"))
    .pipe(sass())
    .pipe(autoprefixer( {
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(path.resolve(__dirname,"./dist/css")))
    .pipe(browserSync.reload({stream: true}));
})

gulp.task('build:html',function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('build:js', function() {
    return gulp.src(path.resolve(__dirname, "./src/*.js"))
    .pipe(gulp.dest(path.resolve(__dirname,"./dist/js")))
    .pipe(browserSync.reload({stream: true}));
})

gulp.task('watch', function(cb) {
    gulp.watch('./src/*.(sass|scss)', gulp.series('build:css'))
    gulp.watch('./src/*.html', gulp.series('build:html'))
    gulp.watch('./src/*.js', gulp.series('build:js'))
    cb();
})

gulp.task('build', gulp.series('build:html','build:js', 'build:css', 'watch'))


gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')))