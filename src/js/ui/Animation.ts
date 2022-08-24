import gsap from "gsap";

class Animation {
    public object: object;
    public attr: string[];
    public tween: gsap.core.Tween | null;
    constructor(object: object, attr: string | string[]) {
        this.object = object;
        if (!Array.isArray(attr)) {
            attr = [attr];
        }
        this.attr = attr;
        this.tween = null;
    }
    load(to: number | number[], args: object = {}) {
        if (!Array.isArray(to)) {
            to = [to];
        }
        console.assert(
            this.attr.length === to.length,
            "attr.length !== to.length fail"
        );
        for (let i = 0; i < this.attr.length; i++) {
            if (to[i] === null) {
                to[i] = this.object[this.attr[i]];
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

        let vars: object = {};
        let dis: number = 0;
        for (let i = 0; i < this.attr.length; i++) {
            vars[this.attr[i]] = to[i];
            dis = Math.max(dis, Math.abs(this.object[this.attr[i]] - to[i]));
        }

        vars['duration'] = 10000;
        console.assert(
            args['speed'] !== undefined || args['duration'] !== undefined,
            'speed or duration is needed'
        )
        if (args['speed'] !== undefined) {
            vars['duration'] = Math.min(vars['duration'], dis / args['speed']);
        }
        if (args['duration'] !== undefined) {
            vars['duration'] = Math.min(vars['duration'], args['duration']);
        }

        vars['onUpdate'] = () => {
            // Renderer.needRender = true;
            args['onUpdate']();
        };
        vars['onComplete'] = args['onComplete'];
        vars['ease'] = args['ease'];
        // print(vars);
        this.tween = gsap.to(this.object, vars
        );
    }
}

export { Animation };