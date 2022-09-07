import { Grid } from "../stageBase/Grid";
import { black, blue, eqTask, genArray, green, leIncreasingTask, print, range, rangeMatrix, red, yellow } from "../ui/util";
import { Controller } from "./Controller";

const SHAPE: [number, number][][] = [
    [[-1, 0], [0, -1], [0, 1]],
    [[-1, 0], [0, 0], [0, 1]],
    [[0, -1], [0, 0], [0, 1]]
];

const COLOR: string[] = [
    green, yellow, blue
]

export default class Stage extends Grid {
    tag: boolean[];
    constructor(father: Controller) {
        super(father, 6, 6);
        this.tag = genArray(this.size, () => false);
        this.header.setText('铺地砖游戏 请点击方块');

        this.footer.setTasks(
            [0, 3, eqTask],
            [0, 3, eqTask],
            [0, 5, eqTask]
        );
        this.input.click = (id: number) => {
            let [x, y] = this.getXY(id);
            var check = (dx: number, dy: number) => (
                this.inArea(x + dx, y + dy) && !this.tag[this.getId(x + dx, y + dy)]
            )
            for (let taskId of range(3)) {
                if (!this.footer.tasks[taskId].ok()) {
                    let flag = true;
                    for (let [dx, dy] of SHAPE[taskId]) {
                        if (!check(dx, dy)) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        for (let [dx, dy] of SHAPE[taskId]) {
                            this.boxes[this.getId(x + dx, y + dy)].animes.bgColorTo(COLOR[taskId]);
                            this.tag[this.getId(x + dx, y + dy)] = true;
                        }
                        this.footer.tasks[taskId].add(1);
                    }
                    break;
                }
            }
            this.footer.update();
        };
    }
}
