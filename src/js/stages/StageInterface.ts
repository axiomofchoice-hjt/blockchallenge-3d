import { Input } from "../ui/Grid";
import { Scene } from "../ui/Scene";

export interface StageInterface {
    fitWindow(): void;
    mainLoopUpdate(delta: number): void;
    scene: Scene;
    input: Input;
}