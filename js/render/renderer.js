var Renderer = {
    needRender: false,
    _getRenderer() {
        let renderer = new THREE.WebGLRenderer({ canvas: canvas(), antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width(), height());
        renderer.setClearColor(0xADF8FF, 1);

        return renderer;
    },
    _getCamera() {
        let camera = new THREE.PerspectiveCamera(75, width() / height(), 0.1, 1000);
        camera.position.set(0, -200, 500);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 0, 0);

        // print(camera);
        return camera;
    },
    _getScene() {
        let scene = new THREE.Scene();

        // 点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(0, 500, 500); // 点光源位置
        scene.add(point); // 点光源添加到场景中

        // 环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);

        return scene;
    },
    add(mesh) {
        this.scene.add(mesh);
    },
    get() {
        return this.renderer;
    },
    fitWindow() {
        this.renderer.setSize(width(), height());

        this.camera.aspect = width() / height();
        this.camera.updateProjectionMatrix();

        this.needRender = true;
    },
    render() {
        if (this.needRender) {
            this.renderer.render(this.scene, this.camera);
            this.needRender = false;
        }
    },
    init() {
        this.renderer = this._getRenderer();
        this.camera = this._getCamera();
        this.scene = this._getScene();
    }
};

Renderer.init();