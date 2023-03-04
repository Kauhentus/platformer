import { config } from "../config";
import { Sky1Layer } from "../layers/0-sky";
import { Background1Layer } from "../layers/10-background";
import { GroundLayer } from "../layers/20-ground";
import { Point } from "../util";
import { Layer } from "./layer";
import { Terrain } from "./terrain";

export class Chunk {
    id: number;
    startX: number;
    ctx: CanvasRenderingContext2D;
    terrainParent: Terrain;
    layers: Layer[];

    constructor(id: number, ctx: CanvasRenderingContext2D, terrain: Terrain){
        this.terrainParent = terrain;
        this.ctx = ctx;
        this.id = id;
        this.startX = this.id * config.chunkWidth;

        this.layers = [
            new Sky1Layer(this),
            new Background1Layer(this),
            new GroundLayer(this)
        ];
    }

    render(pos: Point){
        this.layers.forEach(layer => layer.render(pos));
    }

    getRelativeStartY(pos: Point, y: number, objectHeight: number){
        return config.screenDimension[1] + pos[1] - y - objectHeight;
    }

    renderDev(
        pos: Point, 
        bounds: boolean = true,
        grid: boolean = true
    ){
        const relativeStartX = this.startX - pos[0];
        const relativeStartY = pos[1]; // bottom of chunk

        if(bounds){
            this.ctx.strokeStyle = `#444444`;
            this.ctx.beginPath();
            this.ctx.moveTo(relativeStartX, 0);
            this.ctx.lineTo(relativeStartX, config.screenDimension[1]);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        const gridResolution = 50;
        if(grid){
            for(let x = relativeStartX; x <= relativeStartX + config.chunkWidth; x += gridResolution){
                this.ctx.strokeStyle = `#aaaaaa66`;
                this.ctx.beginPath();
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, config.screenDimension[1]);
                this.ctx.closePath();
                this.ctx.stroke();
            }

            const yOffset = relativeStartY % gridResolution;
            for(let y = yOffset; y <= yOffset + config.screenDimension[1]; y += gridResolution){
                this.ctx.strokeStyle = `#aaaaaa66`;
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(config.screenDimension[0], y);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
    }
}