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
        this.flipped = 0;
        this.flipSpeed = 0;
        this.opacityFlipped = 1;
        this.opacitySpeed = 0;
    }
    setOpacity(opacity) {
        Renderer.needRender = true;
        for (let i of this.material) {
            i.opacity = opacity;
        }
    }
    getOpacity() {
        return this.material[0].opacity;
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
    opacityFlip(time = 0.2) {
        this.opacityFlipped ^= 1;
        this.opacitySpeed = 1 / time;
    }
    opacityAnimate(delta) {
        if (this.opacitySpeed === 0) {
            return;
        }
        Renderer.needRender = true;

        if (this.opacitySpeed * delta >= Math.abs(this.opacityFlipped - this.getOpacity())) {
            this.setOpacity(this.opacityFlipped);
            this.opacitySpeed = 0;
        } else {
            this.setOpacity(this.getOpacity() + sgn(this.opacityFlipped - this.getOpacity()) * delta * this.opacitySpeed);
        }
    }
    flip(time = 0.2) {
        this.flipped ^= 1;
        this.flipSpeed = Math.PI / time;
    }
    rotateAnimate(delta) {
        if (this.flipSpeed === 0) {
            return;
        }
        Renderer.needRender = true;

        if (this.flipSpeed * delta >= Math.abs(this.flipped * Math.PI - this.rotation.y)) {
            this.rotation.y = this.flipped * Math.PI;
            this.flipSpeed = 0;
        } else {
            this.rotation.y += sgn(this.flipped * Math.PI - this.rotation.y) * delta * this.flipSpeed;
        }
    }
    update(delta) {
        this.rotateAnimate(delta);
        this.opacityAnimate(delta);
    }
}