import * as THREE from 'three';

export interface TextArgs {
    text: string | number;
    color: THREE.ColorRepresentation;
    opacity: number;
}

export class Material {
    static solid(color: THREE.ColorRepresentation = '#ffffff') {
        color = new THREE.Color(color);
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
    static textsCanvas(contents: TextArgs[], bgColor: THREE.Color, width: number, height: number) {
        let canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2' + 'd');
        ctx.font = 80 + 'px bold';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#' + bgColor.getHexString();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let content of contents) {
            let color = new THREE.Color(content.color);
            ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${content.opacity})`;
            ctx.fillText(<string>content.text, canvas.width / 2, canvas.height / 2 + 10);
        }
        return canvas;
    }
    // static textCanvas(text: string, color: THREE.Color, bgColor: THREE.Color, width: number, height: number) {
    //     let canvas: HTMLCanvasElement = document.createElement('canvas');
    //     canvas.width = width;
    //     canvas.height = height;
    //     let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2' + 'd');
    //     ctx.font = 80 + 'px bold';
    //     ctx.textAlign = 'center';
    //     ctx.textBaseline = 'middle';

    //     ctx.fillStyle = '#' + bgColor.getHexString();
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    //     ctx.fillStyle = '#' + color.getHexString();
    //     ctx.fillText(<string>text, canvas.width / 2, canvas.height / 2 + 10);
    //     return canvas;
    // }
    // static text(text: string | number, color: THREE.Color, bgColor: THREE.Color) {
    //     return new THREE.MeshLambertMaterial({
    //         map: new THREE.CanvasTexture(Material.textsCanvas(text, color, bgColor, 200, 200)),
    //         transparent: true,
    //         opacity: 1
    //     });
    // }
    static text(contents: TextArgs[], bgColor: THREE.Color) {
        return new THREE.MeshLambertMaterial({
            map: new THREE.CanvasTexture(Material.textsCanvas(contents, bgColor, 200, 200)),
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