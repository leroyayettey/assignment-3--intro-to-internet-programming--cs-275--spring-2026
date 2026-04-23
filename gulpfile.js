const{ src, dest, series, watch} =  require('gulp'),
cssLinter = require('gulp-stylelint'),
{deleteAsync} = require('del'),
babel = require('gulp-babel'),
htmlCompressor = require('gulp-htmlmin'),
jsCompressor = require('gulp-uglify'),
jsLinter = require('gulp-eslint'),
sass = require('gulp-sass')(require('sass'));
browserSynchronize = require(`browser-sync`),
reload = browserSynchronize.reload;

let browserSelection = `default`;

async function brave () {
    browserSelection = `brave browser`;
}

async function chrome () {
    browserSelection = `google chrome`;
}

async function edge () {
    browserSelection = `microsoft-edge`;
}

async function firefox () {
    browserSelection = `firefox`;
}

async function safari () {
    browserSelection = `safari`;
}


async function allBrowserSelections () {
    browserSelection = [
        `brave browser`,
        `google chrome`,
        `microsoft-edge`,
        `firefox`,
        `safari`,
    ];
}


let compressHTML = () => {
    return src(['*.html'])
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest('prod'));
};

let compileCSSForDev = () => {
    return src('styles/*.css')
        .pipe(sass.sync({ style: 'expanded', precision: 10 }).on('error', sass.logError))
        .pipe(dest('temp/styles'));
};

let compileCSSForProd = () => {
    return src('styles/*.css')
        .pipe(sass.sync({ style: 'compressed', precision: 10 }).on('error', sass.logError))
        .pipe(dest('prod/styles'));
};

let lintCSS = () => {
    return src('styles/*.css')
        .pipe(cssLinter({
            failAfterError: false,
            reporters: [{ formatter: 'string', console: true }]
        }));
};

let lintJS = () => {
    return src('scripts/*.js')
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach('compact'));
};

let transpileJSForDev = () => {
    return src('scripts/*.js')
        .pipe(babel())
        .pipe(dest('temp/js'));
};

let transpileJSForProd = () => {
    return src('scripts/*.js')
        .on('data', file => console.log('Found JS file:', file.relative))
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest('prod/js'))
        .on('end', () => console.log('JS transpiled to prod/js/'));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        '*.*',
        '**',
        'img/**',
        '!*.html',
        '!styles/**',
        '!prod/**',
        '!gulpfile.js',
        '!node_modules/**'
    ], { dot: true })
    .pipe(dest('prod'));
};

let serve = () => {
    browserSynchronize({
        notify: true,
        reloadDelay: 50,
        browser: browserSelection,
        server: {
            baseDir: [`temp`,`dev`, `dev/html`]
        }
    })
    watch(`temp/js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);
    watch(`temp/styles/*.scss`, compileCSSForDev)
        .on(`change`, reload);
    watch(`dev/html/*.html`, validateHTML)
        .on(`change`, reload);
};


async function clean() {
    const foldersToDelete = await deleteAsync(['./temp', 'prod']);
    console.log('Deleted directories >>> ', foldersToDelete);
}

exports.compileCSSForDev = compileCSSForDev;
exports.lintCSS = lintCSS;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.transpileJSForProd = transpileJSForProd;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.clean = clean;
exports.default = series(
    lintCSS,
    lintJS,
    transpileJSForDev,
    compileCSSForDev,
    serve
);

exports.build = series(
    clean,
    compressHTML,
    compileCSSForProd,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
