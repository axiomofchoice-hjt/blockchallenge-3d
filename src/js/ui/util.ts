export function width(): number {
    return Math.ceil(window.innerWidth + 0.5);
}

export function height(): number {
    return Math.ceil(window.innerHeight + 0.5);
}

export function canvas(): HTMLCanvasElement {
    return <HTMLCanvasElement>document.getElementById('canvas');
}

export function print(...args: any[]) {
    console.log(...args);
}

export function sgn(x: number) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

export function range(n: number): Iterable<number> {
    return {
        *[Symbol.iterator]() {
            for (let i = 0; i < n; i++) {
                yield i;
            }
        }
    };
}

export function rangeMatrix(n: number, m: number): Iterable<[number, number]> {
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

export function genArray<T>(n: number, el: () => T): T[] {
    let res = [];
    for (let i = 0; i < n; i++) {
        res.push(el());
    }
    return res;
}

export function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export const DIRECTION = [
    { keyCodes: ['ArrowLeft', 'KeyA'], position: [0, -1] },
    { keyCodes: ['ArrowUp', 'KeyW'], position: [-1, 0] },
    { keyCodes: ['ArrowRight', 'KeyD'], position: [0, 1] },
    { keyCodes: ['ArrowDown', 'KeyS'], position: [1, 0] },
];

export const
    black = "Black",
    white = "White",
    grey = "LightGrey",
    yellow = "Gold",
    red = "Tomato",
    green = "LimeGreen",
    blue = "DeepSkyBlue",
    purple = "#D3D",
    orange = "DarkOrange";

export const
    textGreen = "#080",
    textRed = "Red",
    textBlack = "Black";

export const
    eqTask = (x: number, n: number) => (x == n ? 1 : 0),
    leIncreasingTask = (x: number, n: number) => (x <= n ? 1 : -1)
