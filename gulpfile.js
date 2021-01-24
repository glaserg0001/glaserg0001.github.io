var
    gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    del             = require('del'),
    sourcemaps      = require('gulp-sourcemaps'),
    pug             = require('gulp-pug'),
    plumber         = require('gulp-plumber'),
    notify          = require("gulp-notify");


var app = './app'

var sassFun = function(done){
    return gulp.src(app + '/sass/**/*.+(scss|sass)')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe( sass().on( 'error', function( error ){console.log( error ); }))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write('../maps', {addComment: false}))
    .pipe(gulp.dest(app + '/css'))
    .pipe(browserSync.reload({stream: true}))
    done()
}


gulp.task('sass', sassFun);

gulp.task('browser-sync', function(done) {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        // ghostMode: false,
    });

    done()
});

// pug
gulp.task('pug', function () {
    return gulp.src(app + '/pug/pages/**/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function (error) {
            return "Message to the notifier: " + error.message;
        }))
        // .pipe(plumber.stop())
        .pipe(gulp.dest(app))
        .pipe(browserSync.reload({ stream: true }));
});


// gulp.task('html-include', function() {
//     return gulp.src([app + '/html/*.html', app + '/html/tutorials/*.html'])
//     .pipe(include())
//     .pipe(gulp.dest('./app'))
//     .pipe(browserSync.reload({ stream: true }));
// });


gulp.task('watch', gulp.series('browser-sync', function(done) {
    // gulp.watch(app + '/sass/**/*.sass', ['sass']);
    
    gulp.watch(app + '/sass/**/*.+(scss|sass)', function (done) {
        setTimeout (function () { 
            sassFun ()
        }, 500);

        done()
    });
    
    
    // gulp.watch(app + '/html/**/*.html', ['html-include']);
    gulp.watch(app + '/pug/**/*.pug', gulp.series('pug'));
    
    // gulp.watch('./app/**/*.html', browserSync.reload);
    gulp.watch(app + '/js/**/*.js').on('change', browserSync.reload);

    done()
}));

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', gulp.series('clean', 'sass', function(done) {
    
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

    done()
    
}));

gulp.task('default', gulp.series('watch'));
