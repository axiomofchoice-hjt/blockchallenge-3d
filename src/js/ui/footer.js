var Footer = {
    init() {
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
        return Footer;
    },
    setTask(pos, now, max, color) {
        if (pos == this.tasks.length) {
            let dom = document.createElement('span');

            this.tasks.push({
                dom: dom
            });
            this.dom.appendChild(dom);
        }
        this.tasks[pos].text = `[${now}/${max}]`;
        this.tasks[pos].color = color;
        this._update();
    },
    _update() {
        for (let task of this.tasks) {
            task.dom.style.color = task.color;
            task.dom.innerText = task.text;
            // this.dom.appendChild(task.dom);
        }
    },
    drop() {
        this.tasks = null;
        this.dom.remove();
    }
};

export { Footer };