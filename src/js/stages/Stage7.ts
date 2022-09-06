import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, green, leIncreasingTask, print, random, range, rangeMatrix, red, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: number[];
    constructor(father: Controller) {
        super(father, 5, 6);
        this.tag = genArray(this.size, () => 0);
        this.header.setText('捡金币游戏 请点击方块');

        var gen = (value: number, num: number) => {
            for (let i = 0; i < num; i++) {
                let id = random(this.size)
                while (this.tag[id]) {
                    id = random(this.size)
                }
                this.tag[id] = value;
                if (value === 2) {
                    this.boxes[id].animes.bgColorTo(yellow, { duration: 0 });
                    this.boxes[id].animes.contentTo('Au', black, { duration: 0 });
                } else if (value === 1) {
                    this.boxes[id].animes.bgColorTo(green, { duration: 0 });
                    this.boxes[id].animes.contentTo('+1', black, { duration: 0 });
                } else {
                    this.boxes[id].animes.bgColorTo(red, { duration: 0 });
                    this.boxes[id].animes.contentTo('-1', black, { duration: 0 });
                }
            }
        };
        gen(-1, 2);
        gen(1, 2);
        gen(2, 10);

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
            this.boxes[id].animes.bgColorTo(white);
            this.boxes[id].animes.contentTo('');
            this.footer.update();
        };
    }
}
