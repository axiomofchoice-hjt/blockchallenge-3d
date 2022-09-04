import { StageInterface } from "./StageInterface";
import { ChooseStage } from './ChooseStage';
import { Stage0 } from "./stage0";


export class Controller {
    stage: StageInterface;
    stageId: number;
    constructor() {
        this.stage = new ChooseStage(this);
        this.stageId = -1;
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