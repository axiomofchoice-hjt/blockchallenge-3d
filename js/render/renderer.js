class Renderer {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas(), antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width(), height());
        this.renderer.setClearColor(0xADF8FF, 1);
        this.camera = this._getCamera();
        this.scene = this._getScene();
    }
    _getCamera() {
        let camera = new THREE.PerspectiveCamera(75, width() / height(), 0.1, 1000);
        camera.position.set(200, 300, 200);
        camera.lookAt(0, 0, 0);

        return camera;
    }
    _getScene() {
        let scene = new THREE.Scene();

        // 点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); // 点光源位置
        scene.add(point); // 点光源添加到场景中

        // 环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);

        return scene;
    }
    add(mesh) {
        this.scene.add(mesh);
    }
    get() {
        return this.renderer;
    }
    update() {
        this.renderer.setSize(width(), height());

        this.camera.aspect = width() / height();
        this.camera.updateProjectionMatrix();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}