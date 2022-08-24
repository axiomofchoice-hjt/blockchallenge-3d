import { height, print, width } from './util';
import { Box } from './Box';
import { Scene } from './Scene';
import { Vector3 } from 'three';

const ZOOM = 120;

class Grid {
    public n: number;
    public m: number;
    public scene: Scene;
    constructor(n: number, m: number, scene: Scene) {
        this.n = n;
        this.m = m;
        this.scene = scene;
        this.fitWindow();
    }
    fitWindow() {
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

        this.scene.camera.position.set(0, y, z);
        this.scene.camera.lookAt(0, 0, 0);
    }
    getId(i: number, j: number): number {
        return i * this.m + j;
    }
    getIndex(id: number): [number, number] {
        return [Math.floor(id / this.m), id % this.m];
    }
    getPosition(id: number): [number, number] {
        let [i, j] = this.getIndex(id);
        // print(i, j);
        return [(j - this.m / 2 + 0.5) * ZOOM, -(i - this.n / 2 + 0.5) * ZOOM];
    }
    getBox(id: number, height: number): Box {
        let box = new Box(100, 100, height, this.scene);
        let [x, y] = this.getPosition(id);
        box.position.set(x, y, height / 2);
        return box;
    }
    getMarchingBox(id: number, height: number, l: number, r: number): Box {
        let box = new Box(100, 100, height, this.scene);
        let [x, y] = this.getPosition(id);
        box.position.set(x, y, Math.random() * (r - l) + l);
        box.positionAnimate(new Vector3(x, y, height / 2), { speed: 2000 });
        return box;
    }
}

export { Grid };