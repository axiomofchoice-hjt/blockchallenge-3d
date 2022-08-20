import gsap from "gsap";
import { Renderer } from "./renderer";
import { print } from './util';

class Animation {
    constructor(object, attr, args) {
        this.object = object;
        if (!Array.isArray(attr)) {
            attr = [attr];
        }
        if (args === undefined) {
            args = {};
        }
        args = { onUpdate: () => { }, onComplete: () => { }, ease: 'none', ...args };
        this.attr = attr;
        this.args = args;
        this.tween = null;
    }
    load(to, args) {
        if (!Array.isArray(to)) {
            to = [to];
        }
        if (args === undefined) {
            args = {};
        }
        console.assert(
            this.attr.length === to.length,
            "Animation.load fail"
        );
        if (this.tween !== null) {
            this.tween.kill();
        }
        args = { ...this.args, ...args };

        let vars = {};
        let dis = 0;
        for (let i = 0; i < this.attr.length; i++) {
            vars[this.attr[i]] = to[i];
            dis = Math.max(dis, Math.abs(this.object[this.attr[i]] - to[i], 2));
        }

        vars.duration = 10000;
        if (args.speed !== undefined) {
            vars.duration = Math.min(vars.duration, dis / args.speed);
        }
        if (args.duration !== undefined) {
            vars.duration = Math.min(vars.duration, args.duration);
        }

        vars.onUpdate = () => {
            Renderer.needRender = true;
            args.onUpdate();
        };
        vars.onComplete = args.onComplete;
        vars.ease = args.ease;
        print(vars);
        this.tween = gsap.to(this.object, vars
        );
    }
}

export { Animation };