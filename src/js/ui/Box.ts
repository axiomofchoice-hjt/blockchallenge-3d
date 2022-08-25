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

class BoxAnimation {
    private box: Box;
    private position: Animation;
    private bgColor: Animation;
    private scale: Animation;
    private integer: Animation;
    private opacity: Animation;
    private color: Animation;
    constructor(box: Box) {
        this.box = box;
        this.position = new Animation(this.box.position, ['x', 'y', 'z']);
        this.bgColor = new Animation(this.box._bgColor, ['r', 'g', 'b']);
        this.scale = new Animation(this.box.scale, ['x', 'y', 'z']);
        this.integer = new Animation(this.box, 'text');
        this.opacity = new Animation(this.box, 'opacity');
        this.color = new Animation(this.box._color, ['r', 'g', 'b']);
    }
    positionTo(to: THREE.Vector3 | [number, number, number], args: AnimationArgs) {
        if (to instanceof THREE.Vector3) {
            this.position.load([to.x, to.y, to.z], args);
        } else {
            this.position.load(to, args);
        }
    }
    bgColorTo(to: THREE.ColorRepresentation, args: AnimationArgs) {
        to = new THREE.Color(to);
        this.bgColor.load([to.r, to.g, to.b], args);
    }
    scaleTo(to: THREE.Vector3 | [number, number, number], args: AnimationArgs) {
        if (to instanceof THREE.Vector3) {
            this.scale.load([to.x, to.y, to.z], args);
        } else {
            this.scale.load(to, args);
        }
    }
    heightTo(to: number, args: AnimationArgs) {
        this.positionTo(new THREE.Vector3(this.box.position.x, this.box.position.y, to / 2), args);
        this.scaleTo(new THREE.Vector3(this.box.scale.x, this.box.scale.y, to / this.box.SIZE.z), args);
    }
    integerTo(to: number, args: AnimationArgs) {
        this.integer.load(to, args);
    }
    opacityTo(to: number, args: AnimationArgs) {
        this.opacity.load(to, args);
    }
    colorTo(to: THREE.ColorRepresentation, args: AnimationArgs) {
        to = new THREE.Color(to);
        this.color.load([to.r, to.g, to.b], args);
    }
}

class Box extends THREE.Mesh {
    public SIZE: THREE.Vector3;
    private _text: string | number;
    public _bgColor: Color;
    public _color: Color;
    private _frontChanged: boolean;
    private scene: Scene;
    public animes: BoxAnimation;
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
        this.animes = new BoxAnimation(this);
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
    get opacity() {
        return (<THREE.MeshLambertMaterial[]>this.material)[0].opacity;
    }
    set opacity(opacity) {
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
        material.opacity = this.opacity;
        (<THREE.MeshLambertMaterial[]>this.material)[4] = material;
    }
    update(delta: number) {
        if (this._frontChanged) {
            // print('frontChange');
            this._updateFrontMaterial();
            this._frontChanged = false;
        }
    }
    click() {
        // this.bgColorAnimate('#0ff', { duration: 1 });
        // this.integerAnimate(100, { duration: 1 });
        this.animes.heightTo(30, { duration: 1 });
    }
}

export { Box };