import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './util';
import { Scene } from './Scene';

export class Renderer {
    public renderer: THREE.WebGLRenderer;
    constructor() {
        this.renderer = Renderer._getRenderer();
        this.fitWindow();
    }
    static _getRenderer(): THREE.WebGLRenderer {
        let renderer = new THREE.WebGLRenderer({ canvas: canvas(), antialias: true });
        renderer.setClearColor("#B0FFFF", 1);

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
    drop() {
        this.renderer.dispose();
        // this.renderer.forceContextLoss();
    }
}