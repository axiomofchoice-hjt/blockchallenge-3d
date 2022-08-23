// import * as THREE from 'three';
// import { Material } from './material';
// import { Animation } from './animation';
// import { print } from './util';

// class Color {
//     constructor(color, ctx) {
//         color = new THREE.Color(color);
//         this._ctx = ctx;
//         this._r = color.r;
//         this._g = color.g;
//         this._b = color.b;
//     }
//     get r() { return this._r; }
//     get g() { return this._g; }
//     get b() { return this._b; }
//     set r(r) { this._r = r; this._ctx.changed = true; }
//     set g(g) { this._g = g; this._ctx.changed = true; }
//     set b(b) { this._b = b; this._ctx.changed = true; }
//     get() {
//         return new THREE.Color(this._r, this._g, this._b);
//     }
// }

// class TextMaterial {
//     constructor(text = '', color = '#000000', bgColor = '#ffffff') {
//         this.changed = true;
        
//         this._color = new Color(color, this);
//         this._bgColor = new Color(bgColor, this);
//     }
//     get color() { return this._color; }
//     get bgColor() { return this._bgColor; }
//     set color(color) { this._color = new Color(color, this); this.changed = true; }
//     set bgColor(bgColor) { this._bgColor = new Color(bgColor, this); this.changed = true; }
//     get() {
//         return Material.text(
//             this._text,
//             this._color.get(),
//             this._bgColor.get()
//         );
//     }
// }

// export { TextMaterial };