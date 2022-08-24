import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './util';
import { Scene } from './Scene';

class Renderer {
    public renderer: THREE.WebGLRenderer;
    constructor() {
        this.renderer = this._getRenderer();
        this.fitWindow();
    }
    _getRenderer(): THREE.WebGLRenderer {
        let renderer = new THREE.WebGLRenderer({ canvas: canvas(), antialias: true });
        renderer.setClearColor(0xADF8FF, 1);

        return renderer;
    }
    fitWindow() {
        this.renderer.setSize(width(), height());
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    render(scene: Scene) {
        if (scene.changed) {
            // print('render');
            this.renderer.render(scene.scene, scene.camera);
            scene.changed = false;
        }
    }
}

export { Renderer };