/**
 * Created by MrSingh.
 */

'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var wiredep = require('wiredep').stream;
var htmlReplace  = require('gulp-html-replace');
var concat  = require('gulp-concat');
var ngAnnotate  = require('gulp-ng-annotate');
var uglify  = require('gulp-uglify');
var ocsso = require('csso');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var urlAdjuster = require('gulp-css-url-adjuster');
var uglifycss = require('gulp-uglifycss');

gulp.task('sass', function () {
    return gulp.src('./public/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('serve',['sass','sass:watch'], function(){
    browserSync.init('./public/**/*.*',{
        port:5000,
        server:{
            baseDir:'./public',
            middleware: [historyApiFallback()]

        }
    });
});

gulp.task('serve:dist', function(){
    browserSync.init({
        server:{
            baseDir:'./dist',
            middleware: [historyApiFallback()]
        }
    });
});

gulp.task('style', function(){
    var jsFiles = ['public/js/**/*.js'];
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish',{
            verbose:true
        }));
});

gulp.task('inject', function(){
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/bower-components/'
    };


    return gulp.src('./public/index.html')
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(['./public/js/**/*.js', './public/css/**/*.css'], {read: false}), {ignorePath: '/public'}))
        .pipe(gulp.dest('./public'))

});

gulp.task('htmlReplace', function(){

    gulp.src('./public/index.html')
        .pipe(htmlReplace({
            'vendor': 'js/vendor.js',
            'source':'js/bundle.js',
            'css':'css/all.css'
        }))
        .pipe(gulp.dest('./dist'))

});

gulp.task('bundle:source', function(){

    gulp.src([
        './public/js/app.js',
        './public/js/**/*.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))

});

gulp.task('bundle:vendor', function(){

    return gulp.src([
        'public/bower-components/jquery/dist/jquery.js',
        'public/bower-components/bootstrap/dist/js/bootstrap.js',
        'public/bower-components/angular/angular.js',
        'public/bower-components/angular-route/angular-route.js',
        'public/bower-components/angular-toastr/dist/angular-toastr.tpls.js',
        'public/bower-components/angular-cookies/angular-cookies.js',
        'public/bower-components/angular-local-storage/dist/angular-local-storage.js',
        'public/bower-components/ng-file-upload/ng-file-upload.js',
        'public/bower-components/ng-file-upload-shim/ng-file-upload-shim.js',
        'public/bower-components/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/bower-components/jquery-validation/dist/jquery.validate.js',
        'public/bower-components/jpkleemans-angular-validate/dist/angular-validate.min.js',
        'public/bower-components/ngMask/dist/ngMask.min.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))

});


gulp.task('copy:css',function(){

    return gulp.src([
        'public/bower-components/bootstrap/dist/css/bootstrap.min.css',
        'public/bower-components/font-awesome/css/font-awesome.min.css',
        'public/bower-components/angular-toastr/dist/angular-toastr.css',
        'public/css/**/*.css'
    ])
        .pipe(concatCss('all.css'))
        .pipe(urlAdjuster({
            replace:['bower_components/bootstrap/dist/','/']
        }))
        .pipe(urlAdjuster({
            replace:['font-awesome',''],
            replace:['?v=4.5.0',''],
        }))
        .pipe(csso({
            restructure: true,
            sourceMap: true,
            debug: false
        }))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy:fonts',function(){
    gulp.src([
        'public/bower_components/bootstrap/fonts/**/**.*',
        'public/bower_components/fontawesome/fonts/**/**.*',
        'public/fonts/**/**.*'
    ])
        .pipe(gulp.dest('./dist/fonts'));

    gulp.src([
        'public/font-awesome/**/**.*'
    ])
        .pipe(gulp.dest('./dist/font-awesome'));
});

gulp.task('copy:html',function(){
    gulp.src('public/partials/**/*.html')
        .pipe(gulp.dest('./dist/partials'))
});

gulp.task('copy:images',function(){
    gulp.src('public/images/**/*.*')
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('build',['htmlReplace','bundle:vendor','bundle:source','copy:css','copy:html', 'copy:images','copy:fonts']);
gulp.task('default',['serve']);
