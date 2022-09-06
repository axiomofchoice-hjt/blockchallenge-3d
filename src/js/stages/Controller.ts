import { StageInterface } from "../stageBase/StageInterface";
import { ChooseStage } from './ChooseStage';
import Stage0 from "./Stage0";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import { Cookie } from "../stageBase/Cookie";

export const STAGE_COUNT = 4;

export class Controller {
    stages: any[];
    stage: StageInterface;
    stageId: number;
    constructor() {
        this.stageId = -1;
        this.stage = new ChooseStage(this);
        this.stages = [
            Stage0,
            Stage1,
            Stage2,
            Stage3
        ];
        console.assert(
            this.stages.length === STAGE_COUNT,
            "Controller stages need update"
        );
    }
    enterStage(id: number) {
        this.stage.drop();
        this.stageId = id;
        if (id == -1) {
            this.stage = new ChooseStage(this);
        }
        this.stage = new this.stages[id](this);
    }
    backEvent() {
        if (this.stageId == -1) {
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