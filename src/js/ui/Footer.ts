import { textBlack, textGreen, textRed } from "./util";

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

        this.update();
    }
    add(k: number) {
        this.now += k;
        this.update();
    }
    set(k: number) {
        this.now = k;
        this.update();
    }
    update() {
        let check = this.check(this.now, this.max);
        this.dom.style.color = check == 1 ? textGreen : check == 0 ? textBlack : textRed;
        this.dom.innerText = `[${this.now}/${this.max}]`;
        this.father.update();
    }
}

class Footer {
    dom: HTMLDivElement;
    tasks: Task[];
    frontSpan: HTMLSpanElement;
    tasksSpan: HTMLSpanElement;
    completeSpan: HTMLSpanElement;
    constructor() {
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
    addTask(now: number, max: number, check: (now: number, max: number) => number) {
        this.tasks.push(new Task(this, now, max, check));
    }
    completed(): boolean {
        for (let task of this.tasks) {
            if (!task.check(task.now, task.max)) {
                return false;
            }
        }
        return true;
    }
    update() {
        this.completeSpan.style.display = (this.completed() ? 'inline' : 'none');
    }
    // drop() {
    //     this.tasks = [];
    //     this.dom.remove();
    // }
};

export { Footer };