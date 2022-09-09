import * as THREE from 'three';
import { Material } from "./Material";
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

class CylinderAnimation {
    private cylinder: Cylinder;
    private position: [Animation, Animation, Animation];
    private bgColor: [Animation, Animation, Animation];
    private scale: [Animation, Animation, Animation];
    private opacity: Animation;
    constructor(cylinder: Cylinder) {
        this.cylinder = cylinder;
        this.position = [
            new Animation(this.cylinder.position, 'x'),
            new Animation(this.cylinder.position, 'y'),
            new Animation(this.cylinder.position, 'z')
        ];
        this.bgColor = [
            new Animation(this.cylinder._bgColor, 'r'),
            new Animation(this.cylinder._bgColor, 'g'),
            new Animation(this.cylinder._bgColor, 'b')
        ];
        this.scale = [
            new Animation(this.cylinder.scale, 'x'),
            new Animation(this.cylinder.scale, 'y'),
            new Animation(this.cylinder.scale, 'z')
        ];
        this.opacity = new Animation(this.cylinder, 'opacity');
    }
    positionTo(to: THREE.Vector3 | [number, number, number], args: AnimationArgs = {}) {
        if (to instanceof THREE.Vector3) {
            this.position[0].load(to.x, args);
            this.position[1].load(to.y, args);
            this.position[2].load(to.z, args);
        } else {
            this.position[0].load(to[0], args);
            this.position[1].load(to[1], args);
            this.position[2].load(to[2], args);
        }
    }
    bgColorTo(to: THREE.ColorRepresentation, args: AnimationArgs = {}) {
        to = new THREE.Color(to);
        this.bgColor[0].load(to.r, args);
        this.bgColor[1].load(to.g, args);
        this.bgColor[2].load(to.b, args);
    }
    scaleTo(to: THREE.Vector3 | [number, number, number], args: AnimationArgs = {}) {
        if (to instanceof THREE.Vector3) {
            this.scale[0].load(to.x, args);
            this.scale[1].load(to.y, args);
            this.scale[2].load(to.z, args);
        } else {
            this.scale[0].load(to[0], args);
            this.scale[1].load(to[1], args);
            this.scale[2].load(to[2], args);
        }
    }
    opacityTo(to: number, args: AnimationArgs = {}) {
        this.opacity.load(to, args);
    }
}

export class Cylinder extends THREE.Mesh {
    public _bgColor: Color;
    scene: Scene;
    animes: CylinderAnimation;
    constructor(geometry: THREE.CylinderGeometry, scene: Scene) {
        super(
            geometry,
            Material.solid()
        );
        this._bgColor = new Color('#ffffff', () => {
            (<THREE.MeshLambertMaterial>this.material).color = this._bgColor.get();
        });
        this.rotation.x = Math.PI / 2;
        this.scene = scene;
        this.animes = new CylinderAnimation(this);
        this.scene.add(this);
    }
    get opacity() {
        return (<THREE.MeshLambertMaterial>this.material).opacity;
    }
    set opacity(opacity) {
        this.scene.changed = true;
        (<THREE.MeshLambertMaterial>this.material).opacity = opacity;
    }
}