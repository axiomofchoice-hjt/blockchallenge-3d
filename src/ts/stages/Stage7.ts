import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, green, leIncreasingTask, print, random, range, rangeMatrix, red, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: number[];
    constructor(father: Controller) {
        super(father, 5, 6);
        this.tag = genArray(this.size, () => 0);
        this.header.setText('金币 请点击方块');

        var gen = (value: number, num: number) => {
            for (let i = 0; i < num; i++) {
                let id = random(this.size);
                while (this.tag[id]) {
                    id = random(this.size);
                }
                this.tag[id] = value;
                if (value === 2) {
                    this.boxes[id].animes.bgColorTo(yellow, { immediately: true });
                    this.boxes[id].animes.contentTo('Au', black, { immediately: true });
                } else if (value === 1) {
                    this.boxes[id].animes.bgColorTo(green, { immediately: true });
                    this.boxes[id].animes.contentTo('+1', black, { immediately: true });
                } else {
                    this.boxes[id].animes.bgColorTo(red, { immediately: true });
                    this.boxes[id].animes.contentTo('-1', black, { immediately: true });
                }
            }
        };
        gen(-1, 2);
        gen(1, 2);
        gen(2, 10);
        for (let i of this.getIds()) {
            if (this.tag[i] === 0) {
                this.boxes[i].animes.opacityTo(0, { immediately: true });
            }
        }

        this.footer.setTasks(
            [0, 2000, eqTask]
        );
        this.input.click = (id: number) => {
            if (this.tag[id] === 0) { return; }
            if (this.tag[id] === 1) {
                this.footer.tasks[0].add(1);
            } else if (this.tag[id] === -1) {
                this.footer.tasks[0].add(-1);
            } else if (this.tag[id] === 2) {
                this.footer.tasks[0].now *= 2;
            }
            this.tag[id] = 0;
            this.boxes[id].animes.opacityTo(0);
            this.footer.update();
        };
    }
}
