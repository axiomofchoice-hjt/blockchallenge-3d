import { Input } from "./Grid";
import { Scene } from "../ui/Scene";
import { Controller } from "../stages/Controller";
import { Box } from "../ui/Box";

export interface StageInterface {
    father: Controller;
    boxes: Box[];
    fitWindow(): void;
    mainLoopUpdate(delta: number): void;
    scene: Scene;
    input: Input;
    drop(): void;
}