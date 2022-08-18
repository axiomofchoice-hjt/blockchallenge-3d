import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from '/js/ui/util.js';

class Material extends THREE.MeshLambertMaterial {
    static solid(color = '#ffffff') {
        return new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            opacity: 1
        });
    }
    static text(text, color, bgColor) {
        let canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        let ctx = canvas.getContext('2' + 'd');
        ctx.font = 80 + 'px bold';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 10);

        return new THREE.MeshLambertMaterial({
            map: new THREE.CanvasTexture(canvas),
            transparent: true,
            opacity: 1
        });
    }
}

export { Material };