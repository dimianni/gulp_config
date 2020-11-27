// Система сборки фронтенда 
// Качаем Node Js - это программа интерпретатор (переводит JS для машины)


// Создаем папку и открываем эту папку в терминале
// Пишем - npm (node packet manager) i gulp-cli -g (global)
// Потом пишем npm init (открываем новый проект) и прописываем описание (создает package.json)
// Закидываем папку в редактор, открываем терминал и пишем -> npm i gulp --save-dev
// Создаем в папке файл gulpfile.js и пишем в ней переменную gulp
// Создаем папку app, а в ней папки scss js images fonts и index.html
// Подклчаем в html style.css и main.js 
// Скачиваем плагин gulp-sass (npm i gulp-sass --save-dev), и в gulpfile.js пишем переменную sass
// gulp.task (таска) - будет брать файлы scss и компелировать из в css

// Устанавливаем browser-sync (автоматическое обновление страницы) (npm i browser-sync --save-dev), и пишем для нее переменную в gulpfile.js
// Скачиваем npm i normalize.css slick-carousel magnific-popup
// Скачиваем npm i gulp-uglify gulp-concat --save-dev (для минифицирования и конкатинации[соединиения двух файлов в один]), и создаем переменные
// Подключаем libs.min.js к html
// Скачиваем npm i gulp-rename --save-dev, и создаем переменную

// Удаляем slick.scss из папки slick в node_modules

// Подключаем к html jquery через cdn
// В style.scss пишем @import "vars" @import "libs" @import "fonts" @import "media" и в папке scss создаем _vars.scss _libs.scss и тд. _(чтобы не импортировало в css)

// Устанавливаем npm i del --save-dev, создаем переменную; Чтобы папка dist перед тем как билдилась удалялась;
// Устанавливаем npm i gulp-autoprefixer --save-dev, создаем переменную;

// При новом проекте нам нужно только папка app, gulpfile.js и package.json; В терминале пишем npm i

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function () { //Удаляет папку dist; Async означает что таска будет выполняться первой
    del.sync('dist')
});

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss') //ищем все файлы scss
        .pipe(sass({ outputStyle: 'compressed' })) //загоняем их в трубу где будет выполняться плагин 
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(rename({ suffix: '.min' })) //переименовываем
        .pipe(gulp.dest('app/css')) //выкидываем файлы в папку
        .pipe(browserSync.reload({ stream: true })) //обновление страницы при изменениях в css
});

gulp.task('css', function () { //Ищем все css плагинов (по аналогии js)
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
    ])
        .pipe(concat('_libs.scss')) //выполняем конкат
        .pipe(gulp.dest('app/scss')) //Выкидываем
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () { //обновление страницы при изменениях в html
    return gulp.src('app/**/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () { //обновление страницы при изменениях в js
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
    return gulp.src([ //Ищем все js плагинов
        'node_modules/slick-carousel/slick/slick.js',
    ])
        .pipe(concat('libs.min.js')) //выполняем конкат
        .pipe(uglify()) //Минифицируем
        .pipe(gulp.dest('app/js')) //Выкидываем
        .pipe(browserSync.reload({ stream: true })) //чтобы обновляло js при перезагруке страницы
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/" //директория для сервера
        }
    });
});

gulp.task('export', function () {
    let buildHtml = gulp.src('app/**/*.html') //выбираем все файлы для экспорта в папку dist
        .pipe(gulp.dest('dist'));

    let buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    let buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    let buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    let buildImages = gulp.src('app/images/**/*.*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () { //встроеная таска которая следит и автоматически выполняет что-то
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss')) //если были внесены изменения запускает scss
    gulp.watch('app/**/*.html', gulp.parallel('html')) //если были внесены изменения запускает html
    gulp.watch('app/js/*.js', gulp.parallel('script')) //если были внесены изменения запускает js
});

gulp.task('build', gulp.series('clean', 'export')); // Таска которая сначала запускает таску clean, а потом таску build

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch')) //при написании gulp в консоли долно выполняться все что идет после (дефолтная таска)
                                                                                  // выполниться сначала css потом scss потом js потом запуститься сервер
