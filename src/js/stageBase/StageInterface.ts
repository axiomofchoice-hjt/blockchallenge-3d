import { Input } from "./Grid";
import { Scene } from "../ui/Scene";
import { Controller } from "../stages/Controller";

export interface StageInterface {
    father: Controller;
    fitWindow(): void;
    mainLoopUpdate(delta: number): void;
    scene: Scene;
    input: Input;
    drop(): void;
}