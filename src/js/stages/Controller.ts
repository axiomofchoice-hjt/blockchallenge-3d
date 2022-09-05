import { StageInterface } from "./StageInterface";
import { ChooseStage } from './ChooseStage';
import { Stage0 } from "./Stage0";
import { Cookie } from "./Cookie";


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
        if (id == -1) {
            this.stage = new ChooseStage(this);
        }
        if (id == 0) {
            this.stage = new Stage0(this);
        }
    }
    backEvent() {
        if (this.stageId == -1) {
            // todo
        } else {
            this.enterStage(-1);
        }
    }
    restartEvent() {
        if (this.stageId == -1) {
            if (confirm("清除所有记录？")) {
                Cookie.clear();
                this.enterStage(this.stageId);
            }
        } else {
            this.enterStage(this.stageId);
        }
    }
}