import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './util';
import { Material } from './Material';
import { Animation, AnimationArgs } from './Animation';
import { Scene } from './Scene';

class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _onUpdate: () => void;
    constructor(color: THREE.ColorRepresentation, onUpdate: () => void) {
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
    private animes: any;
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
            for (let material of <THREE.MeshLambertMaterial[]>this.material) {
                material.color = this._bgColor.get();
            }
        });
        this._color = new Color('#000000', () => {
            this._frontChanged = true;
        });
        this.scene = scene;
        this.animes = {};
        this.animes.position = new Animation(this.position, ['x', 'y', 'z']);
        this.animes.bgColor = new Animation(this._bgColor, ['r', 'g', 'b']);
        this.animes.scale = new Animation(this.scale, ['x', 'y', 'z']);
        this.animes.integer = new Animation(this, 'text');
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
        return (<THREE.MeshLambertMaterial[]>this.material)[0].opacity;
    }
    set materialOpacity(opacity) {
        this.scene.changed = true;
        for (let i of <THREE.MeshLambertMaterial[]>this.material) {
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
        (<THREE.MeshLambertMaterial[]>this.material)[4] = material;
    }
    update(delta: number) {
        if (this._frontChanged) {
            // print('frontChange');
            this._updateFrontMaterial();
            this._frontChanged = false;
        }
    }
    positionAnimate(to: THREE.Vector3, args: AnimationArgs) {
        this.animes.position.load([to.x, to.y, to.z], args);
    }
    bgColorAnimate(to: THREE.ColorRepresentation, args: AnimationArgs) {
        to = new THREE.Color(to);
        this.animes.bgColor.load([to.r, to.g, to.b], args);
    }
    scaleAnimate(to: THREE.Vector3, args: AnimationArgs) {
        this.animes.scale.load([to.x, to.y, to.z], args);
    }
    heightAnimation(to: number, args: AnimationArgs) {
        this.positionAnimate(new THREE.Vector3(this.position.x, this.position.y, to / 2), args);
        this.scaleAnimate(new THREE.Vector3(this.scale.x, this.scale.y, to / this.SIZE.z), args);
    }
    integerAnimate(to: number, args: AnimationArgs) {
        this.animes.integer.load(to, args);
    }
    click() {
        // this.bgColorAnimate('#0ff', { duration: 1 });
        // this.integerAnimate(100, { duration: 1 });
        this.heightAnimation(30, { duration: 1 });
    }
}

export { Box };