import { Color, lerpColor, Point, triple2Hex } from "../util";
import { Layer } from "../terrain/layer";
import { config } from "../config";
import { Chunk } from "../terrain/chunk";

export class Background1Layer implements Layer {
    chunkParent: Chunk;
    surfacePoints: Point[];
    surfaceColors: Color[];
    
    constructor(chunkParent: Chunk){
        this.chunkParent = chunkParent;
        this.surfacePoints = [];
        this.surfaceColors = [];

        const chunk = this.chunkParent;
        const color1: Color = [57, 146, 193];
        const color2: Color = [54, 201, 141];
        
        for(let i = 0; i < config.chunkWidth; i += config.pixelSize){
            const curColor = lerpColor(
                color1, color2,
                chunk.terrainParent.noise2D((chunk.startX + i + 10) * 0.0005, 5)
            );

            const noiseFunc = chunk.terrainParent.noise2D;
            const yLevel = 200 + noiseFunc((chunk.startX + i + 10) * 0.001, 1) * 100
                                + noiseFunc((chunk.startX + i) * 0.005, 16) * 10
                                - noiseFunc((chunk.startX + i) * 0.1, 8) * 5;

            this.surfacePoints.push([i, yLevel]);
            this.surfaceColors.push(curColor);
        }
    }

    update(pos: Point) {

    }

    render(pos: Point) {
        const chunk = this.chunkParent;
        const relativeStartX = chunk.startX - pos[0];

        for(let i = 0; i < this.surfacePoints.length; i++){
            const p = this.surfacePoints[i];
            const c = this.surfaceColors[i];

            chunk.ctx.fillStyle = triple2Hex(c);
            chunk.ctx.fillRect(
                relativeStartX + p[0], 
                config.screenDimension[1] - p[1] + pos[1] + 0, 
                30, 
                p[1]
            );
        }
    }
}