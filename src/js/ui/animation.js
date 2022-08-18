import { width, height, canvas, print, sgn, range, rangeMatrix } from '/js/ui/util.js';
import { Renderer } from '/js/ui/renderer.js';

class Animation {
    constructor(getter, setter) {
        this.speed = 0;
        this.getter = getter;
        this.setter = setter;
    }
    push(to, speed) {
        this.to = to;
        this.speed = speed * sgn(to - this.getter());
    }
    update(delta) {
        if (this.speed === 0) {
            return;
        }

        Renderer.needRender = true;
        if (Math.abs(this.getter() - this.to) <= delta * Math.abs(this.speed)) {
            this.setter(this.to);
            this.speed = 0;
        } else {
            this.setter(this.getter() + delta * this.speed);
        }
    }
}

export { Animation };