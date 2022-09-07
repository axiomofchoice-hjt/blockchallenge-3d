import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, green, leIncreasingTask, print, range, rangeMatrix, red, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: boolean[];
    constructor(father: Controller) {
        super(father, 5, 5);
        this.tag = genArray(this.size, () => false);
        this.header.setText('布雷游戏 请点击方块');

        this.footer.setTasks(
            [0, 8, eqTask]
        );
        this.input.click = (id: number) => {
            let [x, y] = this.getXY(id);
            this.tag[id] = !this.tag[id];
            this.boxes[id].animes.bgColorTo(this.tag[id] ? green : white);
            let appear = genArray(8, () => false)
            for (let ptr of this.getIds()) {
                let [i, j] = this.getXY(ptr);
                if (this.tag[ptr]) {
                    this.boxes[ptr].animes.contentTo('');
                } else {
                    let cnt = 0;
                    for (let sptr of this.getIds()) {
                        let [si, sj] = this.getXY(sptr);
                        if (Math.abs(si - i) <= 1 && Math.abs(sj - j) <= 1 && this.tag[sptr]) {
                            cnt++;
                        }
                    }
                    if (cnt === 0) {
                        this.boxes[ptr].animes.contentTo('');
                    } else {
                        this.boxes[ptr].animes.contentTo(cnt);
                        appear[cnt - 1] = true;
                    }
                }
            }
            let cnt = 0;
            for (let i of appear) {
                if (i) {
                    cnt++;
                }
            }
            this.footer.tasks[0].set(cnt);
            this.footer.update();
        };
    }
}
