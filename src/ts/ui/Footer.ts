import { Cookie } from "../stageBase/Cookie";
import { StageInterface } from "../stageBase/StageInterface";
import { print, textBlack, textGreen, textRed } from "./util";

class Task {
    dom: HTMLSpanElement;
    now: number;
    max: number;
    check: (now: number, max: number) => number;
    father: Footer;
    constructor(father: Footer, now: number, max: number, check: (now: number, max: number) => number) {
        this.dom = document.createElement('span');
        this.dom.style.position = 'relative';
        this.dom.style.bottom = '2px';
        father.tasksSpan.appendChild(this.dom);
        this.now = now;
        this.max = max;
        this.check = check;
        this.father = father;
    }
    add(k: number) {
        this.now += k;
    }
    set(k: number) {
        this.now = k;
    }
    ok(): boolean {
        return this.check(this.now, this.max) === 1;
    }
    update() {
        let check = this.check(this.now, this.max);
        this.dom.style.color = check == 1 ? textGreen : check == 0 ? textBlack : textRed;
        this.dom.innerText = `[${this.now}/${this.max}]`;
    }
}

export class Footer {
    dom: HTMLDivElement;
    tasks: Task[];
    frontSpan: HTMLSpanElement;
    tasksSpan: HTMLSpanElement;
    completeSpan: HTMLSpanElement;
    father: StageInterface;
    constructor(father: StageInterface) {
        this.father = father;
        this.dom = document.createElement('div');
        this.dom.id = 'footer';
        this.dom.style.position = 'fixed';
        this.dom.style.zIndex = '101';
        this.dom.style.fontSize = '30px';
        this.dom.style.bottom = '20px';
        this.dom.style.left = '20px';

        {
            this.frontSpan = document.createElement('span');
            this.frontSpan.style.fontFamily = 'Arial';
            this.frontSpan.innerText = "任务 ";
            this.dom.appendChild(this.frontSpan);
        }
        {
            this.tasksSpan = document.createElement('span');
            this.tasksSpan.style.fontFamily = 'Consolas, monospace';
            this.tasksSpan.id = 'footerTasks';
            this.dom.appendChild(this.tasksSpan);
        }
        {
            this.completeSpan = document.createElement('span');
            this.completeSpan.style.fontFamily = 'Arial';
            this.completeSpan.innerText = ' completed!';
            this.completeSpan.style.display = 'none';
            this.completeSpan.style.color = textGreen;
            this.dom.appendChild(this.completeSpan);
        }

        document.body.appendChild(this.dom);

        this.tasks = [];
    }
    setTasks(...tasks: [number, number, (now: number, max: number) => number][]) {
        for (let task of tasks) {
            this.tasks.push(new Task(this, task[0], task[1], task[2]));
        }
        this.update();
    }
    completed(): boolean {
        for (let task of this.tasks) {
            if (task.check(task.now, task.max) !== 1) {
                return false;
            }
        }
        return true;
    }
    update() {
        for (let task of this.tasks) {
            task.update();
        }
        this.completeSpan.style.display = (this.completed() ? 'inline' : 'none');

        if (this.completed() && this.father.father.stageId >= 0) {
            Cookie.set(this.father.father.stageId);
        }
    }
    drop() {
        this.dom.remove();
    }
}