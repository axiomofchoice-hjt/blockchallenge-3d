import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './util';
import { Material, TextArgs } from './Material';
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

class Content implements TextArgs {
    private _text: string | number;
    private _color: THREE.Color;
    private _opacity: number;
    private _onUpdate: () => void;
    constructor(onUpdate: () => void) {
        this._text = '';
        this._color = new THREE.Color(0, 0, 0);
        this._onUpdate = onUpdate;
        this._opacity = 1;
    }
    get text() { return this._text; }
    get color() { return this._color; }
    get opacity() { return this._opacity; }
    set text(text) {
        if (typeof text === 'number') {
            this._text = Math.round(text);
        } else {
            this._text = text;
        }
        this._onUpdate();
    }
    set color(color) { this._color = color; this._onUpdate(); }
    set opacity(opacity) { this._opacity = opacity; this._onUpdate(); }
}

class BoxAnimation {
    private box: Box;
    private position: Animation;
    private bgColor: Animation;
    private scale: Animation;
    private integer: Animation;
    private opacity: Animation;
    private contents: [Animation, Animation];
    constructor(box: Box) {
        this.box = box;
        this.position = new Animation(this.box.position, ['x', 'y', 'z']);
        this.bgColor = new Animation(this.box._bgColor, ['r', 'g', 'b']);
        this.scale = new Animation(this.box.scale, ['x', 'y', 'z']);
        this.integer = new Animation(this.box.contents[0], 'text');
        this.opacity = new Animation(this.box, 'opacity');
        this.contents = [new Animation(this.box.contents[0], 'opacity'), new Animation(this.box.contents[1], 'opacity')];
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
    contentTo(text: string | number, color: THREE.ColorRepresentation, args: AnimationArgs) {
        [this.box.contents[0], this.box.contents[1]] = [this.box.contents[1], this.box.contents[0]];
        [this.contents[0], this.contents[1]] = [this.contents[1], this.contents[0]];

        this.box.contents[0].text = text;
        this.box.contents[0].color = new THREE.Color(color);

        this.contents[0].load(1, args);
        this.contents[1].load(0, args);
    }
}

class Box extends THREE.Mesh {
    public SIZE: THREE.Vector3;
    public contents: Content[];
    public _bgColor: Color;
    private _frontChanged: boolean;
    private scene: Scene;
    public animes: BoxAnimation;
    public index: number;
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
        this.contents = [new Content(() => { this._frontChanged = true; }), new Content(() => { this._frontChanged = true; })];
        this.contents[1].opacity = 0;
        this._bgColor = new Color('#ffffff', () => {
            this._frontChanged = true;
            for (let material of <THREE.MeshLambertMaterial[]>this.material) {
                material.color = this._bgColor.get();
            }
        });
        this.scene = scene;
        this.animes = new BoxAnimation(this);
        this.scene.add(this);
        this.index = 0;
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
            this.contents,
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
    // click() {
    //     this.animes.bgColorTo('#0ff', { duration: 1 });
    //     // this.animes.integerTo(100, { duration: 1 });
    //     // this.animes.heightTo(30, { duration: 1 });
    //     this.animes.contentTo(Math.floor(Math.random() * 10), '#000', { duration: 1 });
    // }
}

export { Box };