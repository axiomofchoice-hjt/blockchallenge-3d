import { StageInterface } from "../stageBase/StageInterface";
import { print } from "./util";

export class ButtonList {
    dom: HTMLDivElement;
    backSpan: HTMLSpanElement;
    restartSpan: HTMLSpanElement;
    father: StageInterface;
    constructor(father: StageInterface) {
        this.father = father;
        this.dom = document.createElement('div');
        this.dom.id = 'buttonList';
        this.dom.style.position = 'fixed';
        this.dom.style.zIndex = '101';
        this.dom.style.top = '20px';
        this.dom.style.right = '20px';
        {
            this.backSpan = document.createElement('span');
            this.backSpan.innerHTML = '<svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M44 40.8361C39.1069 34.8632 34.7617 31.4739 30.9644 30.6682C27.1671 29.8625 23.5517 29.7408 20.1182 30.303V41L4 23.5453L20.1182 7V17.167C26.4667 17.2172 31.8638 19.4948 36.3095 24C40.7553 28.5052 43.3187 34.1172 44 40.8361Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/></svg>';
            this.backSpan.style.marginRight = '10px';
            if (this.father.father.stageId === -1) {
                this.backSpan.style.display = 'none';
            }
            this.dom.appendChild(this.backSpan);
        }
        {
            this.restartSpan = document.createElement('span');
            this.restartSpan.innerHTML = '<svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 8V17H33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            this.dom.appendChild(this.restartSpan);
        }

        this.backSpan.addEventListener('click', () => { this.father.father.backEvent(); }, false);

        this.restartSpan.addEventListener('click', () => { this.father.father.restartEvent(); }, false);

        document.body.appendChild(this.dom);
    }
    drop() {
        this.dom.remove();
    }
}