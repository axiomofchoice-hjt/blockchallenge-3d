import * as THREE from 'three';

import { width, height, canvas, print, sgn, range, rangeMatrix } from './ui/util';

import { Box } from './ui/Box';
import { Renderer } from './ui/Renderer';
import { Scene } from './ui/Scene';
import { Animation } from './ui/Animation';

import { Header } from './ui/Header';
import { Footer } from './ui/Footer';
import { Grid } from './ui/Grid';

var renderer = new Renderer();
var scene = new Scene();
Animation.scene = scene;

var grid = new Grid(4, 5, scene);

var header = new Header();
header.setText("23333");
var footer = new Footer();
footer.setTask(0, 2, 3, '#000');

// 创建网格模型
const n = 4, m = 5;
for (let id of range(n * m)) {
    let box = grid.getMarchingBox(id, 10, -2000, -100);
    box.text = id;
}

// 执行渲染操作

window.addEventListener('resize', () => {
    scene.fitWindow();
    renderer.fitWindow();
    grid.fitWindow();
}, false);

let clock = new THREE.Clock();
let mainLoop = () => {
    requestAnimationFrame(mainLoop);
    let delta = clock.getDelta();
    for (let i of scene.scene.children) {
        if (i instanceof Box) {
            i.update(delta);
        }
    }
    renderer.render(scene);
};
mainLoop();

function clickEvent(event: MouseEvent) {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / width()) * 2 - 1;
    mouse.y = -(event.clientY / height()) * 2 + 1;
    raycaster.setFromCamera(mouse, scene.camera);
    var intersects = raycaster.intersectObjects(scene.scene.children);
    if (intersects.length) {
        var box = intersects[0].object;
        if (box instanceof Box) {
            box.click();
        }
    }
}

canvas().addEventListener('click', clickEvent, false);
