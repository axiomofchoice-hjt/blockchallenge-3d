import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, geTask, leIncreasingTask, print, range, rangeMatrix, red, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: number[];
    constructor(father: Controller) {
        super(father, 4, 5);
        this.tag = genArray(this.size, () => 0);
        this.header.setText('又是填充游戏 请点击方块');

        this.footer.setTasks(
            [0, 15, geTask]
        );
        this.input.click = (id: number) => {
            if (this.tag[id] === 2) { return; }
            let [x, y] = this.getXY(id);
            this.footer.tasks[0].add(1);
            if (this.tag[id] === 0) {
                for (let ptr of this.getIds()) {
                    let [i, j] = this.getXY(ptr);
                    if ((i == x || j == y) && this.tag[ptr] !== 1) {
                        this.boxes[ptr].animes.bgColorTo(blue)
                        this.tag[ptr] = 1;
                    }
                }
            } else {
                for (let ptr of this.getIds()) {
                    let [i, j] = this.getXY(ptr);
                    if (Math.abs(i - x) <= 1 && Math.abs(j - y) <= 1 && this.tag[ptr] !== 2) {
                        this.boxes[ptr].animes.bgColorTo(yellow)
                        this.tag[ptr] = 2;
                    }
                }
            }
            this.footer.update();
        };
    }
}
