class Task {
    dom: HTMLSpanElement;
    now: number;
    max: number;
    check: (now: number, max: number) => number;
    constructor(father: Footer, now: number, max: number, check: (now: number, max: number) => number) {
        this.dom = document.createElement('span');
        father.dom.appendChild(this.dom);
        this.now = now;
        this.max = max;
        this.check = check;

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
        this.dom.style.color = check == 1 ? OkColor : check == 0 ? MidColor : FailColor;
        this.dom.innerText = `[${this.now}/${this.max}]`;
    }
}

const OkColor = "#0f0";
const MidColor = "#000";
const FailColor = "#f00";

class Footer {
    dom: HTMLDivElement;
    tasks: Task[];
    constructor() {
        this.dom = document.createElement('div');
        this.dom.id = 'footer';
        this.dom.style.position = 'fixed';
        this.dom.style.zIndex = '101';
        this.dom.style.fontSize = '30px';
        this.dom.style.bottom = '20px';
        this.dom.style.left = '20px';
        this.dom.style.fontFamily = 'Consolas, monospace';

        document.body.appendChild(this.dom);

        this.tasks = [];
    }
    addTask(now: number, max: number, check: (now: number, max: number) => number) {
        this.tasks.push(new Task(this, now, max, check));
    }
    // drop() {
    //     this.tasks = [];
    //     this.dom.remove();
    // }
};

export { Footer };