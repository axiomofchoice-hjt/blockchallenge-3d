import { height, print, width } from './util.js';
import { Box } from './box.js';
import { Renderer } from './renderer';
import { MinEquation } from 'three';

const ZOOM = 120;

class Grid {
    constructor(n, m) {
        this.n = n;
        this.m = m;
    }
    setCamera() {
        let bottomAngle = 75 / 2 / 180 * Math.PI;
        let bottom = ZOOM * (this.n + 1) / 2;
        let sideAngle = Math.atan(5 / 2);
        let side = bottom * Math.sin(sideAngle) / Math.sin(bottomAngle);
        let outerAngle = bottomAngle + sideAngle;
        let z = side * Math.sin(outerAngle);
        let y = -z / 5 * 2;

        let topAngle = Math.min(Math.PI / 2 - 0.001, 75 / height() * width() / 2 / 180 * Math.PI);
        let widthBottom = ZOOM * (this.m + 2) / 2;
        if (z < widthBottom / Math.tan(topAngle)) {
            z = widthBottom / Math.tan(topAngle);
            y = -z / 5 * 2;
        }

        Renderer.camera.position.set(0, y, z);
        Renderer.camera.lookAt(0, 0, 0);
    }
    getId(i, j) {
        return i * this.m + j;
    }
    getIndex(id) {
        return [Math.floor(id / this.m), id % this.m];
    }
    getPosition(id) {
        let [i, j] = this.getIndex(id);
        // print(i, j);
        return [(j - this.m / 2 + 0.5) * ZOOM, -(i - this.n / 2 + 0.5) * ZOOM];
    }
    getBox(id, height) {
        let box = new Box(100, 100, height);
        let [x, y] = this.getPosition(id);
        box.position.set(x, y, height / 2);
        return box;
    }
    getMarchingBox(id, height, l, r) {
        let box = new Box(100, 100, height);
    }
}

export { Grid };