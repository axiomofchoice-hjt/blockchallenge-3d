class Box {
    constructor(x, y, z) {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(x, y, z),
            [
                new THREE.MeshLambertMaterial(),
                new THREE.MeshLambertMaterial(),
                new THREE.MeshLambertMaterial(),
                new THREE.MeshLambertMaterial(),
                new THREE.MeshLambertMaterial(),
                new THREE.MeshLambertMaterial(),
            ]
        );
    }
    get() {
        return this.mesh;
    }
}