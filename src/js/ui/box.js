import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from '/js/ui/util.js';
import { Material } from '/js/ui/material.js';
import { Renderer } from '/js/ui/renderer.js';
import { TextMaterial } from './textMaterial';

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
        Renderer.add(this);
        this.frontMaterial = new TextMaterial();
        this.backMaterial = new TextMaterial();
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
}

export { Box };