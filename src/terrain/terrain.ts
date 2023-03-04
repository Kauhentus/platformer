import { BBox, Point } from "../util"
import { createNoise2D } from 'simplex-noise';
import { config } from "../config";
import { Chunk } from "./chunk";

// chunks start at 0, left to right -- no negative

export class Terrain {
    chunks: Map<number, Chunk>;
    ctx: CanvasRenderingContext2D;

    bufferChunkCanvas: HTMLCanvasElement;
    bufferCtx: CanvasRenderingContext2D;

    noise2D: (x: number, y: number) => number;

    constructor(ctx: CanvasRenderingContext2D){
        this.chunks = new Map<number, Chunk>();
        this.ctx = ctx;
        this.noise2D = createNoise2D();

        this.bufferChunkCanvas = document.createElement('canvas');
        this.bufferChunkCanvas.width = config.chunkWidth;
        this.bufferChunkCanvas.height = config.screenDimension[1];
        this.bufferCtx = this.bufferChunkCanvas.getContext('2d') as CanvasRenderingContext2D;
    }

    update(pos: Point){
        const newChunks = this.checkGenerateNewChunks(pos);
        if(newChunks.length > 0) newChunks.forEach(i => this.generateChunk(i));
    }

    checkGenerateNewChunks(pos: Point) : number[] {
        const visibleChunks = this.getVisibleChunkIndices(pos);
        const missingChunks = visibleChunks.filter((i) => !this.chunks.has(i))
        return missingChunks;
    }

    generateChunk(i: number){
        const c = new Chunk(i, this.ctx, this);
        this.chunks.set(i, c);
    }

    getCurrentViewport(pos: Point) : BBox {
        const minX = pos[0] - config.screenDimension[0];
        const maxX = pos[0] + config.screenDimension[0];
        const minY = pos[1] - config.screenDimension[1];
        const maxY = pos[1] + config.screenDimension[1];
        const bbox : BBox = [minX, maxX, minY, maxY];
        return bbox;
    }

    getChunkFromX(x: number){
        return x / config.chunkWidth | 0;
    }

    getVisibleChunkIndices(pos : Point){
        const bbox = this.getCurrentViewport(pos);
        const startChunkIndex = this.getChunkFromX(bbox[0]);
        const endChunkIndex = this.getChunkFromX(bbox[1]);

        const visibleChunks = [];
        for(let i = startChunkIndex; i <= endChunkIndex; i++) visibleChunks.push(i);
        return visibleChunks;
    }

    render(pos: Point){
        this.getVisibleChunkIndices(pos)
            .forEach(index => this.chunks.get(index)?.render(pos));
    }    

    renderDev(pos: Point){
        this.getVisibleChunkIndices(pos)
        .forEach(index => this.chunks.get(index)?.renderDev(pos));
    }
}