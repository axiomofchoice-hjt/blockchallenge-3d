function width(): number {
    return Math.ceil(window.innerWidth + 0.5);
}

function height(): number {
    return Math.ceil(window.innerHeight + 0.5);
}

function canvas(): HTMLCanvasElement {
    return <HTMLCanvasElement>document.getElementById('canvas');
}

function print(...args: any[]) {
    console.log(...args);
}

function sgn(x: number) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function range(n: number): Iterable<number> {
    return {
        *[Symbol.iterator]() {
            for (let i = 0; i < n; i++) {
                yield i;
            }
        }
    };
}

function rangeMatrix(n: number, m: number): Iterable<[number, number]> {
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