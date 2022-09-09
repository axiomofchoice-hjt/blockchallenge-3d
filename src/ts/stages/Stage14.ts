import * as THREE from 'three';
import { CylinderGeometry } from 'three';
import { Grid, ZOOM } from "../stageBase/Grid";
import { Cylinder } from '../ui/Cylinder';
import { Material } from '../ui/Material';
import { black, DIRECTION, eqTask, genArray, geTask, grey, range, rangeMatrix, white } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: number[];
    lines: THREE.Line[];
    cylinders: Cylinder[];
    cylinderGeometry: CylinderGeometry;

    constructor(father: Controller) {
        super(father, 7, 7, false);
        this.cylinderGeometry = new THREE.CylinderGeometry(50, 50, 20, 20);

        this.boxes = this.genMarchingBoxes(2, 0, 0);
        for (let box of this.boxes) {
            box.animes.opacityTo(0, { immediately: true });
        }

        this.tag = genArray(this.size, () => 0);
        this.header.setText('对称 请点击方块');

        this.cylinders = [];
        this.lines = [];
        this.footer.setTasks(
            [0, 12, geTask],
        );

        for (let i of range(7)) {
            let line = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(...this.getPosition(this.getId(i, 0)), 0),
                    new THREE.Vector3(...this.getPosition(this.getId(i, 6)), 0),
                ]),
                new THREE.LineBasicMaterial({
                    color: black
                })
            );
            this.lines.push(line);
            this.scene.add(line);
            line = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(...this.getPosition(this.getId(0, i)), 0),
                    new THREE.Vector3(...this.getPosition(this.getId(6, i)), 0),
                ]),
                new THREE.LineBasicMaterial({
                    color: black
                })
            );
            this.lines.push(line);
            this.scene.add(line);
        }

        for (let i of this.getIds()) {
            let cylinder = new Cylinder(this.cylinderGeometry, this.scene);
            cylinder.animes.positionTo([...this.getPosition(i), 100], { immediately: true });
            cylinder.animes.opacityTo(0, { immediately: true });
            this.cylinders.push(cylinder);
        }

        for (let i of this.getIds()) {
            let [x, y] = this.getXY(i);
            if (
                (x === 0 ? 1 : 0) + (x === 6 ? 1 : 0) + (y === 0 ? 1 : 0) + (y === 6 ? 1 : 0) === 1 ||
                (x === 3 && y === 3)) {
                this.tag[i] = -1;
                this.cylinders[i].animes.opacityTo(1, { duration: 0.4 });
                this.cylinders[i].animes.positionTo([this.cylinders[i].position.x, this.cylinders[i].position.y, 10], { duration: 0.4 });
            }
        }

        const dfs = (id: number, vis: boolean[], rec: number[], nextTag: number[]) => {
            let [x, y] = this.getXY(id);
            if (vis[id]) return false;
            vis[id] = true; rec.push(id);
            let flag = false;
            for (let { position: [dx, dy] } of DIRECTION) {
                if (this.inArea(x + dx, y + dy)) {
                    let ptr = this.getId(x + dx, y + dy);
                    if (nextTag[ptr] === 0) {
                        flag = true;
                    }
                    if (nextTag[ptr] === nextTag[id] && dfs(ptr, vis, rec, nextTag)) {
                        flag = true;
                    }
                }
            }
            return flag;
        };
        const kill = (label: number, nextTag: number[]) => {
            let vis = genArray(this.size, () => false);
            for (let id of this.getIds()) {
                let rec: number[] = [];
                if (nextTag[id] === label && !vis[id] && !dfs(id, vis, rec, nextTag)) {
                    for (let r of rec) {
                        nextTag[r] = 0;
                    }
                }
            }
        };
        this.input.click = (id: number) => {
            let nextTag = genArray(this.size, () => 0);
            for (let i of this.getIds()) {
                nextTag[i] = this.tag[i];
            }
            if (nextTag[id] !== 0) return;
            nextTag[id] = 1;
            kill(-1, nextTag);
            kill(1, nextTag);
            if (nextTag[id] === 0) return; // 不能这么下
            if (nextTag[this.size - 1 - id] === 0) {
                nextTag[this.size - 1 - id] = -1;
                kill(1, nextTag);
                kill(-1, nextTag);
            }
            for (let i of this.getIds()) {
                if (this.tag[i] !== nextTag[i]) {
                    if (nextTag[i]) {
                        this.cylinders[i].animes.bgColorTo(nextTag[i] === 1 ? grey : white, { immediately: true });
                        this.cylinders[i].animes.opacityTo(1, { duration: 0.4 });
                        this.cylinders[i].animes.positionTo([this.cylinders[i].position.x, this.cylinders[i].position.y, 10], { duration: 0.4 });
                    } else {
                        this.cylinders[i].animes.opacityTo(0, { duration: 0.4 });
                        this.cylinders[i].animes.positionTo([this.cylinders[i].position.x, this.cylinders[i].position.y, 100], { duration: 0.4 });
                    }
                }
            }
            this.tag = nextTag;

            this.footer.tasks[0].set(0);
            for (let i of this.getIds()) {
                if (this.tag[i] === 1) {
                    this.footer.tasks[0].add(1);
                }
            }

            this.footer.update();
        };
    }
}
