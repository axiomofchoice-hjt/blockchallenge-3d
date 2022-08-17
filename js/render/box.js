class Box extends THREE.Mesh {
    constructor(x, y, z) {
        super(
            new THREE.BoxGeometry(x, y, z),
            [
                Material.solid(),
                Material.solid(),
                Material.solid(),
                Material.solid(),
                Material.text('233', '#000000', '#ffffff'),
                Material.solid(),
            ]
        );
        Renderer.add(this);
        this.animateRY = {
            degree: 0,
            speed: 0
        };
    }
    flip(time) {
        if (this.animateRY.speed === 0) {
            if (Math.abs(this.rotation.y) <= 1) {
                this.animateRY.degree = Math.PI;
                this.rotation.y = Math.PI * 2;
            } else {
                this.animateRY.degree = this.rotation.y - Math.PI;
            }
        } else {
            this.animateRY.degree =
                Math.abs(this.animateRY.degree - Math.PI) > 1
                    ? Math.PI
                    : this.animateRY.degree < Math.PI
                        ? 0
                        : Math.PI * 2;
        }
        this.animateRY.speed = Math.PI / time;
    }
    rotateAnimate(delta) {
        if (this.animateRY.speed === 0) {
            return;
        }
        Renderer.needRender = true;

        if (this.animateRY.speed * delta >= Math.abs(this.animateRY.degree - this.rotation.y)) {
            this.rotation.y = this.animateRY.degree;
            this.animateRY.speed = 0;
        } else {
            this.rotation.y += sgn(this.animateRY.degree - this.rotation.y) * delta * this.animateRY.speed;
            print(this.rotation.y);
        }
    }
    update(delta) {
        this.rotateAnimate(delta);
    }
}