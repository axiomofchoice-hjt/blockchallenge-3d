// 创建网格模型
var box1 = new Box(100, 100, 40);
box1.position.set(-100, 0, 0);
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
    // print(event.clientX, event.clientY);
    box1.flip(0.5);
}

canvas().addEventListener('click', clickEvent, false);
