function toChinese(x: number): string {
    var mp = [
        "零", "一", "二", "三", "四",
        "五", "六", "七", "八", "九"
    ];
    if (x < 10) return mp[x];
    if (x == 10) return "十";
    if (x < 20) return "十" + mp[x % 10];
    if (x % 10 != 0) return mp[Math.floor(x / 10)] + "十" + mp[x % 10];
    if (x % 10 == 0) return mp[Math.floor(x / 10)] + "十";
    return "??";
}

export class Header {
    dom: HTMLDivElement;
    constructor() {
        this.dom = document.createElement('div');
        this.dom.id = 'header';
        this.dom.style.position = 'fixed';
        this.dom.style.zIndex = '101';
        this.dom.style.fontSize = '30px';
        this.dom.style.top = '20px';
        this.dom.style.left = '20px';
        this.dom.style.fontFamily = 'Arial';
        document.body.appendChild(this.dom);
    }
    setText(stageId: number, text: string) {
        if (stageId === -1) {
            this.dom.innerText = text;
        } else {
            this.dom.innerText = "第" + toChinese(stageId + 1) + "关 " + text;
        }
        return Header;
    }
    drop() {
        this.dom.remove();
    }
};