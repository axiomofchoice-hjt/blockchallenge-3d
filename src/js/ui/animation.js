import gsap from "gsap";
import { Renderer } from "./renderer";
import { print } from './util';

class Animation {
    constructor(object, attr, speed) {
        this.object = object;
        this.attr = attr;
        this.speed = speed;
        this.tween = null;
    }
    load(to, onUpdate = () => { }, onComplete = () => { }) {
        if (this.tween !== null) {
            this.tween.kill();
        }
        let vars = {};
        if (Array.isArray(this.attr)) {
            vars.duration = 0;
            for (let i = 0; i < this.attr.length; i++) {
                vars[this.attr[i]] = to[i];
                vars.duration = Math.max(vars.duration, Math.abs(this.object[this.attr[i]] - to[i], 2) / this.speed);
            }
        } else {
            vars[this.attr] = to;
            vars.duration = Math.abs(this.object[this.attr] - to) / this.speed;
        }
        vars.onUpdate = () => {
            Renderer.needRender = true;
            onUpdate();
        };
        vars.onComplete = onComplete;
        print(vars);
        this.tween = gsap.to(this.object, vars
        );
    }
}

export { Animation };