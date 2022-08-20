var Header = {
    init() {
        this.dom = document.createElement('div');
        this.dom.id = 'header';
        this.dom.style.position = 'fixed';
        this.dom.style.zIndex = '101';
        this.dom.style.fontSize = '30px';
        this.dom.style.top = '20px';
        this.dom.style.left = '20px';
        document.body.appendChild(this.dom);
        return Header;
    },
    setText(text) {
        this.dom.innerText = text;
        return Header;
    },
    drop() {
        this.dom.remove();
    }
};

export { Header };