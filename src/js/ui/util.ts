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

function shuffle(arr: any[]): any[] {
    for (let i = arr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const DIRECTION = [
    { keyCodes: ['ArrowLeft', 'KeyA'], position: [0, -1] },
    { keyCodes: ['ArrowUp', 'KeyW'], position: [-1, 0] },
    { keyCodes: ['ArrowRight', 'KeyD'], position: [0, 1] },
    { keyCodes: ['ArrowDown', 'KeyS'], position: [1, 0] },
];

export { width, height, canvas, print, sgn, range, rangeMatrix, shuffle, DIRECTION };