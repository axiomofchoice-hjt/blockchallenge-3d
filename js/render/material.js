var Material = {
    solid(color = '#ffffff') {
        return new THREE.MeshLambertMaterial({
            color: color
        });
    },
    text(text, color, bgColor) {
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2 + 10);

        return new THREE.MeshLambertMaterial({
            map: new THREE.CanvasTexture(this.canvas)
        });
    },
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 200;
        this.canvas.height = 200;
        this.ctx = this.canvas.getContext('2' + 'd');
        this.ctx.font = 80 + 'px bold';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
    }
};
Material.init();