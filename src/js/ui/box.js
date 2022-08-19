import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from '/js/ui/util.js';
import { Material } from '/js/ui/material.js';
import { Renderer } from '/js/ui/renderer.js';

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
        this.flipAnimation = null;
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
    setFrontMaterial(material) {
        Renderer.needRender = true;
        material.opacity = this.materialOpacity;
        this.material[4] = material;
    }
    setBackMaterial(material) {
        Renderer.needRender = true;
        material.opacity = this.materialOpacity;
        this.material[5] = material;
    }
    update(delta) {
    }
}

export { Box };