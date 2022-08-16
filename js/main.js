const canvas = document.getElementById('canvas');

let width = () => Math.ceil(window.innerWidth + 0.5);
let height = () => Math.ceil(window.innerHeight + 0.5);

console.log(width(), height());

var scene = new THREE.Scene();

// 创建网格模型
var geometry = new THREE.BoxGeometry(100, 100, 100); // 几何对象
var material = new THREE.MeshLambertMaterial({
    color: 0xdddddd
}); // 材质对象
var mesh = new THREE.Mesh(geometry, material); // 网格模型
scene.add(mesh); // 网格模型添加到场景中

// 点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); // 点光源位置
scene.add(point); // 点光源添加到场景中

// 环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

// 相机设置
var camera = new THREE.PerspectiveCamera(75, width() / height(), 0.1, 1000); // 透视摄像头
camera.position.set(200, 300, 200); // 设置相机位置
camera.lookAt(scene.position); // 设置相机方向

// 创建渲染器对象
var renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // 打开抗锯齿
renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比率
renderer.setSize(width(), height()); // 设置渲染区域
renderer.setClearColor(0x000000, 1); // 设置背景颜色

// 执行渲染操作
renderer.render(scene, camera);

window.onresize = () => {
    renderer.setSize(width(), height());
    camera.aspect = width() / height();
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};