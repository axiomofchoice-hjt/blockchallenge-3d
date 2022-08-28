import { Grid } from "../ui/Grid";
import { genArray } from "../ui/util";

export class Stage extends Grid {
    L: number;
    R: number;
    tag: boolean[];
    constructor() {
        super(7, 9);
        this.L = 0;
        this.R = this.size - 1;
        this.tag = genArray(this.size, () => false);
        this.footer.addTask(0, 1, (x, n) => (x == n ? 1 : 0));
        this.footer.addTask(0, 6, (x, n) => (x > n) ? -1 : 1);
        this.input.click = (id: number) => {
            if (this.tag[id]) { return; }
            this.tag[id] = true;
            this.footer.tasks[1].add(1);
            if (id === this.L && this.L == this.R) {
                this.boxes[id].animes.contentTo("ok");
                this.boxes[id].animes.bgColorTo("#f00");
                this.footer.tasks[0].set(1);
            } else if ((id * 2 === this.L + this.R && Math.random() < 0.5) || id * 2 < this.L + this.R) {
                this.boxes[id].animes.contentTo(">");
                this.boxes[id].animes.bgColorTo("#ff0");
                if (this.L <= id && id <= this.R) {
                    this.L = id + 1;
                }
            } else {
                this.boxes[id].animes.contentTo("<");
                this.boxes[id].animes.bgColorTo("#00f");
                if (this.L <= id && id <= this.R) {
                    this.R = id - 1;
                }
            }
        };
    }

}