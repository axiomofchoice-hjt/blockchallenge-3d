import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './util';
import { Material } from './Material';
import { Renderer } from './Renderer';
import { Animation } from './Animation';
import { Scene } from './Scene';

class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _onUpdate: () => void;
    constructor(color: THREE.Color | string, onUpdate: () => void) {
        color = new THREE.Color(color);
        this._onUpdate = onUpdate;
        this._r = color.r;
        this._g = color.g;
        this._b = color.b;
    }
    get r(): number { return this._r; }
    get g(): number { return this._g; }
    get b(): number { return this._b; }
    set r(r: number) { this._r = r; this._onUpdate(); }
    set g(g: number) { this._g = g; this._onUpdate(); }
    set b(b: number) { this._b = b; this._onUpdate(); }
    get(): THREE.Color {
        return new THREE.Color(this._r, this._g, this._b);
    }
}

class Box extends THREE.Mesh {
    public SIZE: THREE.Vector3;
    private _text: string | number;
    private _bgColor: Color;
    private _color: Color;
    private _frontChanged: boolean;
    private scene: Scene;
    constructor(x: number, y: number, z: number, scene: Scene) {
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
        this._frontChanged = true;
        this.SIZE = new THREE.Vector3(x, y, z);
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
        this.scene = scene;
        this.scene.add(this);
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
        this.scene.changed = true;
        for (let i of <THREE.Material[]>this.material) {
            i.opacity = opacity;
        }
    }
    _updateFrontMaterial() {
        this.scene.changed = true;
        let material = Material.text(
            this._text,
            this._color.get(),
            this._bgColor.get()
        );
        material.opacity = this.materialOpacity;
        this.material[4] = material;
    }
    update(delta: number) {
        if (this._frontChanged) {
            this._updateFrontMaterial();
            this._frontChanged = false;
        }
    }
    positionAnimate(to: [number | null, number | null, number | null], args: object) {
        if (this['_positionAnimation'] === undefined) {
            this['_positionAnimation'] = new Animation(this.position, ['x', 'y', 'z']);
        }
        this['_positionAnimation'].load(to, args);
    }
    bgColorAnimate(to: THREE.Color | string, args: object) {
        if (this['_bgColorAnimation'] === undefined) {
            this['_bgColorAnimation'] = new Animation(this._bgColor, ['r', 'g', 'b']);
        }
        to = new THREE.Color(to);
        this['_bgColorAnimation'].load([to.r, to.g, to.b], args);
    }
    scaleAnimate(to: [number | null, number | null, number | null], args: object) {
        if (this['_scaleAnimation'] === undefined) {
            this['_scaleAnimation'] = new Animation(this.scale, ['x', 'y', 'z']);
        }
        this['_scaleAnimation'].load(to, args);
    }
    heightAnimation(to: number, args) {
        this.positionAnimate([null, null, to / 2], args);
        this.scaleAnimate([null, null, to / this.SIZE.z], args);
    }
    integerAnimate(to: number, args: object) {
        if (this['_integerAnimation'] === undefined) {
            this['_integerAnimation'] = new Animation(this, 'text');
        }
        this['_integerAnimation'].load(to, args);
    }
    click() {
        this.bgColorAnimate('#0ff', { duration: 1 });
        this.positionAnimate([0, 0, null], { duration: 1, ease: 'power1.out' });
        // this.integerAnimate(100, { duration: 1 });
        // this.scaleAnimate([null, null, 3], { duration: 1, ease: 'power1.out' });
        // this.heightAnimation(30, { duration: 1 });
    }
}

export { Box };