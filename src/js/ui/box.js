import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './util.js';
import { Material } from './material.js';
import { Renderer } from './renderer.js';
import { Animation } from './animation';

class Color {
    constructor(color, onUpdate) {
        color = new THREE.Color(color);
        this._onUpdate = onUpdate;
        this._r = color.r;
        this._g = color.g;
        this._b = color.b;
    }
    get r() { return this._r; }
    get g() { return this._g; }
    get b() { return this._b; }
    set r(r) { this._r = r; this._onUpdate(); }
    set g(g) { this._g = g; this._onUpdate(); }
    set b(b) { this._b = b; this._onUpdate(); }
    get() {
        return new THREE.Color(this._r, this._g, this._b);
    }
}

class Box extends THREE.Mesh {
    constructor(x, y, z) {
        super(
            new THREE.BoxGeometry(x, y, z),
            [
                Material.solid(),
                Material.solid(),
                Material.solid(),
                Material.solid(),
                Material.solid(),
                Material.solid(),
            ]
        );
        this._text = '';
        this._bgColor = new Color('#ffffff', () => {
            this._frontChanged = true;
            for (let i = 0; i < 6; i++) {
                this.material[i].color = this._bgColor.get();
            }
        });
        this._color = new Color('#000000', () => {
            this._frontChanged = true;
        });
        this._frontChanged = true;
        Renderer.add(this);
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
        this._frontChanged = true;
    }
    get materialOpacity() {
        return this.material[0].opacity;
    }
    set materialOpacity(opacity) {
        Renderer.needRender = true;
        for (let i of this.material) {
            i.opacity = opacity;
        }
    }
    _updateFrontMaterial() {
        Renderer.needRender = true;
        let material = Material.text(
            this._text,
            this._color.get(),
            this._bgColor.get()
        );
        material.opacity = this.materialOpacity;
        this.material[4] = material;
    }
    update(delta) {
        if (this._frontChanged) {
            this._updateFrontMaterial();
            this._frontChanged = false;
        }
    }
    positionAnimate(to, args) {
        if (this._positionAnimation === undefined) {
            this._positionAnimation = new Animation(this.position, ['x', 'y', 'z']);
        }
        this._positionAnimation.load(to, args);
    }
    bgColorAnimate(to, args) {
        if (this._frontBgColorAnimation === undefined) {
            this._frontBgColorAnimation = new Animation(this._bgColor, ['r', 'g', 'b']);
        }
        to = new THREE.Color(to);
        this._frontBgColorAnimation.load([to.r, to.g, to.b], args);
    }
    click() {
        // this.bgColorAnimate('#0ff', { duration: 1 });
        this.positionAnimate([null, null, 50], { duration: 1, ease: 'power1.out'});
    }
}

export { Box };