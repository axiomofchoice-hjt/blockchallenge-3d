import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, leIncreasingTask, print, range, rangeMatrix, red, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    l: number[];
    r: number[];
    constructor(father: Controller) {
        super(father, 7, 9);
        this.l = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.r = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1];
        this.header.setText('找不同 请点击左侧方块');

        this.footer.setTasks(
            [10, 18, eqTask]
        );

        let getIndex = (x: number, y: number) => {
            if (x < 0 || x >= 7 || y < 0 || y >= 4) return -1;
            if (x == 0) { return y; }
            if (y == 3) { return x + 3; }
            if (x == 6) { return 12 - y; }
            if (y == 0) { return 18 - x; }
            return -1;
        };
        for (let id of this.getIds()) {
            let [x, y] = this.getXY(id);
            let leftId = getIndex(x, y);
            let rightId = getIndex(x, y - 5);
            if (leftId !== -1 && this.l[leftId] === 1) {
                this.boxes[id].animes.bgColorTo(yellow, { immediately: true });
            }
            if (rightId !== -1 && this.r[rightId] === 1) {
                this.boxes[id].animes.bgColorTo(yellow, { immediately: true });
            }
            if (leftId === -1 && rightId === -1) {
                this.boxes[id].animes.opacityTo(0, { immediately: true });
            }
        }
        this.boxes[this.getId(3, 4)].animes.opacityTo(0.5, { immediately: true });
        this.boxes[this.getId(3, 4)].animes.contentTo('->', black, { immediately: true });

        this.input.click = (id: number) => {
            let [x, y] = this.getXY(id);
            let index = getIndex(x, y);
            if (index === -1 || this.l[index] === 1) {
                return;
            }
            this.l[index] = 1;
            this.boxes[id].animes.bgColorTo(yellow);
            let sum = 0;
            for (let i of this.l) {
                sum += i;
            }
            if (sum !== this.l.length) {
                for (let i of range(3)) {
                    index = (index + 1) % this.l.length;
                    while (this.l[index]) {
                        index = (index + 1) % this.l.length;
                    }
                }
                this.l[index] = 1;
                for (let id of this.getIds()) {
                    let [x, y] = this.getXY(id);
                    let leftId = getIndex(x, y);
                    if (leftId === index) {
                        this.boxes[id].animes.bgColorTo(yellow);
                    }
                }
            }
            this.footer.tasks[0].set(0);
            for (let i = 0; i < this.l.length; i++) {
                if (this.l[i] === this.r[i]) {
                    this.footer.tasks[0].add(1);
                }
            }

            this.footer.update();
        };
    };
}
