import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, grey, leIncreasingTask, print, random, range, rangeMatrix, red, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: boolean[][];
    constructor(father: Controller) {
        super(father, 4, 7);
        this.tag = genArray(this.n, () => genArray(this.m, () => false));
        this.header.setText('开关 请点击左侧方块');

        this.footer.setTasks(
            [7, 12, eqTask]
        );

        var find = (check: (x: number, y: number) => boolean) => {
            let x = random(4), y = random(3);
            while (!check(x, y)) {
                x = random(4), y = random(3);
            }
            return [x, y];
        };

        for (let i = 0; i < 6; i++) {
            let [x, y] = find((x, y) => (!this.tag[x][y]));
            this.tag[x][y] = this.tag[x][y + 4] = true;
        }

        for (let i = 0; i < 5; i++) {
            let [x, y] = find((x, y) => (this.tag[x][y] === this.tag[x][y + 4]));
            this.tag[x][y] = !this.tag[x][y];
        }
        print(this.tag);

        for (let i of range(this.n)) {
            this.boxes[this.getId(i, 3)].animes.opacityTo(0, { immediately: true });
        }
        this.boxes[this.getId(2, 3)].animes.opacityTo(0.5, { immediately: true });
        this.boxes[this.getId(2, 3)].animes.contentTo('->', black, { immediately: true });

        for (let [i, j] of rangeMatrix(this.n, this.m)) {
            this.boxes[this.getId(i, j)].animes.bgColorTo(this.tag[i][j] ? grey : white);
        }

        this.input.click = (id: number) => {
            let [x, y] = this.getXY(id);
            if (y >= 3) {
                return;
            }
            for (let [i, j] of rangeMatrix(4, 3)) {
                if (this.getId(i, j) !== id) {
                    this.tag[i][j] = !this.tag[i][j];
                    this.boxes[this.getId(i, j)].animes.bgColorTo(this.tag[i][j] ? grey : white);
                }
            }
            let cnt = 0;
            for (let [i, j] of rangeMatrix(4, 3)) {
                if (this.tag[i][j] === this.tag[i][j + 4]) {
                    cnt++;
                }
            }
            this.footer.tasks[0].set(cnt);
            this.footer.update();
        };
    }
}
