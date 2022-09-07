import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, leIncreasingTask, red, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    L: number;
    R: number;
    tag: boolean[];
    constructor(father: Controller) {
        super(father, 7, 9);
        this.L = 0;
        this.R = this.size - 1;
        this.tag = genArray(this.size, () => false);
        this.header.setText('猜数游戏 请点击数字');

        this.footer.setTasks(
            [0, 1, eqTask],
            [0, 6, leIncreasingTask]
        );
        for (let id of this.getIds()) {
            this.boxes[id].animes.contentTo(id + 1, black, { immediately: true });
        }
        this.input.click = (id: number) => {
            if (this.tag[id]) { return; }
            this.tag[id] = true;
            this.footer.tasks[1].add(1);
            if (id === this.L && this.L == this.R) {
                this.boxes[id].animes.contentTo("ok");
                this.boxes[id].animes.bgColorTo(red);
                this.footer.tasks[0].set(1);
            } else if ((id * 2 === this.L + this.R && Math.random() < 0.5) || id * 2 < this.L + this.R) {
                this.boxes[id].animes.contentTo(">");
                this.boxes[id].animes.bgColorTo(yellow);
                if (this.L <= id && id <= this.R) {
                    this.L = id + 1;
                }
            } else {
                this.boxes[id].animes.contentTo("<");
                this.boxes[id].animes.bgColorTo(blue);
                if (this.L <= id && id <= this.R) {
                    this.R = id - 1;
                }
            }
            this.footer.update();
        };
    }
}
