function width() {
    return Math.ceil(window.innerWidth + 0.5);
}

function height() {
    return Math.ceil(window.innerHeight + 0.5);
}

function canvas() {
    return document.getElementById('canvas');
}

function print() {
    console.log(...arguments);
}

function sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function range(n) {
    return {
        *[Symbol.iterator]() {
            for (let i = 0; i < n; i++) {
                yield i;
            }
        }
    };
}

function rangeMatrix(n, m) {
    return {
        *[Symbol.iterator]() {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < m; j++) {
                    yield [i, j];
                }
            }
        }
    };
}

export { width, height, canvas, print, sgn, range, rangeMatrix };