import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from '/js/ui/util.js';
import { Material } from '/js/ui/material.js';
import { Renderer } from '/js/ui/renderer.js';
import { TextMaterial } from './textMaterial';
import { Animation } from './animation';

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
        this.frontMaterial = new TextMaterial();
        this.backMaterial = new TextMaterial();
        Renderer.add(this);
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
    _setFrontMaterial(material) {
        Renderer.needRender = true;
        material.opacity = this.materialOpacity;
        this.material[4] = material;
    }
    _setBackMaterial(material) {
        Renderer.needRender = true;
        material.opacity = this.materialOpacity;
        this.material[5] = material;
    }
    update(delta) {
        if (this.frontMaterial.changed) {
            this._setFrontMaterial(this.frontMaterial.get());
            this.frontMaterial.changed = false;
        }
        if (this.backMaterial.changed) {
            this._setBackMaterial(this.backMaterial.get());
            this.backMaterial.changed = false;
        }
    }
    positionAnimate(to, args) {
        if (this._positionAnimation === undefined) {
            this._positionAnimation = new Animation(this.position, ['x', 'y', 'z']);
        }
        this._positionAnimation.load(to, args);
    }
    flipAnimate(to, args) {
        if (this._flipAnimation === undefined) {
            this._flipAnimation = new Animation(this.rotation, 'y');
        }
        this._flipAnimation.load(to, args);
    }
    frontBgColorAnimate(to, args) {
        if (this._frontBgColorAnimation === undefined) {
            this._frontBgColorAnimation = new Animation(this.frontMaterial.bgColor, ['r', 'g', 'b']);
        }
        to = new THREE.Color(to);
        this._frontBgColorAnimation.load([to.r, to.g, to.b], args);
    }
}

export { Box };