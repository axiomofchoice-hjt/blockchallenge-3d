import * as THREE from 'three';

import { Box } from './ui/box.js';
import { Renderer } from './ui/renderer.js';
import { Material } from './ui/material.js';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './ui/util.js';
import gsap from 'gsap';
import { Animation } from './ui/animation.js';

// 创建网格模型
var boxes = [];
const n = 4, m = 5, zm = 120;
for (let [i, j] of rangeMatrix(n, m)) {
    // print(i, j);
    let box = new Box(100, 100, 10);
    box.position.set((j - m / 2 + 0.5) * zm, -(i - n / 2 + 0.5) * zm, 0);
    box.setFrontMaterial(Material.text(i * m + j, '#000000', '#ffffff'));
    box.flipped = 0;
    box.flipAnimation = new Animation(box.rotation, 'y', Math.PI / 0.2);
    // box.flipAnimation = new Animation(box, 'materialOpacity', 1 / 0.2);
}

// box1.position.set(-100, 0, 0);
// box1.setFrontMaterial(Material.text('233', '#000000', '#ffffff'));
// print(box1);
// var box2 = new Box(100, 100, 40);
// box2.position.set(100, 0, 0);

// 执行渲染操作

Renderer.fitWindow();
window.onresize = () => {
    Renderer.fitWindow();
};

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
        // box.flipAnimation.load(box.flipped);
        box.flipped ^= 1;
        box.flipAnimation.load(box.flipped * Math.PI);
    }
}

canvas().addEventListener('click', clickEvent, false);
