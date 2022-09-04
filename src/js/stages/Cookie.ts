import { print } from "../ui/util";
import { STAGE_COUNT } from './ChooseStage';

var ok: boolean[] = [];

for (let i = 0; i < STAGE_COUNT; i++) {
    ok.push(false);
}
if (document.cookie.length) {
    let s = document.cookie.substring(3);
    for (let i = 0; i < s.length; i++) {
        let num = parseInt(s[s.length - i - 1], 16);
        for (let j = 0; j < 4; j++) {
            if ((num >> j) % 2 === 1) {
                ok[i * 4 + j] = true;
            }
        }
    }
}

print(ok);

function save() {
    let num = 0;
    let hex = '';
    for (let i = ok.length - 1; i >= 0; i--) {
        num = num * 2 + (ok[i] ? 1 : 0);
        if (i % 4 === 0) {
            hex += num.toString(16);
            num = 0;
        }
    }
    document.cookie = `ok=${hex}; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;`;
}

export class Cookie {
    static get(id: number): boolean {
        console.assert(id >= 0 && id < STAGE_COUNT, 'Cookie.get fail');
        return ok[id];
    }
    static set(id: number) {
        console.assert(id >= 0 && id < STAGE_COUNT, 'Cookie.set fail');
        if (ok[id] === false) {
            ok[id] = true;
            save();
        }
    }
    static clear() {
        for (let i = 0; i < STAGE_COUNT; i++) {
            ok[i] = false;
        }
        save();
    }
    static count(): number {
        let result = 0;
        for (let i = 0; i < STAGE_COUNT; i++) {
            if (ok[i]) {
                result++;
            }
        }
        return result;
    }
}