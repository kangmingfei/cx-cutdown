var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),//缩小化(minify)CSS
    jshint = require('gulp-jshint'),//js代码校验
    uglify = require('gulp-uglify'),//js压缩
    rename = require("gulp-rename"),//文件重命名
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

//jS文件校验、压缩
gulp.task('build', function() {
    var cutdownConfig = require("./bower.json");
    var cutdownDist = "./" + cutdownConfig.main.split('/')[1];
    gulp.src(["./src/*.js"])    
        .pipe(gulp.dest(cutdownDist))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(cutdownDist));


    gulp.src(["./src/*.js"])    
        .pipe(gulp.dest(cutdownDist))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(cutdownDist));

    gulp.src(["./src/*.css"])
        .pipe(gulp.dest(cutdownDist))
        .pipe(minifyCss({
            advanced: true,
            compatibility: 'ie7',
            keepBreaks: false
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(cutdownDist));
});  

gulp.task('open', function() {
    //更改默认端口
    browserSync.init({
        files: "**",
        server: {
            baseDir: ".",
            index: "src/demo.html"
        },
        port: 9080
    });
    //监听html、sass及js的修改
    gulp.watch("./src/**/*.html").on('change', reload);
    gulp.watch("./src/**/*.css").on('change', reload);
    gulp.watch("./src/**/*.js").on('change', reload);
});