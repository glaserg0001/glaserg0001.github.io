var
    gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync		= require('browser-sync'),
    del             = require('del'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
    cache           = require('gulp-cache'),
    include         = require('gulp-html-tag-include'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    pug             = require('gulp-pug'),
    plumber         = require('gulp-plumber'),
    notify          = require("gulp-notify");


var app = './app'

var sassFun = function(){
    return gulp.src(app + '/sass/*.+(scss|sass)')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe( sass().on( 'error', function( error ){console.log( error ); }))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    // .pipe(sass())
    // .pipe(autoprefixer(['last 2 versions', '> 1%'], { cascade: true }))
    .pipe(sourcemaps.write('../maps', {addComment: false}))
    .pipe(gulp.dest(app + '/css'))
    .pipe(browserSync.reload({stream: true}))
}


gulp.task('sass', sassFun);

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './app'
        },
        notify: false,
        // ghostMode: false,
    });
});

// pug
gulp.task('pug', function () {
    return gulp.src(app + '/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function (error) {
            return "Message to the notifier: " + error.message;
        }))
        // .pipe(plumber.stop())
        .pipe(gulp.dest(app + '/pug-res'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('html-include', function() {
    return gulp.src([app + '/html/*.html', app + '/html/tutorials/*.html'])
    .pipe(include())
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task('watch', ['browser-sync'], function() {
    // gulp.watch(app + '/sass/**/*.sass', ['sass']);
    
    gulp.watch(app + '/sass/**/*.+(scss|sass)', function () {
        setTimeout (function () { 
            sassFun ()
        }, 500);
    });
    
    
    gulp.watch(app + '/html/**/*.html', ['html-include']);
    gulp.watch(app + '/pug/**/*.pug', ['pug']);
    
    // gulp.watch('./app/**/*.html', browserSync.reload);
    gulp.watch(app + '/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src(app + '/img/**/*')
    .pipe(cache(imagemin({
        // .pipe(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'sass'], function() {
    
    var buildCss = gulp.src([
        app + '/css/*.css'
    ])
    .pipe(gulp.dest('dist/css'))
    
    var buildFonts = gulp.src(app + '/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    
    var buildJs = gulp.src(app + '/js/**/*')
    .pipe(gulp.dest('dist/js'))
    
    var buildHtml = gulp.src(app + '/*.html')
    .pipe(gulp.dest('dist'));
    
});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('default', ['watch']);
