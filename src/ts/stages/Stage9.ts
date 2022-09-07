import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, leIncreasingTask, print, range, rangeMatrix, red, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: number[];
    constructor(father: Controller) {
        super(father, 3, 4);
        this.tag = genArray(this.size, () => 0);
        this.header.setText('点灯游戏 请点击方块');

        this.footer.setTasks(
            [0, 12, eqTask]
        );

        for (let id of this.getIds()) {
            let [x, y] = this.getXY(id);
            this.tag[id] = 2;
            if ((x + y) % 2 !== 0) {
                this.boxes[id].animes.contentTo('+');
            } else {
                this.boxes[id].animes.contentTo('-');
            }
            this.boxes[id].animes.bgColorTo(yellow);
        }

        this.input.click = (id: number) => {
            if (this.tag[id] !== 2) { return; }
            let [x, y] = this.getXY(id);
            this.footer.tasks[0].add(1);

            this.tag[id] = 0;
            this.boxes[id].animes.opacityTo(0, { immediately: true });

            for (let ptr of this.getIds()) {
                let [i, j] = this.getXY(ptr);
                if (Math.abs(i - x) <= 1 && Math.abs(j - y) <= 1 && this.tag[ptr] !== 0) {
                    if ((x + y) % 2 !== 0) {
                        this.tag[ptr] = 2;
                        this.boxes[ptr].animes.bgColorTo(yellow);
                    } else {
                        this.tag[ptr] = 1;
                        this.boxes[ptr].animes.bgColorTo(white);
                    }
                }
            }

            this.footer.update();
        };
    }
}
