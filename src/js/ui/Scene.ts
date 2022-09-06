import * as THREE from 'three';
import { Animation } from './Animation';
import { width, height } from './util';

export const ANGLE_OF_VIEW = 75;
export const ANGLE_OF_HEIGHT = Math.PI / 2 * 4 / 5;

function _genScene(): THREE.Scene {
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

function _genCamera(): THREE.PerspectiveCamera {
    let camera = new THREE.PerspectiveCamera(ANGLE_OF_VIEW, width() / height(), 0.1, 10000);
    camera.position.set(0, -200, 500);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);

    return camera;
}

var _scene = _genScene();
var _camera = _genCamera();

export class Scene {
    changed: boolean;
    get scene(): THREE.Scene {
        return _scene;
    }
    get camera(): THREE.PerspectiveCamera {
        return _camera;
    }
    constructor() {
        this.fitWindow();
        this.changed = true;
        Animation.scene = this;
    }
    add(mesh: THREE.Mesh) {
        this.scene.add(mesh);
    }
    fitWindow() {
        this.camera.aspect = width() / height();
        this.camera.updateProjectionMatrix();
        this.changed = true;
    }
}