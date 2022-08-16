var renderer = new Renderer();

// 创建网格模型
var box = new Box(100, 100, 100);

renderer.add(box.get()); // 网格模型添加到场景中

// 执行渲染操作
renderer.render();

window.onresize = () => {
    renderer.update();
    renderer.render();
};

function click(event) {
    console.log(event.clientX, event.clientY);
}

canvas().addEventListener('click', click, false);
