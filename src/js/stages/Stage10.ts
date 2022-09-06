import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, geTask, grey, leIncreasingTask, orange, print, range, rangeMatrix, red, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: boolean[];

    constructor(father: Controller) {
        super(father, 7, 7);
        this.tag = genArray(this.size, () => false);
        this.header.setText('色彩游戏 请点击方块');

        this.footer.setTasks(
            [0, 13, geTask],
            [0, 13, geTask],
            [49, 13, geTask]
        );

        for (let i of this.getIds()) {
            this.boxes[i].animes.bgColorTo(yellow, { immediately: true });
        }

        this.input.click = (id: number) => {
            this.tag[id] = !this.tag[id];

            this.footer.tasks[0].set(0);
            this.footer.tasks[1].set(0);
            this.footer.tasks[2].set(0);

            let vis = genArray(this.size, () => false);

            for (let j of range(this.m)) {
                for (let i of range(this.n)) {
                    let ptr = this.getId(i, j);
                    if (this.tag[ptr]) {
                        break;
                    }
                    if (!vis[ptr]) {
                        vis[ptr] = true;
                        this.boxes[ptr].animes.bgColorTo(yellow);
                        this.footer.tasks[2].add(1);
                    }
                }
            }
            for (let i of range(this.n)) {
                for (let j of range(this.m)) {
                    let ptr = this.getId(i, j);
                    if (this.tag[ptr]) {
                        break;
                    }
                    if (!vis[ptr]) {
                        vis[ptr] = true;
                        this.boxes[ptr].animes.bgColorTo(blue);
                        this.footer.tasks[1].add(1);
                    }
                }
            }
            for (let i of this.getIds()) {
                if (!vis[i]) {
                    this.boxes[i].animes.bgColorTo(this.tag[i] ? grey : white);
                    if (!this.tag[i]) {
                        this.footer.tasks[0].add(1);
                    }
                }
            }

            this.footer.update();
        };
    }
}
