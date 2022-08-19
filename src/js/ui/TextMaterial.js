import * as THREE from 'three';
import { Material } from './material';
import { Animation } from './animation';
import { print } from './util';

class Color extends THREE.Color {
    constructor(color, speed) {
        super(color);
        this.copy(color);
        this.animation = new Animation(this, ['r', 'g', 'b'], speed);
    }
    animate(color, onUpdate) {
        color = new THREE.Color(color);
        print(color);
        this.animation.load([color.r, color.g, color.b], onUpdate);
    }
}

class TextMaterial {
    constructor(text = '', color = '#000000', bgColor = '#ffffff') {
        this.changed = true;
        this.text = text;
        this.color = new Color(new THREE.Color(color), 1);
        this.bgColor = new Color(new THREE.Color(bgColor), 1);
    }
    get text() {
        return this._text;
    }
    set text(text) {
        if (typeof text === 'number') {
            this._text = Math.round(text);
        } else {
            this._text = text;
        }
        this.changed = true;
    }
    colorAnimate(color) {
        this.color.animate(color, () => { this.changed = true; });
    }
    bgColorAnimate(bgColor) {
        this.bgColor.animate(bgColor, () => { this.changed = true; });
    }
    get() {
        return Material.text(
            this._text,
            new THREE.Color(this.color.r, this.color.g, this.color.b),
            new THREE.Color(this.bgColor.r, this.bgColor.g, this.bgColor.b)
        );
    }
}

export { TextMaterial };