class Box extends THREE.Mesh {
    constructor(x, y, z) {
        super(
            new THREE.BoxGeometry(x, y, z),
            [
                Material.solid(),
                Material.solid(),
                Material.solid(),
                Material.solid(),
                Material.solid(),
                Material.solid(),
            ]
        );
        Renderer.add(this);
        this.rotateAnimation = new Animation(
            () => this.rotation.y,
            (x) => { this.rotation.y = x; }
        );
        this.opacityAnimation = new Animation(
            () => this.getOpacity(),
            (x) => { this.setOpacity(x); }
        );
    }
    getOpacity() {
        return this.material[0].opacity;
    }
    setOpacity(opacity) {
        Renderer.needRender = true;
        for (let i of this.material) {
            i.opacity = opacity;
        }
    }
    setFrontMaterial(material) {
        Renderer.needRender = true;
        material.opacity = this.getOpacity();
        this.material[4] = material;
    }
    setBackMaterial(material) {
        Renderer.needRender = true;
        material.opacity = this.getOpacity();
        this.material[5] = material;
    }
    update(delta) {
        this.rotateAnimation.update(delta);
        this.opacityAnimation.update(delta);
    }
}