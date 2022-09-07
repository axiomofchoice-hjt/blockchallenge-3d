import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, leIncreasingTask, red, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    L: number;
    R: number;
    tag: number[];
    constructor(father: Controller) {
        super(father, 8, 8);
        this.L = 0;
        this.R = this.size - 1;
        this.tag = genArray(this.size, () => -1);
        this.header.setText('找零游戏 请点击数字 注：灰色方块的数字仅表示位置');

        this.footer.setTasks(
            [0, 1, eqTask],
            [0, 15, leIncreasingTask]
        );
        for (let id of this.getIds()) {
            this.boxes[id].animes.contentTo(id + 1, black, { immediately: true });
        }
        this.input.click = (id: number) => {
            let Min = 0;
            var lside = (num: number) => {
                for (let i = num + 1; i <= this.R; i++) {
                    if (this.tag[i] !== -1) {
                        Min = Math.max(Min, this.tag[i] + Math.abs(i - num));
                    }
                }
                for (let i = 0; i < num; i++) {
                    if (this.tag[i] !== -1) {
                        Min = Math.min(Min, this.tag[i] - Math.abs(i - num));
                    }
                }
            };
            var rside = (num: number) => {
                for (let i = this.L; i < num; i++) {
                    if (this.tag[i] !== -1) {
                        Min = Math.max(Min, this.tag[i] + Math.abs(i - num));
                    }
                }
                for (let i = num + 1; i < this.size; i++) {
                    if (this.tag[i] !== -1) {
                        Min = Math.min(Min, this.tag[i] - Math.abs(i - num));
                    }
                }
            };
            if (this.tag[id] !== -1) { return; }
            this.footer.tasks[1].add(1);
            if (this.footer.tasks[1].now === 1) {
            } else if (this.R - this.L === 1 && this.L <= id && id <= this.R) {
                this.L = this.R = id;
                Min = 0;
            } else if (id > this.R) {
                rside(id);
            } else if (id < this.L) {
                lside(id);
            } else {
                var n2 = this.L;
                while (this.tag[n2] === -1) { n2++; }
                var [l, r] = [id, n2]; if (l > r) [l, r] = [r, l];
                if ((this.R - r === l - this.L && Math.random() < 0.5) || this.R - r > l - this.L) {
                    this.L = l + 1;
                    lside(id);
                } else {
                    this.R = r - 1;
                    rside(id);
                }
            }
            Min = Math.max(
              Min,
              2 * Math.abs(this.L - this.R) + Math.abs(this.L - id),
              2 * Math.abs(this.L - this.R) + Math.abs(this.R - id)
            );
            if (Min === 0) { this.footer.tasks[0].set(1); }
            this.tag[id] = Min;
            this.boxes[id].animes.contentTo(Min);
            this.boxes[id].animes.bgColorTo(Min === 0 ? red : blue);

            this.footer.update();
        };
    }
}
