import * as THREE from 'three';
import { width, height, canvas, print, sgn, range, rangeMatrix } from './util.js';

class Material extends THREE.MeshLambertMaterial {
    static solid(color = '#ffffff') {
        return new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            opacity: 1
        });
    }
    // static textCanvasAdapted(text, color, bgColor) {
    //     let canvas = document.createElement('canvas');
    //     let ctx = canvas.getContext('2' + 'd');
    //     ctx.font = 80 + 'px bold';
    //     ctx.textAlign = 'center';
    //     ctx.textBaseline = 'middle';

    //     let measure = ctx.measureText(text);
    //     canvas.width = measure.width;
    //     canvas.height = measure.height;

    //     ctx.fillStyle = '#' + bgColor.getHexString();
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    //     ctx.fillStyle = '#' + color.getHexString();
    //     ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 10);
    //     return canvas;
    // }
    static textCanvas(text, color, bgColor, width, height) {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2' + 'd');
        ctx.font = 80 + 'px bold';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#' + bgColor.getHexString();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#' + color.getHexString();
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 10);
        return canvas;
    }
    static text(text, color, bgColor) {
        return new THREE.MeshLambertMaterial({
            map: new THREE.CanvasTexture(Material.textCanvas(text, color, bgColor, 200, 200)),
            transparent: true,
            opacity: 1
        });
    }
    // static textAdapted(text, color, bgColor) {
    //     let canvas = Material.textCanvasAdapted(text, color, bgColor);
    //     return {
    //         material: new THREE.MeshLambertMaterial({
    //             map: new THREE.CanvasTexture(canvas),
    //             transparent: true,
    //             opacity: 1
    //         }),
    //         width: canvas.width,
    //         height: canvas.height
    //     };
    // };
}

export { Material };