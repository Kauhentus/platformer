import { Terrain } from "./terrain/terrain";
import { Point } from "./util";
import { InputHandler } from "./inputHandler";
import { config } from "./config";

const screenDimension = config.screenDimension;
const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
mainCanvas.width = screenDimension[0];
mainCanvas.height = screenDimension[1];

const ctx = mainCanvas.getContext('2d') as CanvasRenderingContext2D;

console.log("hello world");

let speedX = 5;
let speedY = 5;
let pos : Point = [screenDimension[0], 0];

const inputHandler = new InputHandler();
const terrain = new Terrain(ctx);

const update = () => {
    if(inputHandler.isKeyDown('a')) pos[0] -= speedX;
    if(inputHandler.isKeyDown('d')) pos[0] += speedX;
    if(inputHandler.isKeyDown('w')) pos[1] += speedY;
    if(inputHandler.isKeyDown('s')) pos[1] -= speedY;

    terrain.update(pos);

    // console.log(pos, terrain.chunks);
    // console.log(pos, terrain.getChunkFromX(pos[0]))
}

const render = () => {
    ctx.clearRect(0, 0, screenDimension[0], screenDimension[1]);
    terrain.render(pos);
    terrain.renderDev(pos);
}

let alpha = 0.9;
let avgFps = 30;
let framesThisSecond = 0;
setInterval(() => {
    avgFps = alpha * avgFps + (1.0 - alpha) * framesThisSecond;
    framesThisSecond = 0;
    console.log('FPS', avgFps);
}, 1000);

const loop = () => {
    framesThisSecond += 1;
    update();
    render();
    requestAnimationFrame(loop);
}
loop();