import gsap from "gsap";
import { Scene } from "./Scene";

interface AnimationArgs {
    speed?: number;
    duration?: number;
    ease?: string;
    onUpdate?: () => void;
    onComplete?: () => void;
    delay?: number;
}

class Animation {
    static scene: Scene;
    public target: any;
    public attr: string[];
    public tween: gsap.core.Tween | null;
    constructor(target: any, attr: string | string[]) {
        this.target = target;
        if (!Array.isArray(attr)) {
            attr = [attr];
        }
        this.attr = attr;
        this.tween = null;
    }
    load(to: number | number[], args: AnimationArgs = {}) {
        if (!Array.isArray(to)) {
            to = [to];
        }
        console.assert(
            this.attr.length === to.length,
            "attr.length !== to.length fail"
        );
        for (let i = 0; i < this.attr.length; i++) {
            if (to[i] === null) {
                to[i] = this.target[this.attr[i]];
            }
        }
        if (this.tween !== null) {
            this.tween.kill();
        }
        args = {
            onUpdate: () => { },
            onComplete: () => { },
            ease: 'none',
            ...args
        };

        let vars: any = {};
        let dis: number = 0;
        for (let i = 0; i < this.attr.length; i++) {
            vars[this.attr[i]] = to[i];
            dis = Math.max(dis, Math.abs(this.target[this.attr[i]] - to[i]));
        }

        vars.duration = 10000;
        console.assert(
            args.speed !== undefined || args.duration !== undefined,
            'speed or duration is needed'
        );
        if (args.speed !== undefined) {
            vars.duration = Math.min(vars.duration, dis / args.speed);
        }
        if (args.duration !== undefined) {
            vars.duration = Math.min(vars.duration, args.duration);
        }

        vars.onUpdate = () => {
            Animation.scene.changed = true;
            if (args.onUpdate !== undefined) {
                args.onUpdate();
            }
        };
        vars.onComplete = args.onComplete;
        vars.ease = args.ease;
        vars.delay = args.delay;
        // print(vars);
        this.tween = gsap.to(this.target, vars);
    }
}

export { Animation, AnimationArgs };