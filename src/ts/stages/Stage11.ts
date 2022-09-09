import * as THREE from 'three';
import { Grid, ZOOM } from "../stageBase/Grid";
import { Box } from "../ui/Box";
import { Material } from '../ui/Material';
import { black, blue, eqTask, genArray, geTask, green, grey, leIncreasingTask, print, range, rangeMatrix, red, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

const BLOCKS: [number, number][] = [
    [1, 2], [2, 1], [2, 2], [4, 1], [4, 2], [4, 3], [1, 4], [2, 4], [3, 4]
];

export default class Stage extends Grid {
    tag: boolean[];
    extraMeshs: THREE.Mesh[];

    constructor(father: Controller) {
        super(father, 6, 6, false);

        this.extraMeshs = [];
        for (let i = 0; i < BLOCKS.length; i++) {
            let box = this.genBox(0, 20);
            box.index = this.getId(...BLOCKS[i]);
            let pos = this.getPosition(this.getId(...BLOCKS[i]));
            box.position.x = pos[0];
            box.position.y = pos[1];
            box.position.z = Math.random() * (300 - 50) + 50;
            box.animes.positionTo([pos[0], pos[1], 10], { speed: 400 });
            box.animes.bgColorTo(grey, { immediately: true });
            this.boxes.push(box);
        }
        {
            let shape = new THREE.Shape();
            shape.moveTo(
                (1 - this.m / 2 + 0.5) * ZOOM - 57,
                -(1 - this.n / 2 + 0.5) * ZOOM + 57
            );
            shape.lineTo(
                (1 - this.m / 2 + 0.5) * ZOOM - 57,
                -(3 - this.n / 2 + 0.5) * ZOOM - 57
            );
            shape.lineTo(
                (3 - this.m / 2 + 0.5) * ZOOM + 57,
                -(3 - this.n / 2 + 0.5) * ZOOM - 57
            );
            shape.lineTo(
                (3 - this.m / 2 + 0.5) * ZOOM + 57,
                -(1 - this.n / 2 + 0.5) * ZOOM + 57
            );
            let geometry = new THREE.ShapeGeometry(shape);
            let material = Material.solid(green);
            material.opacity = 0.5;
            let mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
            this.extraMeshs.push(mesh);
        }
        {
            let shape = new THREE.Shape();
            shape.moveTo(
                (4 - this.m / 2 + 0.5) * ZOOM - 57,
                -(1 - this.n / 2 + 0.5) * ZOOM + 57
            );
            shape.lineTo(
                (4 - this.m / 2 + 0.5) * ZOOM - 57,
                -(4 - this.n / 2 + 0.5) * ZOOM + 57
            );
            shape.lineTo(
                (1 - this.m / 2 + 0.5) * ZOOM - 57,
                -(4 - this.n / 2 + 0.5) * ZOOM + 57
            );
            shape.lineTo(
                (1 - this.m / 2 + 0.5) * ZOOM - 57,
                -(4 - this.n / 2 + 0.5) * ZOOM - 57
            );
            shape.lineTo(
                (4 - this.m / 2 + 0.5) * ZOOM + 57,
                -(4 - this.n / 2 + 0.5) * ZOOM - 57
            );
            shape.lineTo(
                (4 - this.m / 2 + 0.5) * ZOOM + 57,
                -(1 - this.n / 2 + 0.5) * ZOOM + 57
            );
            let geometry = new THREE.ShapeGeometry(shape);
            let material = Material.solid(red);
            material.opacity = 0.5;
            let mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
            this.extraMeshs.push(mesh);
        }
        for (let ptr of this.getIds()) {
            let [i, j] = this.getXY(ptr);
            if ((i == 0 ? 1 : 0) + (i == 5 ? 1 : 0) + (j == 0 ? 1 : 0) + (j == 5 ? 1 : 0) === 1) {
                let box = this.genBox(0, 20);
                box.index = ptr;
                let pos = this.getPosition(ptr);
                box.position.x = pos[0];
                box.position.y = pos[1];
                box.position.z = Math.random() * (300 - 50) + 50;
                box.animes.positionTo([pos[0], pos[1], 10], { speed: 400 });
                box.animes.bgColorTo(yellow, { immediately: true });
                this.boxes.push(box);
            }
        }

        this.tag = genArray(this.size, () => false);
        this.header.setText('平移 请点击黄色方块');

        this.footer.setTasks(
            [3, 9, eqTask],
        );

        this.input.click = (id: number) => {
            let [x, y] = this.getXY(id);

            let move = (check: (x: number, y: number) => boolean, dx: number, dy: number) => {
                let flag = true;
                for (let box of this.boxes) {
                    let [i, j] = this.getXY(box.index);
                    if (i === 0 || i === 5 || j === 0 || j === 5) {
                        continue;
                    }
                    if (check(i, j) && (i + dx === 0 || i + dx === 5 || j + dy === 0 || j + dy === 5)) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    for (let box of this.boxes) {
                        let [i, j] = this.getXY(box.index);
                        if (i === 0 || i === 5 || j === 0 || j === 5) {
                            continue;
                        }
                        if (check(i, j)) {
                            box.index = this.getId(i + dx, j + dy);
                            box.animes.positionTo([...this.getPosition(box.index), 10], { speed: 120 / 0.2 });
                        }
                    }
                }
            };

            if (x == 0) {
                move((i, j) => (j === y), -1, 0);
            } else if (x == 5) {
                move((i, j) => (j === y), 1, 0);
            } else if (y == 0) {
                move((i, j) => (i === x), 0, -1);
            } else if (y == 5) {
                move((i, j) => (i === x), 0, 1);
            }

            let cnt = 0;
            for (let box of this.boxes) {
                let [i, j] = this.getXY(box.index);
                if (i >= 1 && i <= 3 && j >= 1 && j <= 3) {
                    cnt++;
                }
            }
            this.footer.tasks[0].set(cnt);
            this.footer.update();
        };
    }
}
