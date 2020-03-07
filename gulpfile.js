var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var browser = require("browser-sync");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
const image = require('gulp-image');

gulp.task("sass", function() {

    gulp.src("./src/scss/style.scss").pipe(sourcemaps.init()).pipe(sass({
        outputstyle: 'compressed'
    })).pipe(autoprefixer()).pipe(sourcemaps.write()).pipe(rename('main.min.css')).pipe(gulp.dest("dist/css")).pipe(browser.stream());

});

gulp.task("bootstrap", function() {

    gulp.src("./src/bootstrap/scss/bootstrap.scss").pipe(sourcemaps.init()).pipe(sass.sync({ outputStyle: 'compressed' })).pipe(autoprefixer()).
    pipe(sourcemaps.write()).pipe(rename('bootstrap.min.css')).
    pipe(gulp.dest("dist/css"))
        .pipe(browser.stream());

});

gulp.task('image', () => {
    gulp.src('./images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true // defaults to false
        }))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task("watches", function() {
    browser.init({
        server: {
            baseDir: './'
        }
    })
})


gulp.watch("src/scss/*.scss", gulp.parallel("sass"));
gulp.watch("src/scss/*.scss", gulp.parallel("sass"));
gulp.watch("images/", gulp.parallel("image"))
gulp.task("default", gulp.parallel('sass', 'bootstrap', 'watches', ));