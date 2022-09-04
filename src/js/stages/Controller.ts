import { StageInterface } from "./StageInterface";
import { ChooseStage } from './ChooseStage';
import { Stage0 } from "./Stage0";


export class Controller {
    stage: StageInterface;
    stageId: number;
    constructor() {
        this.stageId = -1;
        this.stage = new ChooseStage(this);
    }
    enterStage(id: number) {
        this.stage.drop();
        this.stageId = id;
        if (id == 0) {
            this.stage = new Stage0(this);
        } else {

        }
    }
}