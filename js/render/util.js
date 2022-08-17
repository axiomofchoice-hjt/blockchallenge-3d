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