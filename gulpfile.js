const { src, dest, parallel } = require('gulp');

function buildIcons() {
    return src('nodes/**/*.{png,svg}')
        .pipe(dest('dist/nodes'));
}

function buildCodex() {
    return src('nodes/**/*.node.json')
        .pipe(dest('dist/nodes'));
}

exports['build:assets'] = parallel(buildIcons, buildCodex);
exports.default = parallel(buildIcons, buildCodex);
