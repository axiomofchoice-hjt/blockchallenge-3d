import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, random, range, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: number[];
    used: boolean[];
    constructor(father: Controller) {
        super(father, 7, 5, false);
        this.tag = [4, 5, 3, 2, 4];
        this.used = genArray(5, () => false);
        this.header.setText('博弈 让对方无法操作 请点击方块');

        this.footer.setTasks(
            [0, 1, eqTask],
        );

        for (let ptr of range(30)) {
            let box = this.genBox(ptr, 2);
            let [i, j] = this.getXY(ptr);
            box.animes.position[2].load(-1, { immediately: true });
        }
        for (let j of range(5)) {
            let box = this.genBox(this.getId(5 - this.tag[j], j), 20);
            box.animes.bgColorTo(yellow, { immediately: true });
            box.animes.contentTo('P', black, { immediately: true });
            box.index = j;
            this.boxes.push(box);
        }
        {
            let box = this.genBox(this.getId(6, 2), 2);
            box.animes.contentTo('->', black, { immediately: true });
            box.index = 5;
            this.boxes.push(box);
        }

        this.input.click = (id: number) => {
            const using = () => {
                for (let i of this.used) {
                    if (i === true) {
                        return true;
                    }
                }
                return false;
            };
            const state = () => {
                for (let i of range(5)) {
                    if (this.tag[i] % 2 == 1) {
                        return true;
                    }
                }
                return false;
            };
            const win = () => {
                for (let i of range(5)) {
                    if (this.tag[i] !== 0) {
                        return false;
                    }
                }
                return true;
            };
            if (id !== 5) {
                if (!this.used[id]) {
                    if (this.tag[id] === 0) {
                        return;
                    }
                    this.tag[id]--;
                    this.used[id] = true;
                } else {
                    this.tag[id]++;
                    this.used[id] = false;
                }
                this.boxes[id].animes.position2DTo(this.getPosition(this.getId(5 - this.tag[id], id)));
                this.boxes[id].animes.bgColorTo(!this.used[id] ? (this.tag[id] ? yellow : white) : blue);
            } else {
                if (!using()) {
                    return;
                }
                if (win()) {
                    this.footer.tasks[0].set(1);
                } else if (state()) {
                    for (let i of range(5)) {
                        if (this.tag[i] % 2 == 1) {
                            this.tag[i]--;
                            this.boxes[i].animes.position2DTo(this.getPosition(this.getId(5 - this.tag[i], i)));
                        }
                    }
                } else {
                    let ok = false;
                    while (!ok) {
                        for (let i of range(5)) {
                            if (this.tag[i] !== 0 && random(2)) {
                                ok = true;
                                this.tag[i]--;
                                this.boxes[i].animes.position2DTo(this.getPosition(this.getId(5 - this.tag[i], i)));
                            }
                        }
                    }
                }
                for (let i of range(5)) {
                    this.used[i] = false;
                    this.boxes[i].animes.bgColorTo(!this.used[i] ? (this.tag[i] ? yellow : white) : blue);
                }
            }
            this.boxes[5].animes.bgColorTo(using() ? yellow : white);
            this.footer.update();
        };
    }
}
