import * as THREE from 'three';
import { Grid, ZOOM } from "../stageBase/Grid";
import { Box } from '../ui/Box';
import { Material } from '../ui/Material';
import { black, eqTask, genArray, geTask, green, grey, print, purple, range, red, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

const COMPOSITION: { from: [number, number, number]; to: [number, number, number]; score: number; }[] = [
    {
        from: [0, 0, -1],
        to: [1, 1, 1],
        score: 0
    },
    {
        from: [0, 1, -1],
        to: [2, 2, -1],
        score: 0
    },
    {
        from: [1, 2, -1],
        to: [0, 0, 1],
        score: 0
    },
    {
        from: [2, 2, -1],
        to: [-1, -1, -1],
        score: 1
    },
    {
        from: [2, 2, 2],
        to: [2, 2, -1],
        score: 1
    }
];

export default class Stage extends Grid {
    tag: number[];

    constructor(father: Controller) {
        super(father, 4, 7);
        this.header.setText('化学 请点击方块');
        this.tag = genArray(this.size, () => -1);
        for (let box of this.boxes) {
            box.animes.visibleTo(false);
        }
        {
            let box = this.boxes[this.getId(0, 3)];
            box.animes.contentTo('->', black, { immediately: true });
            box.animes.bgColorTo(yellow, { immediately: true });
        }
        {
            let shape = new THREE.Shape();
            shape.moveTo(
                (0 - this.m / 2 + 0.5) * ZOOM - 57,
                -(0 - this.n / 2 + 0.5) * ZOOM + 57
            );
            shape.lineTo(
                (0 - this.m / 2 + 0.5) * ZOOM - 57,
                -(0 - this.n / 2 + 0.5) * ZOOM - 57
            );
            shape.lineTo(
                (2 - this.m / 2 + 0.5) * ZOOM + 57,
                -(0 - this.n / 2 + 0.5) * ZOOM - 57
            );
            shape.lineTo(
                (2 - this.m / 2 + 0.5) * ZOOM + 57,
                -(0 - this.n / 2 + 0.5) * ZOOM + 57
            );
            let geometry = new THREE.ShapeGeometry(shape);
            let material = Material.solid(grey);
            material.opacity = 0.5;
            let mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
        }
        {
            let shape = new THREE.Shape();
            shape.moveTo(
                (4 - this.m / 2 + 0.5) * ZOOM - 57,
                -(0 - this.n / 2 + 0.5) * ZOOM + 57
            );
            shape.lineTo(
                (4 - this.m / 2 + 0.5) * ZOOM - 57,
                -(0 - this.n / 2 + 0.5) * ZOOM - 57
            );
            shape.lineTo(
                (6 - this.m / 2 + 0.5) * ZOOM + 57,
                -(0 - this.n / 2 + 0.5) * ZOOM - 57
            );
            shape.lineTo(
                (6 - this.m / 2 + 0.5) * ZOOM + 57,
                -(0 - this.n / 2 + 0.5) * ZOOM + 57
            );
            let geometry = new THREE.ShapeGeometry(shape);
            let material = Material.solid(grey);
            material.opacity = 0.5;
            let mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
        }
        for (let i of range(3)) {
            let box = this.boxes[this.getId(1, i)];
            this.tag[i + 7] = 0;
            box.animes.visibleTo(true);
            box.animes.bgColorTo(green, { immediately: true });
        }

        this.footer.setTasks(
            [0, 4, geTask],
        );
        const getSize = (l: number, r: number) => {
            let res = 0;
            for (let i = l; i <= r; i++) {
                if (this.tag[i] !== -1) {
                    res++;
                }
            }
            return res;
        };
        const leftSize = () => { return getSize(0, 2); };
        const rightSize = () => { return getSize(4, 6); };
        const bagSize = () => { return getSize(7, this.size - 1); };
        const swap = (id1: number, id2: number) => {
            this.boxes[id1].animes.position2DTo(
                this.getPosition(id2)
            );
            this.boxes[id2].animes.position2DTo(
                this.getPosition(id1)
            );
            [this.boxes[id1], this.boxes[id2]] = [this.boxes[id2], this.boxes[id1]];
            this.boxes[id1].index = id1;
            this.boxes[id2].index = id2;
            [this.tag[id1], this.tag[id2]] = [this.tag[id2], this.tag[id1]];
        };
        const move = (from: number, to: number) => {
            if (from < to) {
                for (let i = from; i <= to - 1; i++) {
                    swap(i, i + 1);
                }
            } else if (from > to) {
                for (let i = from; i >= to + 1; i--) {
                    swap(i, i - 1);
                }
            }
        };
        this.input.click = (id: number) => {
            if (id >= 0 && id < leftSize() && bagSize() < 21) {
                let pos = bagSize();
                while (pos > 0 && this.tag[pos - 1 + 7] > this.tag[id]) {
                    pos--;
                }
                move(bagSize() + 7, pos + 7);
                swap(pos + 7, id);
                move(id, leftSize());
            }
            if (id >= 4 && id - 4 < rightSize() && bagSize() < 21) {
                let pos = bagSize();
                while (pos > 0 && this.tag[pos - 1 + 7] > this.tag[id]) {
                    pos--;
                }
                move(bagSize() + 7, pos + 7);
                swap(pos + 7, id);
                move(id, rightSize() + 4);
            }
            if (id >= 7 && id - 7 < bagSize() && leftSize() < 3) {
                let pos = leftSize();
                while (pos > 0 && this.tag[pos - 1] > this.tag[id]) {
                    pos--;
                }
                move(leftSize(), pos);
                swap(pos, id);
                move(id, bagSize() + 7);
            }
            if (id === 3 && rightSize() === 0) {
                for (let comp of COMPOSITION) {
                    if (comp.from[0] === this.tag[0] && comp.from[1] === this.tag[1] && comp.from[2] === this.tag[2]) {
                        for (let i of range(3)) {
                            this.tag[i] = -1;
                            this.boxes[i].animes.visibleTo(false);

                            if (comp.to[i] !== -1) {
                                this.tag[i + 4] = comp.to[i];
                                this.boxes[i + 4].animes.bgColorTo(
                                    [green, purple, red][comp.to[i]], { immediately: true }
                                );
                                this.boxes[i + 4].animes.visibleTo(true);
                            }
                        }
                        this.footer.tasks[0].add(comp.score);
                    }
                }
            }

            let flag = false;
            if (rightSize() === 0) {
                for (let comp of COMPOSITION) {
                    if (comp.from[0] === this.tag[0] && comp.from[1] === this.tag[1] && comp.from[2] === this.tag[2]) {
                        flag = true;
                    }
                }
            }
            this.boxes[this.getId(0, 3)].animes.visibleTo(flag);
            this.footer.update();
        };
    }
}
