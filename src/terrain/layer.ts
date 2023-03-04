import { Point } from "../util";
import { Chunk } from "./chunk";

export interface Layer {
    update(pos: Point): void;
    render(pos: Point): void;
    
    chunkParent: Chunk;
    cachedImage: ImageData
}