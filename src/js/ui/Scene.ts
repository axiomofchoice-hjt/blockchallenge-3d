import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './util';

class Scene {
    static ANGLE_OF_VIEW: number = 75;
    static ANGLE_OF_HEIGHT: number = Math.PI / 2;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public changed: boolean;
    constructor() {
        this.scene = this._getScene();
        this.camera = this._getCamera();
        this.fitWindow();
        this.changed = true;
    }
    add(mesh: THREE.Mesh) {
        this.scene.add(mesh);
    }
    _getScene(): THREE.Scene {
        let scene = new THREE.Scene();

        // 点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(0, 1500, 500); // 点光源位置
        scene.add(point); // 点光源添加到场景中

        // 环境光
        var ambient = new THREE.AmbientLight(0x909090);
        scene.add(ambient);

        return scene;
    }
    _getCamera(): THREE.PerspectiveCamera {
        let camera = new THREE.PerspectiveCamera(Scene.ANGLE_OF_VIEW, width() / height(), 0.1, 10000);
        camera.position.set(0, -200, 500);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 0, 0);

        // print(camera);
        return camera;
    }
    fitWindow() {
        this.camera.aspect = width() / height();
        this.camera.updateProjectionMatrix();
        this.changed = true;
    }
}

export { Scene };