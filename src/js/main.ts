import * as THREE from 'three';

import { width, height, canvas, print, DIRECTION } from './ui/util';

import { Box } from './ui/Box';
import { Controller } from './stages/Controller';

var controller = new Controller();

window.addEventListener('resize', () => {
    controller.stage.fitWindow();
}, false);

let clock = new THREE.Clock();
let mainLoop = () => {
    requestAnimationFrame(mainLoop);
    let delta = clock.getDelta();
    controller.stage.mainLoopUpdate(delta);
};
mainLoop();

// 鼠标点击事件
function clickEvent(event: MouseEvent) {
    // 处理射线是否接触物体
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / width()) * 2 - 1;
    mouse.y = -(event.clientY / height()) * 2 + 1;
    raycaster.setFromCamera(mouse, controller.stage.scene.camera);
    var intersects = raycaster.intersectObjects(controller.stage.scene.scene.children);
    if (intersects.length) {
        var box = intersects[0].object;
        if (box instanceof Box) {
            if (controller.stage.input.click !== undefined) {
                controller.stage.input.click(box.index);
            }
        }
    }
}

// 键盘事件
function keyEvent(event: KeyboardEvent) {
    // 处理方向键
    for (let i = 0; i < 4; i++) {
        if (DIRECTION[i].keyCodes.indexOf(event.code) !== -1) {
            if (controller.stage.input.direction !== undefined) {
                controller.stage.input.direction(i);
            }
        }
    }

    // 一般按键
    if (controller.stage.input.key !== undefined) {
        controller.stage.input.key(event.code);
    }
}

canvas().addEventListener('click', clickEvent, false);

document.addEventListener('keydown', keyEvent, false);
