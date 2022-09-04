import { black, print, white, yellow } from '../ui/util';
import { Controller } from './Controller';
import { Cookie } from './Cookie';
import { Grid } from './Grid';

export const STAGE_COUNT = 1;
const COLUMN_COUNT = 5;

export class ChooseStage extends Grid {
    constructor(father: Controller) {
        super(father,
            Math.floor((STAGE_COUNT + COLUMN_COUNT - 1) / COLUMN_COUNT),
            COLUMN_COUNT
        );
        for (let id of this.getIds()) {
            if (id < STAGE_COUNT) {
                this.boxes[id].animes.contentTo(id + 1, black, { duration: 0 });
                this.boxes[id].animes.bgColorTo(Cookie.get(id) ? yellow : white, { duration: 0 });
            } else {
                this.boxes[id].animes.opacityTo(0, { duration: 0 });
            }
        }

        this.header.setText('请选择关卡');
        this.footer.addTask(Cookie.count(), STAGE_COUNT, (now, max) => (now < max ? 0 : 1));

        this.input.click = (id) => {
            if (id < STAGE_COUNT) {
                this.father.enterStage(id);
            }
        };
    }
}