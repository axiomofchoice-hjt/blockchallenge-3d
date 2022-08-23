import * as THREE from 'three';

import { Box } from './ui/box.js';
import { Renderer } from './ui/renderer.js';
import { Material } from './ui/material.js';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './ui/util.js';
import { Animation } from './ui/animation.js';
import { Header } from './ui/header';
import { Footer } from './ui/footer.js';
import { Grid } from './ui/Grid.js';

var grid = new Grid(4, 5);
grid.setCamera();

Header.init();
Header.setText("23333");
Footer.init();
Footer.setTask(0, 2, 3, '#000');

// 创建网格模型
var boxes = [];
const n = 4, m = 5, zm = 120;
for (let [i, j] of rangeMatrix(n, m)) {
    // print(i, j);
    let box = grid.getBox(grid.getId(i, j), 10);
    box.text = i * m + j;
}

// 执行渲染操作

Renderer.fitWindow();
window.addEventListener('resize', () => {
    Renderer.fitWindow();
    grid.setCamera();
}, false);

let clock = new THREE.Clock();
let mainLoop = () => {
    requestAnimationFrame(mainLoop);
    let delta = clock.getDelta();
    for (let i of Renderer.scene.children) {
        if (i.update !== undefined) {
            i.update(delta);
        }
    }
    Renderer.render();
};
mainLoop();

function clickEvent(event) {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / width()) * 2 - 1;
    mouse.y = -(event.clientY / height()) * 2 + 1;
    raycaster.setFromCamera(mouse, Renderer.camera);
    var intersects = raycaster.intersectObjects(Renderer.scene.children);
    if (intersects.length) {
        var box = intersects[0].object;
        box.click();
    }
}

canvas().addEventListener('click', clickEvent, false);
