import gsap from "gsap";
import { Scene } from "./Scene";

export interface AnimationArgs {
    speed?: number;
    duration?: number;
    ease?: string;
    onUpdate?: () => void;
    onComplete?: () => void;
    delay?: number;
    immediately?: boolean;
}

export class Animation {
    static scene: Scene;
    public target: any;
    public attr: string;
    public tween: gsap.core.Tween | null;
    constructor(target: any, attr: string) {
        this.target = target;
        this.attr = attr;
        this.tween = null;
    }
    load(to: number, args: AnimationArgs = {}) {
        if (this.tween !== null) {
            this.tween.kill();
        }

        if (args.immediately) {
            this.target[this.attr] = to;
            return;
        }

        args = {
            onUpdate: () => { },
            onComplete: () => { },
            ease: 'none',
            ...args
        };

        let vars: any = {};
        let dis: number = 0;

        vars[this.attr] = to;
        dis = Math.max(dis, Math.abs(this.target[this.attr] - to));

        vars.duration = 10000;
        if (
            args.speed === undefined && args.duration === undefined) {
            args.duration = 0.2;
        }
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