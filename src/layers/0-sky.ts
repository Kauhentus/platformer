import { Point } from "../util";
import { Layer } from "../terrain/layer";
import { config } from "../config";
import { Chunk } from "../terrain/chunk";

export class Sky1Layer implements Layer {
    chunkParent: Chunk;
    cachedImage: ImageData;
    
    constructor(chunkParent: Chunk){
        this.chunkParent = chunkParent;
        this.cachedImage = chunkParent.ctx.createImageData(config.chunkWidth, config.screenDimension[1]);
    }

    update(pos: Point) {

    }

    render(pos: Point) {
        const chunk = this.chunkParent;
        const relativeStartX = chunk.startX - pos[0];

        chunk.ctx.fillStyle = `#4fb3e8`;
        chunk.ctx.fillRect(relativeStartX, 0, config.chunkWidth, config.screenDimension[1]);

        const bctx = this.chunkParent.terrainParent.bufferCtx;
        
    }
}