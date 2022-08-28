import * as THREE from 'three';

import { width, height, canvas, print, DIRECTION } from './ui/util';

import { Box } from './ui/Box';
import { Grid } from './ui/Grid';
import { StageInterface } from './stages/StageInterface';
import { Stage } from './stages/stage0';

var grid: StageInterface = new Stage();

window.addEventListener('resize', () => {
    grid.fitWindow();
}, false);

let clock = new THREE.Clock();
let mainLoop = () => {
    requestAnimationFrame(mainLoop);
    let delta = clock.getDelta();
    grid.mainLoopUpdate(delta);
};
mainLoop();

// 鼠标点击事件
function clickEvent(event: MouseEvent) {
    // 处理射线是否接触物体
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / width()) * 2 - 1;
    mouse.y = -(event.clientY / height()) * 2 + 1;
    raycaster.setFromCamera(mouse, grid.scene.camera);
    var intersects = raycaster.intersectObjects(grid.scene.scene.children);
    if (intersects.length) {
        var box = intersects[0].object;
        if (box instanceof Box) {
            if (grid.input.click !== undefined) {
                grid.input.click(box.index);
            }
        }
    }
}

// 键盘事件
function keyEvent(event: KeyboardEvent) {
    // 处理方向键
    for (let i = 0; i < 4; i++) {
        if (DIRECTION[i].keyCodes.indexOf(event.code) !== -1) {
            if (grid.input.direction !== undefined) {
                grid.input.direction(i);
            }
        }
    }

    // 一般按键
    if (grid.input.key !== undefined) {
        grid.input.key(event.code);
    }
}

canvas().addEventListener('click', clickEvent, false);

document.addEventListener('keydown', keyEvent, false);
