import gsap from "gsap";
import { Renderer } from "./renderer";
class Animation {
    constructor(object, attr, speed) {
        this.object = object;
        this.attr = attr;
        this.speed = speed;
        this.tween = null;
    }
    load(to) {
        if (this.tween !== null) {
            this.tween.kill();
        }
        let vars = {};
        vars[this.attr] = to;
        vars.duration = Math.abs(this.object[this.attr] - to) / this.speed;
        vars.onUpdate = () => {
            Renderer.needRender = true;
        };
        this.tween = gsap.to(this.object, vars
        );
    }
}
export { Animation };