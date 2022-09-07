import { Grid } from "../stageBase/Grid";
import { eqTask, genArray } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: number[];
    constructor(father: Controller) {
        super(father, 0, 0);
        this.tag = genArray(this.size, () => -1);
        this.header.setText('空关卡');

        this.footer.setTasks(
            [0, 1, eqTask],
        );
        this.input.click = (id: number) => {
            this.footer.update();
        };
    }
}
