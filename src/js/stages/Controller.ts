import { StageInterface } from "../stageBase/StageInterface";
import { ChooseStage } from './ChooseStage';
import Stage0 from "./Stage0";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";
import Stage6 from "./Stage6";
import Stage7 from "./Stage7";
import Stage8 from "./Stage8";
import Stage9 from "./Stage9";
import Stage10 from "./Stage10";
import Stage11 from "./Stage11";
import Stage12 from "./Stage12";
import Stage13 from "./Stage13";
import Stage14 from "./Stage14";
import { Cookie } from "../stageBase/Cookie";

export const STAGE_COUNT = 15;

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
            Stage3,
            Stage4,
            Stage5,
            Stage6,
            Stage7,
            Stage8,
            Stage9,
            Stage10,
            Stage11,
            Stage12,
            Stage13,
            Stage14
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
        } else {
            this.stage = new this.stages[id](this);
        }
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