/**
* gulpfile.js
*
* Task definitions for gulp.
*
*/

//================
// Package import
//================

const gulp       = require('gulp');
const babel      = require('gulp-babel');
const sass       = require('gulp-sass');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const clean      = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const nodemon    = require('gulp-nodemon');
const watch      = require('gulp-watch');
const sync       = require('gulp-sync')(gulp).sync;
const del        = require('del');

//===========
// Variables
//===========

// Angular 1.x and all the plugins you want
const angular = [
    'node_modules/angular/angular.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'node_modules/angular-cookies/angular-cookies.js',
    'node_modules/angular-utils-pagination/dirPagination.js'
];

// Other javascript resources
const vendor = angular.concat([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
]);

// Directories w/ sass you want to @import
const sass_paths = [
    'node_modules/bootstrap-sass/assets/stylesheets',
    'node_modules/font-awesome/scss'
];

//==================
// High level tasks
//==================

gulp.task('default', sync(['build', 'serve', 'watch']));
gulp.task('build', ['compile', 'move']);
gulp.task('clean', ()=>del(['dist']));

gulp.task('compile', ['compile:js', 'compile:sass']);
gulp.task('compile:js', ['compile:js:server', 'compile:js:client', 'compile:js:vendor']);

gulp.task('move', ['move:assets', 'move:html']);

//=================
// Low level tasks
//=================

/* ===== Compile ===== */

gulp.task('compile:js:server', ()=>{
    return gulp.src('src/server/**/*.js')
        .pipe(gulp.dest('dist/server'));
});

gulp.task('compile:js:client', ()=>{
    let pipeline = gulp.src([
        'src/client/app/core/app.module.js',
        'src/client/**/*.js'
    ]);
    if(process.env.NODE_ENV === 'PROD')
        return pipeline.pipe(babel({presets: ['es2015']}))
            .pipe(uglify())
            .pipe(concat('app.js'))
            .pipe(gulp.dest('dist/client/assets'));
    else
        return pipeline.pipe(sourcemaps.init())
            .pipe(babel({presets: ['es2015']}))
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/client/assets'));
});

gulp.task('compile:js:vendor', ()=>{
    return gulp.src(vendor)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/client/assets'));
});

gulp.task('compile:sass', ()=>{
    let pipeline = gulp.src('src/client/assets/**/*.scss');
    if(process.env.NODE_ENV === 'PROD')
        return pipeline.pipe(sass({includePaths: sass_paths})
                .on('error', sass.logError))
            .pipe(clean({compatibility: 'IE9'}))
            .pipe(gulp.dest('dist/client/assets'));
    else
        return pipeline.pipe(sourcemaps.init())
            .pipe(sass({includePaths: sass_paths})
                .on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/client/assets'));
});

/* ===== Move ===== */

gulp.task('move:assets', ()=>{
    gulp.src('node_modules/font-awesome/fonts/**/*')
        .pipe(gulp.dest('dist/client/assets/fonts'));
    return gulp.src(
        ['!src/client/assets/**/*.scss', 'src/client/assets/**/*'])
        .pipe(gulp.dest('dist/client/assets'));
});

gulp.task('move:html', ()=>{
    return gulp.src('src/client/**/*.html')
        .pipe(gulp.dest('dist/client'));
});

/* ===== Serve & Watch ===== */

gulp.task('serve', ()=>{
    return nodemon({
        script: 'dist/server/server.js'
    });
});

gulp.task('watch', ()=>{
    watch('src/server/**/*.js', ()=>gulp.start('compile:js:server'));
    watch('src/client/**/*.js', ()=>gulp.start('compile:js:client'));
    watch(vendor, ()=>gulp.start('compile:js:vendor'));
    watch('src/client/assets/**/*.scss', ()=>gulp.start('compile:sass'));
    watch(['!src/client/assets/**/*.scss', 'src/client/assets/**/*'],
        ()=>gulp.start('move:assets'));
    watch('src/client/**/*.html', ()=>gulp.start('move:html'));
});
