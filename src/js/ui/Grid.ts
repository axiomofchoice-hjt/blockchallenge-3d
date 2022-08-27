import { height, print, width, range, shuffle } from './util';
import { Box } from './Box';
import { Scene } from './Scene';
import { Vector3 } from 'three';
import { Renderer } from './Renderer';

const ZOOM = 120;

interface Input {
    click?: (id: number) => void;
}

class Grid {
    public n: number;
    public m: number;
    public renderer: Renderer;
    public scene: Scene;
    public boxes: Box[];
    public input: Input;
    constructor(n: number, m: number) {
        this.n = n;
        this.m = m;
        this.renderer = new Renderer();
        this.scene = new Scene();
        this.fitWindow();
        this.boxes = this.getMarchingBoxes(10, -300, -50);
        for (let id of this.getIds()) {
            this.boxes[id].contents[0].text = id;
        }
        this.input = {
            click(id: number) {
                print(id);
            }
        };
    }
    fitWindow() {
        this.scene.fitWindow();
        this.renderer.fitWindow();

        let bottomAngle = Scene.ANGLE_OF_VIEW / 2 / 180 * Math.PI;
        let bottom = ZOOM * (this.n + 1) / 2;
        let sideAngle = Scene.ANGLE_OF_HEIGHT;
        let side = bottom * Math.sin(sideAngle) / Math.sin(bottomAngle);
        let outerAngle = bottomAngle + sideAngle;
        let z = side * Math.sin(outerAngle);
        let y = -z / Math.tan(sideAngle);

        let tanTopAngle = Math.tan(Scene.ANGLE_OF_VIEW / 2 / 180 * Math.PI) / height() * width();
        let widthBottom = ZOOM * (this.m + 2) / 2;
        if (z < widthBottom / tanTopAngle) {
            z = widthBottom / tanTopAngle;
            y = -z / Math.tan(sideAngle);
        }

        this.scene.camera.position.set(0, y, z + 10);
        this.scene.camera.lookAt(0, 0, 10);
    }
    getId(i: number, j: number): number {
        return i * this.m + j;
    }
    getIndex(id: number): [number, number] {
        return [Math.floor(id / this.m), id % this.m];
    }
    getIds(): Iterable<number> {
        return range(this.n * this.m);
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
    getMarchingBoxes(height: number, l: number, r: number): Box[] {
        let z = [];
        for (let i of range(this.n * this.m)) {
            z.push(l + (r - l) * i / (this.n * this.m));
        }
        z = shuffle(z);
        let boxes = [];
        for (let id of range(this.n * this.m)) {
            let box = new Box(100, 100, height, this.scene);
            let [x, y] = this.getPosition(id);
            box.position.set(x, y, z[id]);
            box.animes.positionTo(new Vector3(x, y, height / 2), { speed: 200, delay: 0.1 });
            boxes.push(box);
            box.index = id;
        }
        return boxes;
    }
}

export { Grid };