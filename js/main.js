// 创建网格模型
var box1 = new Box(100, 100, 40);
box1.position.set(-100, 0, 0);
box1.setFrontMaterial(Material.text('233', '#000000', '#ffffff'));
print(box1);
var box2 = new Box(100, 100, 40);
box2.position.set(100, 0, 0);

// 执行渲染操作

Renderer.fitWindow();
window.onresize = () => {
    Renderer.fitWindow();
};

let clock = new THREE.Clock();
let mainLoop = () => {
    requestAnimationFrame(mainLoop);
    let delta = clock.getDelta();
    box1.update(delta);
    box2.update(delta);
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
        // box.flip(0.2);
        box.opacityFlip(0.2);
    }
}

canvas().addEventListener('click', clickEvent, false);
