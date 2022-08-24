class Footer {
    dom: HTMLElement
    tasks: { dom: HTMLElement, text: string, color: string }[]
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
    setTask(pos: number, now: number, max: number, color: string) {
        if (pos == this.tasks.length) {
            let dom = document.createElement('span');

            this.tasks.push({
                dom: dom,
                text: '',
                color: ''
            });
            this.dom.appendChild(dom);
        }
        this.tasks[pos].text = `[${now}/${max}]`;
        this.tasks[pos].color = color;
        this._update();
    }
    _update() {
        for (let task of this.tasks) {
            task.dom.style.color = task.color;
            task.dom.innerText = task.text;
        }
    }
    drop() {
        this.tasks = [];
        this.dom.remove();
    }
};

export { Footer };