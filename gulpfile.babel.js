import gulp from 'gulp'
import { series, parallel, watch } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'
import cleanCSS from 'gulp-clean-css'
import concat from 'gulp-concat'
import del from 'del'
import fs from 'fs'
import imagemin from 'gulp-imagemin'
import mozjpeg from 'imagemin-mozjpeg'
import pngquant from 'imagemin-pngquant'
import inject from 'gulp-inject'
import notify from 'gulp-notify'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import svgSprite from 'gulp-svg-sprite'
import uglify from 'gulp-uglify'

const reload = browserSync.reload

// compile scss
const compileSass = (cb) => {
  // theme styles
  gulp.src('src/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
    .pipe(notify({
      message: 'SASS Status: Theme Styles Compiled',
      onLast: true
    }))
  
    gulp.src('src/scss/editor-styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
    .pipe(notify({
      message: 'SASS Status: Editor Styles Compiled',
      onLast: true
    }))
  
  cb()
}

// compile js
const compileJS = (cb) => {
  gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream())
    .pipe(notify({
      message: 'JS Status: Compiled',
      onLast: true
    }))

    cb()
}

// process svg
const processSVG = (cb) => {
  // delete existing sprite from images directory
  fs.access('images/sprite.svg', (err) => {
    if (err) {
      del('images/sprite.svg', { force: true })
    }
  })

  // save svgSprite config in a variable
  const config = {
    mode: {
      defs: {
        'dest': '.',
        'sprite': 'sprite.svg'
      },
      inline: true
    }
  }

  // save sprite in the images directory
  gulp.src('src/images/svg-sprite/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('images'))

  // inject svg sprite code into files
  gulp.src('header.php')
    .pipe(inject(gulp.src('images/sprite.svg'), {
      starttag: '<!-- inject:{{ext}} -->',
      transform: function (filePath, file) {
        return file.contents.toString()
      }
    }))
    .pipe(gulp.dest('.'))
    .pipe(notify({
      message: 'Sprite SVG Status: Injected',
      onLast: true
    }))

  // copy non-sprite svgs to images directory
  gulp.src('src/images/*.svg')
    .pipe(gulp.dest('images'))
    .pipe(notify({
      message: 'Non-Sprite SVG Status: Copied',
      onLast: true
    }))
  
  cb()
}

// compress images
const processIMG = (cb) => {
  fs.access('images/*.{png,jpg}', (err) => {
    if (err) {
      del('images/*.{png,jpg}', { force: true })
    }
  })

  gulp.src('src/images/**/*.{png,jpg}')
    .pipe(imagemin([
      mozjpeg({
        quality: 80
      }),
      pngquant({
        speed: 1,
        strip: true,
        quality: [0.8, 0.8]
      })], {
      verbose: true
    }))
    .pipe(gulp.dest('images'))
    .pipe(notify({
      message: 'IMG Status: Optimized',
      onLast: true
    }))
  
  cb()
}

// run browsersync server and watch code for updates
const server = (cb) => {
  browserSync.init({
    proxy: 'dev.local' // adjust to match your dev environment
  })

  watch('./src/scss/*.scss', series('compileSass', reload))
  watch('./src/js/*.js', series('compileJS', reload))
  watch('./*.php').on('change', reload)
}

// default task: compile Sass and JS, run server and watch for code updates
const defaultTask = series(compileSass, compileJS, server)

export {
  compileSass,
  compileJS,
  processSVG,
  processIMG,
  server
}

export default defaultTask