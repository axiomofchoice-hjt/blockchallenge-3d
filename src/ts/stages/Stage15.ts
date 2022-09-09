import { Grid } from "../stageBase/Grid";
import { black, eqTask, genArray, print, range, shuffle } from "../ui/util";
import { Controller } from "./Controller";

export default class Stage extends Grid {
    tag: number[];
    constructor(father: Controller) {
        super(father, 1, 7);
        this.tag = [0, 1, 2, 3, 4, 5, 6];
        this.header.setText('交换 请点击方块');

        this.footer.setTasks(
            [0, 1, eqTask],
            [0, 1, eqTask],
            [0, 1, eqTask],
            [0, 1, eqTask],
            [0, 1, eqTask],
            [0, 1, eqTask],
            [0, 1, eqTask],
        );


        var test = (tag: number[]) => {
            for (let i = 0; i < tag.length - 1; i++) {
                if (Math.abs(tag[i] - tag[i + 1]) === 1) {
                    return false;
                }
            }
            return true;
        };
        while (!test(this.tag)) {
            shuffle(this.tag);
        }
        for (let i of range(this.size)) {
            this.boxes[i].animes.contentTo(this.tag[i] + 1, black, { immediately: true });
        }
        for (let i of range(this.size)) {
            this.footer.tasks[i].set(this.tag[i] == i ? 1 : 0);
        }
        this.footer.update();

        this.input.click = (id: number) => {
            for (let i of range(this.size)) {
                let to: number;
                if (i == id) {
                    to = this.size - 1 - id;
                    let box = this.boxes[i];
                    box.animes.position[0].load(this.getPosition(to)[0], { delay: 0.1 });
                } else if (i < id) {
                    to = this.size - id + i;
                    let box = this.boxes[i];
                    box.animes.position[1].load(120, {
                        duration: 0.1,
                        ease: "power1.out",
                        onComplete: () => {
                            box.animes.position[0].load(this.getPosition(to)[0], {
                                onComplete: () => {
                                    box.animes.position[1].load(0, {
                                        duration: 0.1,
                                        ease: "power1.in"
                                    });
                                }
                            });
                        }
                    });
                } else {
                    to = i - id - 1;
                    let box = this.boxes[i];
                    box.animes.position[1].load(-120, {
                        duration: 0.1,
                        ease: "power1.out",
                        onComplete: () => {
                            box.animes.position[0].load(this.getPosition(to)[0], {
                                onComplete: () => {
                                    box.animes.position[1].load(0, {
                                        duration: 0.1,
                                        ease: "power1.in"
                                    });
                                }
                            });
                        }
                    });
                }
            }
            this.boxes = this.boxes.slice(id + 1).concat(this.boxes.slice(id, id + 1).concat(this.boxes.slice(0, id)));
            for (let i of range(this.size)) {
                this.boxes[i].index = i;
            }
            this.tag = this.tag.slice(id + 1).concat(this.tag.slice(id, id + 1).concat(this.tag.slice(0, id)));

            for (let i of range(this.size)) {
                this.footer.tasks[i].set(this.tag[i] == i ? 1 : 0);
            }
            this.footer.update();
        };
    }
}
