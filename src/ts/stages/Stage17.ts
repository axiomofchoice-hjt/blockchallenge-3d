import { Grid } from "../stageBase/Grid";
import { black, DIRECTION, eqTask, genArray, print, white, yellow } from "../ui/util";
import { Controller } from "./Controller";

function calcHeight(tag: number) {
    return tag * 10 + 2;
}

export default class Stage extends Grid {
    tag: number[];
    constructor(father: Controller) {
        super(father, 4, 6);
        this.header.setText('水滴 请点击方块');

        this.footer.setTasks(
            [0, 12, eqTask],
        );

        this.tag = [
            -1, -1, 2, -1, -1, -1,
            2, 2, 2, 2, 2, 2,
            -1, 2, 2, -1, 2, 2,
            -1, -1, 2, -1, -1, -1
        ];
        for (let i of this.getIds()) {
            if (this.tag[i] === -1) {
                this.boxes[i].animes.visibleTo(false);
            } else {
                this.boxes[i].animes.bgColorTo(yellow, { immediately: true });
                this.boxes[i].animes.contentTo(this.tag[i], black, { immediately: true });
                this.boxes[i].animes.heightTo(calcHeight(this.tag[i]), { immediately: true });
            }
        }

        this.input.click = (id: number) => {
            if (this.tag[id] <= 0) {
                return;
            } else if (this.tag[id] === 1) {
                this.tag[id] = 2;
                this.boxes[id].animes.integerTo(this.tag[id]);
                this.boxes[id].animes.heightTo(calcHeight(this.tag[id]));
            } else if (this.tag[id] === 4) {
                this.tag[id] = 0;
                this.boxes[id].animes.bgColorTo(white);
                this.boxes[id].animes.integerTo(this.tag[id]);
                this.boxes[id].animes.heightTo(calcHeight(this.tag[id]));
            } else {
                this.tag[id] = 0;
                this.boxes[id].animes.bgColorTo(white);
                this.boxes[id].animes.integerTo(this.tag[id]);
                this.boxes[id].animes.heightTo(calcHeight(this.tag[id]));
                let [x, y] = this.getXY(id);
                for (let { position: [dx, dy] } of DIRECTION) {
                    let ptr = this.getId(x + dx, y + dy);
                    if (this.inArea(x + dx, y + dy) && this.tag[ptr] != -1) {
                        this.tag[ptr] = Math.min(4, this.tag[ptr] + 1);
                        this.boxes[ptr].animes.bgColorTo(yellow);
                        this.boxes[ptr].animes.integerTo(this.tag[ptr]);
                        this.boxes[ptr].animes.heightTo(calcHeight(this.tag[ptr]));
                    }
                }
            }
            this.footer.tasks[0].set(0);
            for (let i of this.tag) {
                if (i === 0) {
                    this.footer.tasks[0].add(1);
                }
            }
            this.footer.update();
        };
    }
}
