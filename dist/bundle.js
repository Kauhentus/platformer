/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
const config = {
    screenDimension: [1280, 720],
    chunkWidth: 300,
    pixelSize: 10,
};


/***/ }),

/***/ "./src/inputHandler.ts":
/*!*****************************!*\
  !*** ./src/inputHandler.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputHandler": () => (/* binding */ InputHandler)
/* harmony export */ });
class InputHandler {
    constructor() {
        this.activeKeys = new Map();
        document.addEventListener('keydown', (e) => {
            this.activeKeys.set(e.key, true);
        });
        document.addEventListener('keyup', (e) => {
            if (this.activeKeys.has(e.key)) {
                this.activeKeys.delete(e.key);
            }
        });
    }
    isKeyDown(key) {
        return this.activeKeys.has(key);
    }
}


/***/ }),

/***/ "./src/layers/0-sky.ts":
/*!*****************************!*\
  !*** ./src/layers/0-sky.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sky1Layer": () => (/* binding */ Sky1Layer)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");

class Sky1Layer {
    constructor(chunkParent) {
        this.chunkParent = chunkParent;
        this.cachedImage = chunkParent.ctx.createImageData(_config__WEBPACK_IMPORTED_MODULE_0__.config.chunkWidth, _config__WEBPACK_IMPORTED_MODULE_0__.config.screenDimension[1]);
    }
    update(pos) {
    }
    render(pos) {
        const chunk = this.chunkParent;
        const relativeStartX = chunk.startX - pos[0];
        chunk.ctx.fillStyle = `#4fb3e8`;
        chunk.ctx.fillRect(relativeStartX, 0, _config__WEBPACK_IMPORTED_MODULE_0__.config.chunkWidth, _config__WEBPACK_IMPORTED_MODULE_0__.config.screenDimension[1]);
        const bctx = this.chunkParent.terrainParent.bufferCtx;
    }
}


/***/ }),

/***/ "./src/layers/10-background.ts":
/*!*************************************!*\
  !*** ./src/layers/10-background.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Background1Layer": () => (/* binding */ Background1Layer)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.ts");


class Background1Layer {
    constructor(chunkParent) {
        this.chunkParent = chunkParent;
        this.surfacePoints = [];
        this.surfaceColors = [];
        const chunk = this.chunkParent;
        const color1 = [57, 146, 193];
        const color2 = [54, 201, 141];
        for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_1__.config.chunkWidth; i += _config__WEBPACK_IMPORTED_MODULE_1__.config.pixelSize) {
            const curColor = (0,_util__WEBPACK_IMPORTED_MODULE_0__.lerpColor)(color1, color2, chunk.terrainParent.noise2D((chunk.startX + i + 10) * 0.0005, 5));
            const noiseFunc = chunk.terrainParent.noise2D;
            const yLevel = 200 + noiseFunc((chunk.startX + i + 10) * 0.001, 1) * 100
                + noiseFunc((chunk.startX + i) * 0.005, 16) * 10
                - noiseFunc((chunk.startX + i) * 0.1, 8) * 5;
            this.surfacePoints.push([i, yLevel]);
            this.surfaceColors.push(curColor);
        }
    }
    update(pos) {
    }
    render(pos) {
        const chunk = this.chunkParent;
        const relativeStartX = chunk.startX - pos[0];
        for (let i = 0; i < this.surfacePoints.length; i++) {
            const p = this.surfacePoints[i];
            const c = this.surfaceColors[i];
            chunk.ctx.fillStyle = (0,_util__WEBPACK_IMPORTED_MODULE_0__.triple2Hex)(c);
            chunk.ctx.fillRect(relativeStartX + p[0], _config__WEBPACK_IMPORTED_MODULE_1__.config.screenDimension[1] - p[1] + pos[1] + 0, 30, p[1]);
        }
    }
}


/***/ }),

/***/ "./src/layers/20-ground.ts":
/*!*********************************!*\
  !*** ./src/layers/20-ground.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroundLayer": () => (/* binding */ GroundLayer)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.ts");


class GroundLayer {
    constructor(chunkParent) {
        this.chunkParent = chunkParent;
        this.surfacePoints = [];
        this.surfaceColors = [];
        const chunk = this.chunkParent;
        const color1 = [49, 146, 55];
        const color2 = [50, 201, 72];
        for (let i = 0; i < _config__WEBPACK_IMPORTED_MODULE_1__.config.chunkWidth; i += _config__WEBPACK_IMPORTED_MODULE_1__.config.pixelSize) {
            const curColor = (0,_util__WEBPACK_IMPORTED_MODULE_0__.lerpColor)(color1, color2, chunk.terrainParent.noise2D((chunk.startX + i + 10) * 0.0007, 5));
            const noiseFunc = chunk.terrainParent.noise2D;
            const yLevel = 100 + noiseFunc((chunk.startX + i) * 0.001, 5) * 100
                + noiseFunc((chunk.startX + i) * 0.005, 16) * 10
                - noiseFunc((chunk.startX + i) * 0.1, 8) * 5;
            this.surfacePoints.push([i, yLevel]);
            this.surfaceColors.push(curColor);
        }
    }
    update(pos) {
    }
    render(pos) {
        const chunk = this.chunkParent;
        const relativeStartX = chunk.startX - pos[0];
        for (let i = 0; i < this.surfacePoints.length; i++) {
            const p = this.surfacePoints[i];
            const c = this.surfaceColors[i];
            chunk.ctx.fillStyle = (0,_util__WEBPACK_IMPORTED_MODULE_0__.triple2Hex)(c);
            chunk.ctx.fillRect(relativeStartX + p[0], _config__WEBPACK_IMPORTED_MODULE_1__.config.screenDimension[1] - p[1] + pos[1] + 0, 30, p[1]);
        }
    }
}


/***/ }),

/***/ "./src/terrain/chunk.ts":
/*!******************************!*\
  !*** ./src/terrain/chunk.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chunk": () => (/* binding */ Chunk)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _layers_0_sky__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layers/0-sky */ "./src/layers/0-sky.ts");
/* harmony import */ var _layers_10_background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layers/10-background */ "./src/layers/10-background.ts");
/* harmony import */ var _layers_20_ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../layers/20-ground */ "./src/layers/20-ground.ts");




class Chunk {
    constructor(id, ctx, terrain) {
        this.terrainParent = terrain;
        this.ctx = ctx;
        this.id = id;
        this.startX = this.id * _config__WEBPACK_IMPORTED_MODULE_0__.config.chunkWidth;
        this.layers = [
            new _layers_0_sky__WEBPACK_IMPORTED_MODULE_1__.Sky1Layer(this),
            new _layers_10_background__WEBPACK_IMPORTED_MODULE_2__.Background1Layer(this),
            new _layers_20_ground__WEBPACK_IMPORTED_MODULE_3__.GroundLayer(this)
        ];
    }
    render(pos) {
        this.layers.forEach(layer => layer.render(pos));
    }
    getRelativeStartY(pos, y, objectHeight) {
        return _config__WEBPACK_IMPORTED_MODULE_0__.config.screenDimension[1] + pos[1] - y - objectHeight;
    }
    renderDev(pos, bounds = true, grid = true) {
        const relativeStartX = this.startX - pos[0];
        const relativeStartY = pos[1]; // bottom of chunk
        if (bounds) {
            this.ctx.strokeStyle = `#444444`;
            this.ctx.beginPath();
            this.ctx.moveTo(relativeStartX, 0);
            this.ctx.lineTo(relativeStartX, _config__WEBPACK_IMPORTED_MODULE_0__.config.screenDimension[1]);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        const gridResolution = 50;
        if (grid) {
            for (let x = relativeStartX; x <= relativeStartX + _config__WEBPACK_IMPORTED_MODULE_0__.config.chunkWidth; x += gridResolution) {
                this.ctx.strokeStyle = `#aaaaaa66`;
                this.ctx.beginPath();
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, _config__WEBPACK_IMPORTED_MODULE_0__.config.screenDimension[1]);
                this.ctx.closePath();
                this.ctx.stroke();
            }
            const yOffset = relativeStartY % gridResolution;
            for (let y = yOffset; y <= yOffset + _config__WEBPACK_IMPORTED_MODULE_0__.config.screenDimension[1]; y += gridResolution) {
                this.ctx.strokeStyle = `#aaaaaa66`;
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(_config__WEBPACK_IMPORTED_MODULE_0__.config.screenDimension[0], y);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
    }
}


/***/ }),

/***/ "./src/terrain/terrain.ts":
/*!********************************!*\
  !*** ./src/terrain/terrain.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Terrain": () => (/* binding */ Terrain)
/* harmony export */ });
/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplex-noise */ "./node_modules/simplex-noise/dist/esm/simplex-noise.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _chunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk */ "./src/terrain/chunk.ts");



// chunks start at 0, left to right -- no negative
class Terrain {
    constructor(ctx) {
        this.chunks = new Map();
        this.ctx = ctx;
        this.noise2D = (0,simplex_noise__WEBPACK_IMPORTED_MODULE_0__.createNoise2D)();
        this.bufferChunkCanvas = document.createElement('canvas');
        this.bufferChunkCanvas.width = _config__WEBPACK_IMPORTED_MODULE_1__.config.chunkWidth;
        this.bufferChunkCanvas.height = _config__WEBPACK_IMPORTED_MODULE_1__.config.screenDimension[1];
        this.bufferCtx = this.bufferChunkCanvas.getContext('2d');
    }
    update(pos) {
        const newChunks = this.checkGenerateNewChunks(pos);
        if (newChunks.length > 0)
            newChunks.forEach(i => this.generateChunk(i));
    }
    checkGenerateNewChunks(pos) {
        const visibleChunks = this.getVisibleChunkIndices(pos);
        const missingChunks = visibleChunks.filter((i) => !this.chunks.has(i));
        return missingChunks;
    }
    generateChunk(i) {
        const c = new _chunk__WEBPACK_IMPORTED_MODULE_2__.Chunk(i, this.ctx, this);
        this.chunks.set(i, c);
    }
    getCurrentViewport(pos) {
        const minX = pos[0] - _config__WEBPACK_IMPORTED_MODULE_1__.config.screenDimension[0];
        const maxX = pos[0] + _config__WEBPACK_IMPORTED_MODULE_1__.config.screenDimension[0];
        const minY = pos[1] - _config__WEBPACK_IMPORTED_MODULE_1__.config.screenDimension[1];
        const maxY = pos[1] + _config__WEBPACK_IMPORTED_MODULE_1__.config.screenDimension[1];
        const bbox = [minX, maxX, minY, maxY];
        return bbox;
    }
    getChunkFromX(x) {
        return x / _config__WEBPACK_IMPORTED_MODULE_1__.config.chunkWidth | 0;
    }
    getVisibleChunkIndices(pos) {
        const bbox = this.getCurrentViewport(pos);
        const startChunkIndex = this.getChunkFromX(bbox[0]);
        const endChunkIndex = this.getChunkFromX(bbox[1]);
        const visibleChunks = [];
        for (let i = startChunkIndex; i <= endChunkIndex; i++)
            visibleChunks.push(i);
        return visibleChunks;
    }
    render(pos) {
        this.getVisibleChunkIndices(pos)
            .forEach(index => { var _a; return (_a = this.chunks.get(index)) === null || _a === void 0 ? void 0 : _a.render(pos); });
    }
    renderDev(pos) {
        this.getVisibleChunkIndices(pos)
            .forEach(index => { var _a; return (_a = this.chunks.get(index)) === null || _a === void 0 ? void 0 : _a.renderDev(pos); });
    }
}


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lerpColor": () => (/* binding */ lerpColor),
/* harmony export */   "mulberry32": () => (/* binding */ mulberry32),
/* harmony export */   "triple2Hex": () => (/* binding */ triple2Hex)
/* harmony export */ });
const lerpColor = (c1, c2, t) => c1.map((n, i) => t * n + (1 - t) * c2[i]);
const triple2Hex = (c1) => '#' + c1.map(n => (n | 0).toString(16).padStart(2, '0')).join('');
const mulberry32 = (a) => {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
};


/***/ }),

/***/ "./node_modules/simplex-noise/dist/esm/simplex-noise.js":
/*!**************************************************************!*\
  !*** ./node_modules/simplex-noise/dist/esm/simplex-noise.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildPermutationTable": () => (/* binding */ buildPermutationTable),
/* harmony export */   "createNoise2D": () => (/* binding */ createNoise2D),
/* harmony export */   "createNoise3D": () => (/* binding */ createNoise3D),
/* harmony export */   "createNoise4D": () => (/* binding */ createNoise4D)
/* harmony export */ });
/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.

 Copyright (c) 2022 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
// these #__PURE__ comments help uglifyjs with dead code removal
// 
const F2 = /*#__PURE__*/ 0.5 * (Math.sqrt(3.0) - 1.0);
const G2 = /*#__PURE__*/ (3.0 - Math.sqrt(3.0)) / 6.0;
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;
const F4 = /*#__PURE__*/ (Math.sqrt(5.0) - 1.0) / 4.0;
const G4 = /*#__PURE__*/ (5.0 - Math.sqrt(5.0)) / 20.0;
// I'm really not sure why this | 0 (basically a coercion to int)
// is making this faster but I get ~5 million ops/sec more on the
// benchmarks across the board or a ~10% speedup.
const fastFloor = (x) => Math.floor(x) | 0;
const grad2 = /*#__PURE__*/ new Float64Array([1, 1,
    -1, 1,
    1, -1,
    -1, -1,
    1, 0,
    -1, 0,
    1, 0,
    -1, 0,
    0, 1,
    0, -1,
    0, 1,
    0, -1]);
// double seems to be faster than single or int's
// probably because most operations are in double precision
const grad3 = /*#__PURE__*/ new Float64Array([1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
    1, 0, 1,
    -1, 0, 1,
    1, 0, -1,
    -1, 0, -1,
    0, 1, 1,
    0, -1, 1,
    0, 1, -1,
    0, -1, -1]);
// double is a bit quicker here as well
const grad4 = /*#__PURE__*/ new Float64Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
    0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
    1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
    -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
    1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
    -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
    1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
    -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]);
/**
 * Creates a 2D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction2D}
 */
function createNoise2D(random = Math.random) {
    const perm = buildPermutationTable(random);
    // precalculating this yields a little ~3% performance improvement.
    const permGrad2x = new Float64Array(perm).map(v => grad2[(v % 12) * 2]);
    const permGrad2y = new Float64Array(perm).map(v => grad2[(v % 12) * 2 + 1]);
    return function noise2D(x, y) {
        // if(!isFinite(x) || !isFinite(y)) return 0;
        let n0 = 0; // Noise contributions from the three corners
        let n1 = 0;
        let n2 = 0;
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y) * F2; // Hairy factor for 2D
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t; // Unskew the cell origin back to (x,y) space
        const Y0 = j - t;
        const x0 = x - X0; // The x,y distances from the cell origin
        const y0 = y - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        else {
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
        const y2 = y0 - 1.0 + 2.0 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        const ii = i & 255;
        const jj = j & 255;
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            const gi0 = ii + perm[jj];
            const g0x = permGrad2x[gi0];
            const g0y = permGrad2y[gi0];
            t0 *= t0;
            // n0 = t0 * t0 * (grad2[gi0] * x0 + grad2[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
            n0 = t0 * t0 * (g0x * x0 + g0y * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            const gi1 = ii + i1 + perm[jj + j1];
            const g1x = permGrad2x[gi1];
            const g1y = permGrad2y[gi1];
            t1 *= t1;
            // n1 = t1 * t1 * (grad2[gi1] * x1 + grad2[gi1 + 1] * y1);
            n1 = t1 * t1 * (g1x * x1 + g1y * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            const gi2 = ii + 1 + perm[jj + 1];
            const g2x = permGrad2x[gi2];
            const g2y = permGrad2y[gi2];
            t2 *= t2;
            // n2 = t2 * t2 * (grad2[gi2] * x2 + grad2[gi2 + 1] * y2);
            n2 = t2 * t2 * (g2x * x2 + g2y * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70.0 * (n0 + n1 + n2);
    };
}
/**
 * Creates a 3D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction3D}
 */
function createNoise3D(random = Math.random) {
    const perm = buildPermutationTable(random);
    // precalculating these seems to yield a speedup of over 15%
    const permGrad3x = new Float64Array(perm).map(v => grad3[(v % 12) * 3]);
    const permGrad3y = new Float64Array(perm).map(v => grad3[(v % 12) * 3 + 1]);
    const permGrad3z = new Float64Array(perm).map(v => grad3[(v % 12) * 3 + 2]);
    return function noise3D(x, y, z) {
        let n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y + z) * F3; // Very nice and simple skew factor for 3D
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const k = fastFloor(z + s);
        const t = (i + j + k) * G3;
        const X0 = i - t; // Unskew the cell origin back to (x,y,z) space
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = x - X0; // The x,y,z distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // X Y Z order
            else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // X Z Y order
            else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // Z X Y order
        }
        else { // x0<y0
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Z Y X order
            else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Y Z X order
            else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // Y X Z order
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        const x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
        const y2 = y0 - j2 + 2.0 * G3;
        const z2 = z0 - k2 + 2.0 * G3;
        const x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
        const y3 = y0 - 1.0 + 3.0 * G3;
        const z3 = z0 - 1.0 + 3.0 * G3;
        // Work out the hashed gradient indices of the four simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        // Calculate the contribution from the four corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = ii + perm[jj + perm[kk]];
            t0 *= t0;
            n0 = t0 * t0 * (permGrad3x[gi0] * x0 + permGrad3y[gi0] * y0 + permGrad3z[gi0] * z0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = ii + i1 + perm[jj + j1 + perm[kk + k1]];
            t1 *= t1;
            n1 = t1 * t1 * (permGrad3x[gi1] * x1 + permGrad3y[gi1] * y1 + permGrad3z[gi1] * z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = ii + i2 + perm[jj + j2 + perm[kk + k2]];
            t2 *= t2;
            n2 = t2 * t2 * (permGrad3x[gi2] * x2 + permGrad3y[gi2] * y2 + permGrad3z[gi2] * z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = ii + 1 + perm[jj + 1 + perm[kk + 1]];
            t3 *= t3;
            n3 = t3 * t3 * (permGrad3x[gi3] * x3 + permGrad3y[gi3] * y3 + permGrad3z[gi3] * z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to stay just inside [-1,1]
        return 32.0 * (n0 + n1 + n2 + n3);
    };
}
/**
 * Creates a 4D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction4D}
 */
function createNoise4D(random = Math.random) {
    const perm = buildPermutationTable(random);
    // precalculating these leads to a ~10% speedup
    const permGrad4x = new Float64Array(perm).map(v => grad4[(v % 32) * 4]);
    const permGrad4y = new Float64Array(perm).map(v => grad4[(v % 32) * 4 + 1]);
    const permGrad4z = new Float64Array(perm).map(v => grad4[(v % 32) * 4 + 2]);
    const permGrad4w = new Float64Array(perm).map(v => grad4[(v % 32) * 4 + 3]);
    return function noise4D(x, y, z, w) {
        let n0, n1, n2, n3, n4; // Noise contributions from the five corners
        // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
        const s = (x + y + z + w) * F4; // Factor for 4D skewing
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const k = fastFloor(z + s);
        const l = fastFloor(w + s);
        const t = (i + j + k + l) * G4; // Factor for 4D unskewing
        const X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
        const Y0 = j - t;
        const Z0 = k - t;
        const W0 = l - t;
        const x0 = x - X0; // The x,y,z,w distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        const w0 = w - W0;
        // For the 4D case, the simplex is a 4D shape I won't even try to describe.
        // To find out which of the 24 possible simplices we're in, we need to
        // determine the magnitude ordering of x0, y0, z0 and w0.
        // Six pair-wise comparisons are performed between each possible pair
        // of the four coordinates, and the results are used to rank the numbers.
        let rankx = 0;
        let ranky = 0;
        let rankz = 0;
        let rankw = 0;
        if (x0 > y0)
            rankx++;
        else
            ranky++;
        if (x0 > z0)
            rankx++;
        else
            rankz++;
        if (x0 > w0)
            rankx++;
        else
            rankw++;
        if (y0 > z0)
            ranky++;
        else
            rankz++;
        if (y0 > w0)
            ranky++;
        else
            rankw++;
        if (z0 > w0)
            rankz++;
        else
            rankw++;
        // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
        // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
        // impossible. Only the 24 indices which have non-zero entries make any sense.
        // We use a thresholding to set the coordinates in turn from the largest magnitude.
        // Rank 3 denotes the largest coordinate.
        // Rank 2 denotes the second largest coordinate.
        // Rank 1 denotes the second smallest coordinate.
        // The integer offsets for the second simplex corner
        const i1 = rankx >= 3 ? 1 : 0;
        const j1 = ranky >= 3 ? 1 : 0;
        const k1 = rankz >= 3 ? 1 : 0;
        const l1 = rankw >= 3 ? 1 : 0;
        // The integer offsets for the third simplex corner
        const i2 = rankx >= 2 ? 1 : 0;
        const j2 = ranky >= 2 ? 1 : 0;
        const k2 = rankz >= 2 ? 1 : 0;
        const l2 = rankw >= 2 ? 1 : 0;
        // The integer offsets for the fourth simplex corner
        const i3 = rankx >= 1 ? 1 : 0;
        const j3 = ranky >= 1 ? 1 : 0;
        const k3 = rankz >= 1 ? 1 : 0;
        const l3 = rankw >= 1 ? 1 : 0;
        // The fifth corner has all coordinate offsets = 1, so no need to compute that.
        const x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
        const y1 = y0 - j1 + G4;
        const z1 = z0 - k1 + G4;
        const w1 = w0 - l1 + G4;
        const x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
        const y2 = y0 - j2 + 2.0 * G4;
        const z2 = z0 - k2 + 2.0 * G4;
        const w2 = w0 - l2 + 2.0 * G4;
        const x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
        const y3 = y0 - j3 + 3.0 * G4;
        const z3 = z0 - k3 + 3.0 * G4;
        const w3 = w0 - l3 + 3.0 * G4;
        const x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
        const y4 = y0 - 1.0 + 4.0 * G4;
        const z4 = z0 - 1.0 + 4.0 * G4;
        const w4 = w0 - 1.0 + 4.0 * G4;
        // Work out the hashed gradient indices of the five simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        const ll = l & 255;
        // Calculate the contribution from the five corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = ii + perm[jj + perm[kk + perm[ll]]];
            t0 *= t0;
            n0 = t0 * t0 * (permGrad4x[gi0] * x0 + permGrad4y[gi0] * y0 + permGrad4z[gi0] * z0 + permGrad4w[gi0] * w0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]];
            t1 *= t1;
            n1 = t1 * t1 * (permGrad4x[gi1] * x1 + permGrad4y[gi1] * y1 + permGrad4z[gi1] * z1 + permGrad4w[gi1] * w1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]];
            t2 *= t2;
            n2 = t2 * t2 * (permGrad4x[gi2] * x2 + permGrad4y[gi2] * y2 + permGrad4z[gi2] * z2 + permGrad4w[gi2] * w2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]];
            t3 *= t3;
            n3 = t3 * t3 * (permGrad4x[gi3] * x3 + permGrad4y[gi3] * y3 + permGrad4z[gi3] * z3 + permGrad4w[gi3] * w3);
        }
        let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
        if (t4 < 0)
            n4 = 0.0;
        else {
            const gi4 = ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]];
            t4 *= t4;
            n4 = t4 * t4 * (permGrad4x[gi4] * x4 + permGrad4y[gi4] * y4 + permGrad4z[gi4] * z4 + permGrad4w[gi4] * w4);
        }
        // Sum up and scale the result to cover the range [-1,1]
        return 27.0 * (n0 + n1 + n2 + n3 + n4);
    };
}
/**
 * Builds a random permutation table.
 * This is exported only for (internal) testing purposes.
 * Do not rely on this export.
 * @private
 */
function buildPermutationTable(random) {
    const tableSize = 512;
    const p = new Uint8Array(tableSize);
    for (let i = 0; i < tableSize / 2; i++) {
        p[i] = i;
    }
    for (let i = 0; i < tableSize / 2 - 1; i++) {
        const r = i + ~~(random() * (256 - i));
        const aux = p[i];
        p[i] = p[r];
        p[r] = aux;
    }
    for (let i = 256; i < tableSize; i++) {
        p[i] = p[i - 256];
    }
    return p;
}
//# sourceMappingURL=simplex-noise.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _terrain_terrain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terrain/terrain */ "./src/terrain/terrain.ts");
/* harmony import */ var _inputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputHandler */ "./src/inputHandler.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/config.ts");



const screenDimension = _config__WEBPACK_IMPORTED_MODULE_2__.config.screenDimension;
const mainCanvas = document.getElementById('main-canvas');
mainCanvas.width = screenDimension[0];
mainCanvas.height = screenDimension[1];
const ctx = mainCanvas.getContext('2d');
console.log("hello world");
let speedX = 5;
let speedY = 5;
let pos = [screenDimension[0], 0];
const inputHandler = new _inputHandler__WEBPACK_IMPORTED_MODULE_1__.InputHandler();
const terrain = new _terrain_terrain__WEBPACK_IMPORTED_MODULE_0__.Terrain(ctx);
const update = () => {
    if (inputHandler.isKeyDown('a'))
        pos[0] -= speedX;
    if (inputHandler.isKeyDown('d'))
        pos[0] += speedX;
    if (inputHandler.isKeyDown('w'))
        pos[1] += speedY;
    if (inputHandler.isKeyDown('s'))
        pos[1] -= speedY;
    terrain.update(pos);
    // console.log(pos, terrain.chunks);
    // console.log(pos, terrain.getChunkFromX(pos[0]))
};
const render = () => {
    ctx.clearRect(0, 0, screenDimension[0], screenDimension[1]);
    terrain.render(pos);
    terrain.renderDev(pos);
};
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
};
loop();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBVSxDQUFDO0FBQ2xILE1BQU0sVUFBVSxHQUFHLENBQUMsRUFBWSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXZHLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7SUFDcEMsT0FBTztRQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUM7UUFDeEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDN0MsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QyxJQUFJLE1BQU0sQ0FBQztJQUVqRCxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXBCLG9DQUFvQztJQUNwQyxrREFBa0Q7QUFDdEQsQ0FBQztBQUVELE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRUQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQUN6QixXQUFXLENBQUMsR0FBRyxFQUFFO0lBQ2IsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7SUFDM0QsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVULE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUNkLGdCQUFnQixJQUFJLENBQUMsQ0FBQztJQUN0QixNQUFNLEVBQUUsQ0FBQztJQUNULE1BQU0sRUFBRSxDQUFDO0lBQ1QscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUNELElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGJydC8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcGJydC8uL3NyYy9pbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGJydC8uL3NyYy9sYXllcnMvMC1za3kudHMiLCJ3ZWJwYWNrOi8vcGJydC8uL3NyYy9sYXllcnMvMTAtYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9wYnJ0Ly4vc3JjL2xheWVycy8yMC1ncm91bmQudHMiLCJ3ZWJwYWNrOi8vcGJydC8uL3NyYy90ZXJyYWluL2NodW5rLnRzIiwid2VicGFjazovL3BicnQvLi9zcmMvdGVycmFpbi90ZXJyYWluLnRzIiwid2VicGFjazovL3BicnQvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9wYnJ0Ly4vbm9kZV9tb2R1bGVzL3NpbXBsZXgtbm9pc2UvZGlzdC9lc20vc2ltcGxleC1ub2lzZS5qcyIsIndlYnBhY2s6Ly9wYnJ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BicnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BicnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wYnJ0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGJydC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gICAgc2NyZWVuRGltZW5zaW9uOiBbMTI4MCwgNzIwXSxcclxuICAgIGNodW5rV2lkdGg6IDMwMCxcclxuICAgIHBpeGVsU2l6ZTogMTAsXHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIElucHV0SGFuZGxlciB7XHJcbiAgICBhY3RpdmVLZXlzOiBNYXA8c3RyaW5nLCBib29sZWFuPjtcclxuICAgIGlzS2V5RG93bihrZXk6IHN0cmluZyk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dEhhbmRsZXIge1xyXG4gICAgYWN0aXZlS2V5czogTWFwPHN0cmluZywgYm9vbGVhbj47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZUtleXMgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlS2V5cy5zZXQoZS5rZXksIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0aXZlS2V5cy5oYXMoZS5rZXkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlS2V5cy5kZWxldGUoZS5rZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNLZXlEb3duKGtleSA6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlS2V5cy5oYXMoa2V5KTtcclxuICAgIH1cclxufSAiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSBcIi4uL3RlcnJhaW4vbGF5ZXJcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBDaHVuayB9IGZyb20gXCIuLi90ZXJyYWluL2NodW5rXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2t5MUxheWVyIGltcGxlbWVudHMgTGF5ZXIge1xyXG4gICAgY2h1bmtQYXJlbnQ6IENodW5rO1xyXG4gICAgY2FjaGVkSW1hZ2U6IEltYWdlRGF0YTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoY2h1bmtQYXJlbnQ6IENodW5rKXtcclxuICAgICAgICB0aGlzLmNodW5rUGFyZW50ID0gY2h1bmtQYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRJbWFnZSA9IGNodW5rUGFyZW50LmN0eC5jcmVhdGVJbWFnZURhdGEoY29uZmlnLmNodW5rV2lkdGgsIGNvbmZpZy5zY3JlZW5EaW1lbnNpb25bMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShwb3M6IFBvaW50KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihwb3M6IFBvaW50KSB7XHJcbiAgICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLmNodW5rUGFyZW50O1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlU3RhcnRYID0gY2h1bmsuc3RhcnRYIC0gcG9zWzBdO1xyXG5cclxuICAgICAgICBjaHVuay5jdHguZmlsbFN0eWxlID0gYCM0ZmIzZThgO1xyXG4gICAgICAgIGNodW5rLmN0eC5maWxsUmVjdChyZWxhdGl2ZVN0YXJ0WCwgMCwgY29uZmlnLmNodW5rV2lkdGgsIGNvbmZpZy5zY3JlZW5EaW1lbnNpb25bMV0pO1xyXG5cclxuICAgICAgICBjb25zdCBiY3R4ID0gdGhpcy5jaHVua1BhcmVudC50ZXJyYWluUGFyZW50LmJ1ZmZlckN0eDtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbG9yLCBsZXJwQ29sb3IsIFBvaW50LCB0cmlwbGUySGV4IH0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwiLi4vdGVycmFpbi9sYXllclwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IENodW5rIH0gZnJvbSBcIi4uL3RlcnJhaW4vY2h1bmtcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kMUxheWVyIGltcGxlbWVudHMgTGF5ZXIge1xyXG4gICAgY2h1bmtQYXJlbnQ6IENodW5rO1xyXG4gICAgc3VyZmFjZVBvaW50czogUG9pbnRbXTtcclxuICAgIHN1cmZhY2VDb2xvcnM6IENvbG9yW107XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGNodW5rUGFyZW50OiBDaHVuayl7XHJcbiAgICAgICAgdGhpcy5jaHVua1BhcmVudCA9IGNodW5rUGFyZW50O1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZVBvaW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZUNvbG9ycyA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMuY2h1bmtQYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgY29sb3IxOiBDb2xvciA9IFs1NywgMTQ2LCAxOTNdO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yMjogQ29sb3IgPSBbNTQsIDIwMSwgMTQxXTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY29uZmlnLmNodW5rV2lkdGg7IGkgKz0gY29uZmlnLnBpeGVsU2l6ZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1ckNvbG9yID0gbGVycENvbG9yKFxyXG4gICAgICAgICAgICAgICAgY29sb3IxLCBjb2xvcjIsXHJcbiAgICAgICAgICAgICAgICBjaHVuay50ZXJyYWluUGFyZW50Lm5vaXNlMkQoKGNodW5rLnN0YXJ0WCArIGkgKyAxMCkgKiAwLjAwMDUsIDUpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBub2lzZUZ1bmMgPSBjaHVuay50ZXJyYWluUGFyZW50Lm5vaXNlMkQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHlMZXZlbCA9IDIwMCArIG5vaXNlRnVuYygoY2h1bmsuc3RhcnRYICsgaSArIDEwKSAqIDAuMDAxLCAxKSAqIDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgbm9pc2VGdW5jKChjaHVuay5zdGFydFggKyBpKSAqIDAuMDA1LCAxNikgKiAxMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gbm9pc2VGdW5jKChjaHVuay5zdGFydFggKyBpKSAqIDAuMSwgOCkgKiA1O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdXJmYWNlUG9pbnRzLnB1c2goW2ksIHlMZXZlbF0pO1xyXG4gICAgICAgICAgICB0aGlzLnN1cmZhY2VDb2xvcnMucHVzaChjdXJDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShwb3M6IFBvaW50KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihwb3M6IFBvaW50KSB7XHJcbiAgICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLmNodW5rUGFyZW50O1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlU3RhcnRYID0gY2h1bmsuc3RhcnRYIC0gcG9zWzBdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdXJmYWNlUG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgY29uc3QgcCA9IHRoaXMuc3VyZmFjZVBvaW50c1tpXTtcclxuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuc3VyZmFjZUNvbG9yc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGNodW5rLmN0eC5maWxsU3R5bGUgPSB0cmlwbGUySGV4KGMpO1xyXG4gICAgICAgICAgICBjaHVuay5jdHguZmlsbFJlY3QoXHJcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVN0YXJ0WCArIHBbMF0sIFxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnNjcmVlbkRpbWVuc2lvblsxXSAtIHBbMV0gKyBwb3NbMV0gKyAwLCBcclxuICAgICAgICAgICAgICAgIDMwLCBcclxuICAgICAgICAgICAgICAgIHBbMV1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb2xvciwgbGVycENvbG9yLCBQb2ludCwgdHJpcGxlMkhleCB9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSBcIi4uL3RlcnJhaW4vdGVycmFpblwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IENodW5rIH0gZnJvbSBcIi4uL3RlcnJhaW4vY2h1bmtcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcm91bmRMYXllciBpbXBsZW1lbnRzIExheWVyIHtcclxuICAgIGNodW5rUGFyZW50OiBDaHVuaztcclxuICAgIHN1cmZhY2VQb2ludHM6IFBvaW50W107XHJcbiAgICBzdXJmYWNlQ29sb3JzOiBDb2xvcltdO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihjaHVua1BhcmVudDogQ2h1bmspe1xyXG4gICAgICAgIHRoaXMuY2h1bmtQYXJlbnQgPSBjaHVua1BhcmVudDtcclxuICAgICAgICB0aGlzLnN1cmZhY2VQb2ludHMgPSBbXTtcclxuICAgICAgICB0aGlzLnN1cmZhY2VDb2xvcnMgPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMuY2h1bmtQYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgY29sb3IxOiBDb2xvciA9IFs0OSwgMTQ2LCA1NV07XHJcbiAgICAgICAgY29uc3QgY29sb3IyOiBDb2xvciA9IFs1MCwgMjAxLCA3Ml07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNvbmZpZy5jaHVua1dpZHRoOyBpICs9IGNvbmZpZy5waXhlbFNpemUpe1xyXG4gICAgICAgICAgICBjb25zdCBjdXJDb2xvciA9IGxlcnBDb2xvcihcclxuICAgICAgICAgICAgICAgIGNvbG9yMSwgY29sb3IyLFxyXG4gICAgICAgICAgICAgICAgY2h1bmsudGVycmFpblBhcmVudC5ub2lzZTJEKChjaHVuay5zdGFydFggKyBpICsgMTApICogMC4wMDA3LCA1KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb25zdCBub2lzZUZ1bmMgPSBjaHVuay50ZXJyYWluUGFyZW50Lm5vaXNlMkQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHlMZXZlbCA9IDEwMCArIG5vaXNlRnVuYygoY2h1bmsuc3RhcnRYICsgaSkgKiAwLjAwMSwgNSkgKiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIG5vaXNlRnVuYygoY2h1bmsuc3RhcnRYICsgaSkgKiAwLjAwNSwgMTYpICogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIG5vaXNlRnVuYygoY2h1bmsuc3RhcnRYICsgaSkgKiAwLjEsIDgpICogNTtcclxuICAgICAgICAgICAgdGhpcy5zdXJmYWNlUG9pbnRzLnB1c2goW2ksIHlMZXZlbF0pO1xyXG4gICAgICAgICAgICB0aGlzLnN1cmZhY2VDb2xvcnMucHVzaChjdXJDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShwb3M6IFBvaW50KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihwb3M6IFBvaW50KSB7XHJcbiAgICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLmNodW5rUGFyZW50O1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlU3RhcnRYID0gY2h1bmsuc3RhcnRYIC0gcG9zWzBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnN1cmZhY2VQb2ludHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjb25zdCBwID0gdGhpcy5zdXJmYWNlUG9pbnRzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5zdXJmYWNlQ29sb3JzW2ldO1xyXG5cclxuICAgICAgICAgICAgY2h1bmsuY3R4LmZpbGxTdHlsZSA9IHRyaXBsZTJIZXgoYyk7XHJcbiAgICAgICAgICAgIGNodW5rLmN0eC5maWxsUmVjdChcclxuICAgICAgICAgICAgICAgIHJlbGF0aXZlU3RhcnRYICsgcFswXSwgXHJcbiAgICAgICAgICAgICAgICBjb25maWcuc2NyZWVuRGltZW5zaW9uWzFdIC0gcFsxXSArIHBvc1sxXSArIDAsIFxyXG4gICAgICAgICAgICAgICAgMzAsIFxyXG4gICAgICAgICAgICAgICAgcFsxXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHsgU2t5MUxheWVyIH0gZnJvbSBcIi4uL2xheWVycy8wLXNreVwiO1xyXG5pbXBvcnQgeyBCYWNrZ3JvdW5kMUxheWVyIH0gZnJvbSBcIi4uL2xheWVycy8xMC1iYWNrZ3JvdW5kXCI7XHJcbmltcG9ydCB7IEdyb3VuZExheWVyIH0gZnJvbSBcIi4uL2xheWVycy8yMC1ncm91bmRcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gXCIuL2xheWVyXCI7XHJcbmltcG9ydCB7IFRlcnJhaW4gfSBmcm9tIFwiLi90ZXJyYWluXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2h1bmsge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIHN0YXJ0WDogbnVtYmVyO1xyXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICB0ZXJyYWluUGFyZW50OiBUZXJyYWluO1xyXG4gICAgbGF5ZXJzOiBMYXllcltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB0ZXJyYWluOiBUZXJyYWluKXtcclxuICAgICAgICB0aGlzLnRlcnJhaW5QYXJlbnQgPSB0ZXJyYWluO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnN0YXJ0WCA9IHRoaXMuaWQgKiBjb25maWcuY2h1bmtXaWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5sYXllcnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBTa3kxTGF5ZXIodGhpcyksXHJcbiAgICAgICAgICAgIG5ldyBCYWNrZ3JvdW5kMUxheWVyKHRoaXMpLFxyXG4gICAgICAgICAgICBuZXcgR3JvdW5kTGF5ZXIodGhpcylcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihwb3M6IFBvaW50KXtcclxuICAgICAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IGxheWVyLnJlbmRlcihwb3MpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWxhdGl2ZVN0YXJ0WShwb3M6IFBvaW50LCB5OiBudW1iZXIsIG9iamVjdEhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gY29uZmlnLnNjcmVlbkRpbWVuc2lvblsxXSArIHBvc1sxXSAtIHkgLSBvYmplY3RIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRGV2KFxyXG4gICAgICAgIHBvczogUG9pbnQsIFxyXG4gICAgICAgIGJvdW5kczogYm9vbGVhbiA9IHRydWUsXHJcbiAgICAgICAgZ3JpZDogYm9vbGVhbiA9IHRydWVcclxuICAgICl7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVTdGFydFggPSB0aGlzLnN0YXJ0WCAtIHBvc1swXTtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVN0YXJ0WSA9IHBvc1sxXTsgLy8gYm90dG9tIG9mIGNodW5rXHJcblxyXG4gICAgICAgIGlmKGJvdW5kcyl7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gYCM0NDQ0NDRgO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHJlbGF0aXZlU3RhcnRYLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHJlbGF0aXZlU3RhcnRYLCBjb25maWcuc2NyZWVuRGltZW5zaW9uWzFdKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZ3JpZFJlc29sdXRpb24gPSA1MDtcclxuICAgICAgICBpZihncmlkKXtcclxuICAgICAgICAgICAgZm9yKGxldCB4ID0gcmVsYXRpdmVTdGFydFg7IHggPD0gcmVsYXRpdmVTdGFydFggKyBjb25maWcuY2h1bmtXaWR0aDsgeCArPSBncmlkUmVzb2x1dGlvbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGAjYWFhYWFhNjZgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgY29uZmlnLnNjcmVlbkRpbWVuc2lvblsxXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gcmVsYXRpdmVTdGFydFkgJSBncmlkUmVzb2x1dGlvbjtcclxuICAgICAgICAgICAgZm9yKGxldCB5ID0geU9mZnNldDsgeSA8PSB5T2Zmc2V0ICsgY29uZmlnLnNjcmVlbkRpbWVuc2lvblsxXTsgeSArPSBncmlkUmVzb2x1dGlvbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGAjYWFhYWFhNjZgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oY29uZmlnLnNjcmVlbkRpbWVuc2lvblswXSwgeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQkJveCwgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbFwiXHJcbmltcG9ydCB7IGNyZWF0ZU5vaXNlMkQgfSBmcm9tICdzaW1wbGV4LW5vaXNlJztcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBDaHVuayB9IGZyb20gXCIuL2NodW5rXCI7XHJcblxyXG4vLyBjaHVua3Mgc3RhcnQgYXQgMCwgbGVmdCB0byByaWdodCAtLSBubyBuZWdhdGl2ZVxyXG5cclxuZXhwb3J0IGNsYXNzIFRlcnJhaW4ge1xyXG4gICAgY2h1bmtzOiBNYXA8bnVtYmVyLCBDaHVuaz47XHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbiAgICBidWZmZXJDaHVua0NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBidWZmZXJDdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbiAgICBub2lzZTJEOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICAgICAgdGhpcy5jaHVua3MgPSBuZXcgTWFwPG51bWJlciwgQ2h1bms+KCk7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICAgICAgdGhpcy5ub2lzZTJEID0gY3JlYXRlTm9pc2UyRCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1ZmZlckNodW5rQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgdGhpcy5idWZmZXJDaHVua0NhbnZhcy53aWR0aCA9IGNvbmZpZy5jaHVua1dpZHRoO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyQ2h1bmtDYW52YXMuaGVpZ2h0ID0gY29uZmlnLnNjcmVlbkRpbWVuc2lvblsxXTtcclxuICAgICAgICB0aGlzLmJ1ZmZlckN0eCA9IHRoaXMuYnVmZmVyQ2h1bmtDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBvczogUG9pbnQpe1xyXG4gICAgICAgIGNvbnN0IG5ld0NodW5rcyA9IHRoaXMuY2hlY2tHZW5lcmF0ZU5ld0NodW5rcyhwb3MpO1xyXG4gICAgICAgIGlmKG5ld0NodW5rcy5sZW5ndGggPiAwKSBuZXdDaHVua3MuZm9yRWFjaChpID0+IHRoaXMuZ2VuZXJhdGVDaHVuayhpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tHZW5lcmF0ZU5ld0NodW5rcyhwb3M6IFBvaW50KSA6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCB2aXNpYmxlQ2h1bmtzID0gdGhpcy5nZXRWaXNpYmxlQ2h1bmtJbmRpY2VzKHBvcyk7XHJcbiAgICAgICAgY29uc3QgbWlzc2luZ0NodW5rcyA9IHZpc2libGVDaHVua3MuZmlsdGVyKChpKSA9PiAhdGhpcy5jaHVua3MuaGFzKGkpKVxyXG4gICAgICAgIHJldHVybiBtaXNzaW5nQ2h1bmtzO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlQ2h1bmsoaTogbnVtYmVyKXtcclxuICAgICAgICBjb25zdCBjID0gbmV3IENodW5rKGksIHRoaXMuY3R4LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNodW5rcy5zZXQoaSwgYyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFZpZXdwb3J0KHBvczogUG9pbnQpIDogQkJveCB7XHJcbiAgICAgICAgY29uc3QgbWluWCA9IHBvc1swXSAtIGNvbmZpZy5zY3JlZW5EaW1lbnNpb25bMF07XHJcbiAgICAgICAgY29uc3QgbWF4WCA9IHBvc1swXSArIGNvbmZpZy5zY3JlZW5EaW1lbnNpb25bMF07XHJcbiAgICAgICAgY29uc3QgbWluWSA9IHBvc1sxXSAtIGNvbmZpZy5zY3JlZW5EaW1lbnNpb25bMV07XHJcbiAgICAgICAgY29uc3QgbWF4WSA9IHBvc1sxXSArIGNvbmZpZy5zY3JlZW5EaW1lbnNpb25bMV07XHJcbiAgICAgICAgY29uc3QgYmJveCA6IEJCb3ggPSBbbWluWCwgbWF4WCwgbWluWSwgbWF4WV07XHJcbiAgICAgICAgcmV0dXJuIGJib3g7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2h1bmtGcm9tWCh4OiBudW1iZXIpe1xyXG4gICAgICAgIHJldHVybiB4IC8gY29uZmlnLmNodW5rV2lkdGggfCAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZpc2libGVDaHVua0luZGljZXMocG9zIDogUG9pbnQpe1xyXG4gICAgICAgIGNvbnN0IGJib3ggPSB0aGlzLmdldEN1cnJlbnRWaWV3cG9ydChwb3MpO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0Q2h1bmtJbmRleCA9IHRoaXMuZ2V0Q2h1bmtGcm9tWChiYm94WzBdKTtcclxuICAgICAgICBjb25zdCBlbmRDaHVua0luZGV4ID0gdGhpcy5nZXRDaHVua0Zyb21YKGJib3hbMV0pO1xyXG5cclxuICAgICAgICBjb25zdCB2aXNpYmxlQ2h1bmtzID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gc3RhcnRDaHVua0luZGV4OyBpIDw9IGVuZENodW5rSW5kZXg7IGkrKykgdmlzaWJsZUNodW5rcy5wdXNoKGkpO1xyXG4gICAgICAgIHJldHVybiB2aXNpYmxlQ2h1bmtzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihwb3M6IFBvaW50KXtcclxuICAgICAgICB0aGlzLmdldFZpc2libGVDaHVua0luZGljZXMocG9zKVxyXG4gICAgICAgICAgICAuZm9yRWFjaChpbmRleCA9PiB0aGlzLmNodW5rcy5nZXQoaW5kZXgpPy5yZW5kZXIocG9zKSk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHJlbmRlckRldihwb3M6IFBvaW50KXtcclxuICAgICAgICB0aGlzLmdldFZpc2libGVDaHVua0luZGljZXMocG9zKVxyXG4gICAgICAgIC5mb3JFYWNoKGluZGV4ID0+IHRoaXMuY2h1bmtzLmdldChpbmRleCk/LnJlbmRlckRldihwb3MpKTtcclxuICAgIH1cclxufSIsImV4cG9ydCB0eXBlIFBvaW50ID0gW251bWJlciwgbnVtYmVyXTtcclxuZXhwb3J0IHR5cGUgQ29sb3IgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcbmV4cG9ydCB0eXBlIEJCb3ggPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuXHJcbmV4cG9ydCBjb25zdCBsZXJwQ29sb3IgPSAoYzE6IENvbG9yLCBjMjogQ29sb3IsIHQ6IG51bWJlcikgOiBDb2xvciA9PiBjMS5tYXAoKG4sIGkpID0+IHQgKiBuICsgKDEgLSB0KSAqIGMyW2ldKSBhcyBDb2xvcjtcclxuZXhwb3J0IGNvbnN0IHRyaXBsZTJIZXggPSAoYzE6IG51bWJlcltdKSA9PiAnIycgKyBjMS5tYXAobiA9PiAobiB8IDApLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpKS5qb2luKCcnKTtcclxuXHJcbmV4cG9ydCBjb25zdCBtdWxiZXJyeTMyID0gKGE6IG51bWJlcikgPT4ge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdCA9IGEgKz0gMHg2RDJCNzlGNTtcclxuICAgICAgdCA9IE1hdGguaW11bCh0IF4gdCA+Pj4gMTUsIHQgfCAxKTtcclxuICAgICAgdCBePSB0ICsgTWF0aC5pbXVsKHQgXiB0ID4+PiA3LCB0IHwgNjEpO1xyXG4gICAgICByZXR1cm4gKCh0IF4gdCA+Pj4gMTQpID4+PiAwKSAvIDQyOTQ5NjcyOTY7XHJcbiAgICB9XHJcbn0iLCIvKlxuICogQSBmYXN0IGphdmFzY3JpcHQgaW1wbGVtZW50YXRpb24gb2Ygc2ltcGxleCBub2lzZSBieSBKb25hcyBXYWduZXJcblxuQmFzZWQgb24gYSBzcGVlZC1pbXByb3ZlZCBzaW1wbGV4IG5vaXNlIGFsZ29yaXRobSBmb3IgMkQsIDNEIGFuZCA0RCBpbiBKYXZhLlxuV2hpY2ggaXMgYmFzZWQgb24gZXhhbXBsZSBjb2RlIGJ5IFN0ZWZhbiBHdXN0YXZzb24gKHN0ZWd1QGl0bi5saXUuc2UpLlxuV2l0aCBPcHRpbWlzYXRpb25zIGJ5IFBldGVyIEVhc3RtYW4gKHBlYXN0bWFuQGRyaXp6bGUuc3RhbmZvcmQuZWR1KS5cbkJldHRlciByYW5rIG9yZGVyaW5nIG1ldGhvZCBieSBTdGVmYW4gR3VzdGF2c29uIGluIDIwMTIuXG5cbiBDb3B5cmlnaHQgKGMpIDIwMjIgSm9uYXMgV2FnbmVyXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuLy8gdGhlc2UgI19fUFVSRV9fIGNvbW1lbnRzIGhlbHAgdWdsaWZ5anMgd2l0aCBkZWFkIGNvZGUgcmVtb3ZhbFxuLy8gXG5jb25zdCBGMiA9IC8qI19fUFVSRV9fKi8gMC41ICogKE1hdGguc3FydCgzLjApIC0gMS4wKTtcbmNvbnN0IEcyID0gLyojX19QVVJFX18qLyAoMy4wIC0gTWF0aC5zcXJ0KDMuMCkpIC8gNi4wO1xuY29uc3QgRjMgPSAxLjAgLyAzLjA7XG5jb25zdCBHMyA9IDEuMCAvIDYuMDtcbmNvbnN0IEY0ID0gLyojX19QVVJFX18qLyAoTWF0aC5zcXJ0KDUuMCkgLSAxLjApIC8gNC4wO1xuY29uc3QgRzQgPSAvKiNfX1BVUkVfXyovICg1LjAgLSBNYXRoLnNxcnQoNS4wKSkgLyAyMC4wO1xuLy8gSSdtIHJlYWxseSBub3Qgc3VyZSB3aHkgdGhpcyB8IDAgKGJhc2ljYWxseSBhIGNvZXJjaW9uIHRvIGludClcbi8vIGlzIG1ha2luZyB0aGlzIGZhc3RlciBidXQgSSBnZXQgfjUgbWlsbGlvbiBvcHMvc2VjIG1vcmUgb24gdGhlXG4vLyBiZW5jaG1hcmtzIGFjcm9zcyB0aGUgYm9hcmQgb3IgYSB+MTAlIHNwZWVkdXAuXG5jb25zdCBmYXN0Rmxvb3IgPSAoeCkgPT4gTWF0aC5mbG9vcih4KSB8IDA7XG5jb25zdCBncmFkMiA9IC8qI19fUFVSRV9fKi8gbmV3IEZsb2F0NjRBcnJheShbMSwgMSxcbiAgICAtMSwgMSxcbiAgICAxLCAtMSxcbiAgICAtMSwgLTEsXG4gICAgMSwgMCxcbiAgICAtMSwgMCxcbiAgICAxLCAwLFxuICAgIC0xLCAwLFxuICAgIDAsIDEsXG4gICAgMCwgLTEsXG4gICAgMCwgMSxcbiAgICAwLCAtMV0pO1xuLy8gZG91YmxlIHNlZW1zIHRvIGJlIGZhc3RlciB0aGFuIHNpbmdsZSBvciBpbnQnc1xuLy8gcHJvYmFibHkgYmVjYXVzZSBtb3N0IG9wZXJhdGlvbnMgYXJlIGluIGRvdWJsZSBwcmVjaXNpb25cbmNvbnN0IGdyYWQzID0gLyojX19QVVJFX18qLyBuZXcgRmxvYXQ2NEFycmF5KFsxLCAxLCAwLFxuICAgIC0xLCAxLCAwLFxuICAgIDEsIC0xLCAwLFxuICAgIC0xLCAtMSwgMCxcbiAgICAxLCAwLCAxLFxuICAgIC0xLCAwLCAxLFxuICAgIDEsIDAsIC0xLFxuICAgIC0xLCAwLCAtMSxcbiAgICAwLCAxLCAxLFxuICAgIDAsIC0xLCAxLFxuICAgIDAsIDEsIC0xLFxuICAgIDAsIC0xLCAtMV0pO1xuLy8gZG91YmxlIGlzIGEgYml0IHF1aWNrZXIgaGVyZSBhcyB3ZWxsXG5jb25zdCBncmFkNCA9IC8qI19fUFVSRV9fKi8gbmV3IEZsb2F0NjRBcnJheShbMCwgMSwgMSwgMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAxLCAwLCAxLCAtMSwgLTEsXG4gICAgMCwgLTEsIDEsIDEsIDAsIC0xLCAxLCAtMSwgMCwgLTEsIC0xLCAxLCAwLCAtMSwgLTEsIC0xLFxuICAgIDEsIDAsIDEsIDEsIDEsIDAsIDEsIC0xLCAxLCAwLCAtMSwgMSwgMSwgMCwgLTEsIC0xLFxuICAgIC0xLCAwLCAxLCAxLCAtMSwgMCwgMSwgLTEsIC0xLCAwLCAtMSwgMSwgLTEsIDAsIC0xLCAtMSxcbiAgICAxLCAxLCAwLCAxLCAxLCAxLCAwLCAtMSwgMSwgLTEsIDAsIDEsIDEsIC0xLCAwLCAtMSxcbiAgICAtMSwgMSwgMCwgMSwgLTEsIDEsIDAsIC0xLCAtMSwgLTEsIDAsIDEsIC0xLCAtMSwgMCwgLTEsXG4gICAgMSwgMSwgMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAxLCAwLCAxLCAtMSwgLTEsIDAsXG4gICAgLTEsIDEsIDEsIDAsIC0xLCAxLCAtMSwgMCwgLTEsIC0xLCAxLCAwLCAtMSwgLTEsIC0xLCAwXSk7XG4vKipcbiAqIENyZWF0ZXMgYSAyRCBub2lzZSBmdW5jdGlvblxuICogQHBhcmFtIHJhbmRvbSB0aGUgcmFuZG9tIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGJ1aWxkIHRoZSBwZXJtdXRhdGlvbiB0YWJsZVxuICogQHJldHVybnMge05vaXNlRnVuY3Rpb24yRH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vaXNlMkQocmFuZG9tID0gTWF0aC5yYW5kb20pIHtcbiAgICBjb25zdCBwZXJtID0gYnVpbGRQZXJtdXRhdGlvblRhYmxlKHJhbmRvbSk7XG4gICAgLy8gcHJlY2FsY3VsYXRpbmcgdGhpcyB5aWVsZHMgYSBsaXR0bGUgfjMlIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50LlxuICAgIGNvbnN0IHBlcm1HcmFkMnggPSBuZXcgRmxvYXQ2NEFycmF5KHBlcm0pLm1hcCh2ID0+IGdyYWQyWyh2ICUgMTIpICogMl0pO1xuICAgIGNvbnN0IHBlcm1HcmFkMnkgPSBuZXcgRmxvYXQ2NEFycmF5KHBlcm0pLm1hcCh2ID0+IGdyYWQyWyh2ICUgMTIpICogMiArIDFdKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gbm9pc2UyRCh4LCB5KSB7XG4gICAgICAgIC8vIGlmKCFpc0Zpbml0ZSh4KSB8fCAhaXNGaW5pdGUoeSkpIHJldHVybiAwO1xuICAgICAgICBsZXQgbjAgPSAwOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgICAgbGV0IG4xID0gMDtcbiAgICAgICAgbGV0IG4yID0gMDtcbiAgICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxuICAgICAgICBjb25zdCBzID0gKHggKyB5KSAqIEYyOyAvLyBIYWlyeSBmYWN0b3IgZm9yIDJEXG4gICAgICAgIGNvbnN0IGkgPSBmYXN0Rmxvb3IoeCArIHMpO1xuICAgICAgICBjb25zdCBqID0gZmFzdEZsb29yKHkgKyBzKTtcbiAgICAgICAgY29uc3QgdCA9IChpICsgaikgKiBHMjtcbiAgICAgICAgY29uc3QgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkpIHNwYWNlXG4gICAgICAgIGNvbnN0IFkwID0gaiAtIHQ7XG4gICAgICAgIGNvbnN0IHgwID0geCAtIFgwOyAvLyBUaGUgeCx5IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgICBjb25zdCB5MCA9IHkgLSBZMDtcbiAgICAgICAgLy8gRm9yIHRoZSAyRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhbiBlcXVpbGF0ZXJhbCB0cmlhbmdsZS5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxuICAgICAgICBsZXQgaTEsIGoxOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgKG1pZGRsZSkgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaikgY29vcmRzXG4gICAgICAgIGlmICh4MCA+IHkwKSB7XG4gICAgICAgICAgICBpMSA9IDE7XG4gICAgICAgICAgICBqMSA9IDA7XG4gICAgICAgIH0gLy8gbG93ZXIgdHJpYW5nbGUsIFhZIG9yZGVyOiAoMCwwKS0+KDEsMCktPigxLDEpXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgICAgajEgPSAxO1xuICAgICAgICB9IC8vIHVwcGVyIHRyaWFuZ2xlLCBZWCBvcmRlcjogKDAsMCktPigwLDEpLT4oMSwxKVxuICAgICAgICAvLyBBIHN0ZXAgb2YgKDEsMCkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMpIGluICh4LHkpLCBhbmRcbiAgICAgICAgLy8gYSBzdGVwIG9mICgwLDEpIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jKSBpbiAoeCx5KSwgd2hlcmVcbiAgICAgICAgLy8gYyA9ICgzLXNxcnQoMykpLzZcbiAgICAgICAgY29uc3QgeDEgPSB4MCAtIGkxICsgRzI7IC8vIE9mZnNldHMgZm9yIG1pZGRsZSBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG4gICAgICAgIGNvbnN0IHkxID0geTAgLSBqMSArIEcyO1xuICAgICAgICBjb25zdCB4MiA9IHgwIC0gMS4wICsgMi4wICogRzI7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuICAgICAgICBjb25zdCB5MiA9IHkwIC0gMS4wICsgMi4wICogRzI7XG4gICAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgdGhyZWUgc2ltcGxleCBjb3JuZXJzXG4gICAgICAgIGNvbnN0IGlpID0gaSAmIDI1NTtcbiAgICAgICAgY29uc3QgamogPSBqICYgMjU1O1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG4gICAgICAgIGxldCB0MCA9IDAuNSAtIHgwICogeDAgLSB5MCAqIHkwO1xuICAgICAgICBpZiAodDAgPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgZ2kwID0gaWkgKyBwZXJtW2pqXTtcbiAgICAgICAgICAgIGNvbnN0IGcweCA9IHBlcm1HcmFkMnhbZ2kwXTtcbiAgICAgICAgICAgIGNvbnN0IGcweSA9IHBlcm1HcmFkMnlbZ2kwXTtcbiAgICAgICAgICAgIHQwICo9IHQwO1xuICAgICAgICAgICAgLy8gbjAgPSB0MCAqIHQwICogKGdyYWQyW2dpMF0gKiB4MCArIGdyYWQyW2dpMCArIDFdICogeTApOyAvLyAoeCx5KSBvZiBncmFkMyB1c2VkIGZvciAyRCBncmFkaWVudFxuICAgICAgICAgICAgbjAgPSB0MCAqIHQwICogKGcweCAqIHgwICsgZzB5ICogeTApO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0MSA9IDAuNSAtIHgxICogeDEgLSB5MSAqIHkxO1xuICAgICAgICBpZiAodDEgPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgZ2kxID0gaWkgKyBpMSArIHBlcm1bamogKyBqMV07XG4gICAgICAgICAgICBjb25zdCBnMXggPSBwZXJtR3JhZDJ4W2dpMV07XG4gICAgICAgICAgICBjb25zdCBnMXkgPSBwZXJtR3JhZDJ5W2dpMV07XG4gICAgICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgICAgIC8vIG4xID0gdDEgKiB0MSAqIChncmFkMltnaTFdICogeDEgKyBncmFkMltnaTEgKyAxXSAqIHkxKTtcbiAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIChnMXggKiB4MSArIGcxeSAqIHkxKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDIgPSAwLjUgLSB4MiAqIHgyIC0geTIgKiB5MjtcbiAgICAgICAgaWYgKHQyID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdpMiA9IGlpICsgMSArIHBlcm1bamogKyAxXTtcbiAgICAgICAgICAgIGNvbnN0IGcyeCA9IHBlcm1HcmFkMnhbZ2kyXTtcbiAgICAgICAgICAgIGNvbnN0IGcyeSA9IHBlcm1HcmFkMnlbZ2kyXTtcbiAgICAgICAgICAgIHQyICo9IHQyO1xuICAgICAgICAgICAgLy8gbjIgPSB0MiAqIHQyICogKGdyYWQyW2dpMl0gKiB4MiArIGdyYWQyW2dpMiArIDFdICogeTIpO1xuICAgICAgICAgICAgbjIgPSB0MiAqIHQyICogKGcyeCAqIHgyICsgZzJ5ICogeTIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBjb250cmlidXRpb25zIGZyb20gZWFjaCBjb3JuZXIgdG8gZ2V0IHRoZSBmaW5hbCBub2lzZSB2YWx1ZS5cbiAgICAgICAgLy8gVGhlIHJlc3VsdCBpcyBzY2FsZWQgdG8gcmV0dXJuIHZhbHVlcyBpbiB0aGUgaW50ZXJ2YWwgWy0xLDFdLlxuICAgICAgICByZXR1cm4gNzAuMCAqIChuMCArIG4xICsgbjIpO1xuICAgIH07XG59XG4vKipcbiAqIENyZWF0ZXMgYSAzRCBub2lzZSBmdW5jdGlvblxuICogQHBhcmFtIHJhbmRvbSB0aGUgcmFuZG9tIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGJ1aWxkIHRoZSBwZXJtdXRhdGlvbiB0YWJsZVxuICogQHJldHVybnMge05vaXNlRnVuY3Rpb24zRH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vaXNlM0QocmFuZG9tID0gTWF0aC5yYW5kb20pIHtcbiAgICBjb25zdCBwZXJtID0gYnVpbGRQZXJtdXRhdGlvblRhYmxlKHJhbmRvbSk7XG4gICAgLy8gcHJlY2FsY3VsYXRpbmcgdGhlc2Ugc2VlbXMgdG8geWllbGQgYSBzcGVlZHVwIG9mIG92ZXIgMTUlXG4gICAgY29uc3QgcGVybUdyYWQzeCA9IG5ldyBGbG9hdDY0QXJyYXkocGVybSkubWFwKHYgPT4gZ3JhZDNbKHYgJSAxMikgKiAzXSk7XG4gICAgY29uc3QgcGVybUdyYWQzeSA9IG5ldyBGbG9hdDY0QXJyYXkocGVybSkubWFwKHYgPT4gZ3JhZDNbKHYgJSAxMikgKiAzICsgMV0pO1xuICAgIGNvbnN0IHBlcm1HcmFkM3ogPSBuZXcgRmxvYXQ2NEFycmF5KHBlcm0pLm1hcCh2ID0+IGdyYWQzWyh2ICUgMTIpICogMyArIDJdKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gbm9pc2UzRCh4LCB5LCB6KSB7XG4gICAgICAgIGxldCBuMCwgbjEsIG4yLCBuMzsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSBmb3VyIGNvcm5lcnNcbiAgICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxuICAgICAgICBjb25zdCBzID0gKHggKyB5ICsgeikgKiBGMzsgLy8gVmVyeSBuaWNlIGFuZCBzaW1wbGUgc2tldyBmYWN0b3IgZm9yIDNEXG4gICAgICAgIGNvbnN0IGkgPSBmYXN0Rmxvb3IoeCArIHMpO1xuICAgICAgICBjb25zdCBqID0gZmFzdEZsb29yKHkgKyBzKTtcbiAgICAgICAgY29uc3QgayA9IGZhc3RGbG9vcih6ICsgcyk7XG4gICAgICAgIGNvbnN0IHQgPSAoaSArIGogKyBrKSAqIEczO1xuICAgICAgICBjb25zdCBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSx6KSBzcGFjZVxuICAgICAgICBjb25zdCBZMCA9IGogLSB0O1xuICAgICAgICBjb25zdCBaMCA9IGsgLSB0O1xuICAgICAgICBjb25zdCB4MCA9IHggLSBYMDsgLy8gVGhlIHgseSx6IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgICBjb25zdCB5MCA9IHkgLSBZMDtcbiAgICAgICAgY29uc3QgejAgPSB6IC0gWjA7XG4gICAgICAgIC8vIEZvciB0aGUgM0QgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYSBzbGlnaHRseSBpcnJlZ3VsYXIgdGV0cmFoZWRyb24uXG4gICAgICAgIC8vIERldGVybWluZSB3aGljaCBzaW1wbGV4IHdlIGFyZSBpbi5cbiAgICAgICAgbGV0IGkxLCBqMSwgazE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xuICAgICAgICBsZXQgaTIsIGoyLCBrMjsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaixrKSBjb29yZHNcbiAgICAgICAgaWYgKHgwID49IHkwKSB7XG4gICAgICAgICAgICBpZiAoeTAgPj0gejApIHtcbiAgICAgICAgICAgICAgICBpMSA9IDE7XG4gICAgICAgICAgICAgICAgajEgPSAwO1xuICAgICAgICAgICAgICAgIGsxID0gMDtcbiAgICAgICAgICAgICAgICBpMiA9IDE7XG4gICAgICAgICAgICAgICAgajIgPSAxO1xuICAgICAgICAgICAgICAgIGsyID0gMDtcbiAgICAgICAgICAgIH0gLy8gWCBZIFogb3JkZXJcbiAgICAgICAgICAgIGVsc2UgaWYgKHgwID49IHowKSB7XG4gICAgICAgICAgICAgICAgaTEgPSAxO1xuICAgICAgICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgICAgICAgIGoyID0gMDtcbiAgICAgICAgICAgICAgICBrMiA9IDE7XG4gICAgICAgICAgICB9IC8vIFggWiBZIG9yZGVyXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgICAgICAgajEgPSAwO1xuICAgICAgICAgICAgICAgIGsxID0gMTtcbiAgICAgICAgICAgICAgICBpMiA9IDE7XG4gICAgICAgICAgICAgICAgajIgPSAwO1xuICAgICAgICAgICAgICAgIGsyID0gMTtcbiAgICAgICAgICAgIH0gLy8gWiBYIFkgb3JkZXJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8geDA8eTBcbiAgICAgICAgICAgIGlmICh5MCA8IHowKSB7XG4gICAgICAgICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgICAgICAgICBrMSA9IDE7XG4gICAgICAgICAgICAgICAgaTIgPSAwO1xuICAgICAgICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICAgICAgICBrMiA9IDE7XG4gICAgICAgICAgICB9IC8vIFogWSBYIG9yZGVyXG4gICAgICAgICAgICBlbHNlIGlmICh4MCA8IHowKSB7XG4gICAgICAgICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgICAgICAgIGoxID0gMTtcbiAgICAgICAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgICAgICAgaTIgPSAwO1xuICAgICAgICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICAgICAgICBrMiA9IDE7XG4gICAgICAgICAgICB9IC8vIFkgWiBYIG9yZGVyXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgICAgICAgajEgPSAxO1xuICAgICAgICAgICAgICAgIGsxID0gMDtcbiAgICAgICAgICAgICAgICBpMiA9IDE7XG4gICAgICAgICAgICAgICAgajIgPSAxO1xuICAgICAgICAgICAgICAgIGsyID0gMDtcbiAgICAgICAgICAgIH0gLy8gWSBYIFogb3JkZXJcbiAgICAgICAgfVxuICAgICAgICAvLyBBIHN0ZXAgb2YgKDEsMCwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jLC1jKSBpbiAoeCx5LHopLFxuICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMSwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jLC1jKSBpbiAoeCx5LHopLCBhbmRcbiAgICAgICAgLy8gYSBzdGVwIG9mICgwLDAsMSkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKC1jLC1jLDEtYykgaW4gKHgseSx6KSwgd2hlcmVcbiAgICAgICAgLy8gYyA9IDEvNi5cbiAgICAgICAgY29uc3QgeDEgPSB4MCAtIGkxICsgRzM7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcbiAgICAgICAgY29uc3QgeTEgPSB5MCAtIGoxICsgRzM7XG4gICAgICAgIGNvbnN0IHoxID0gejAgLSBrMSArIEczO1xuICAgICAgICBjb25zdCB4MiA9IHgwIC0gaTIgKyAyLjAgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIGluICh4LHkseikgY29vcmRzXG4gICAgICAgIGNvbnN0IHkyID0geTAgLSBqMiArIDIuMCAqIEczO1xuICAgICAgICBjb25zdCB6MiA9IHowIC0gazIgKyAyLjAgKiBHMztcbiAgICAgICAgY29uc3QgeDMgPSB4MCAtIDEuMCArIDMuMCAqIEczOyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xuICAgICAgICBjb25zdCB5MyA9IHkwIC0gMS4wICsgMy4wICogRzM7XG4gICAgICAgIGNvbnN0IHozID0gejAgLSAxLjAgKyAzLjAgKiBHMztcbiAgICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSBmb3VyIHNpbXBsZXggY29ybmVyc1xuICAgICAgICBjb25zdCBpaSA9IGkgJiAyNTU7XG4gICAgICAgIGNvbnN0IGpqID0gaiAmIDI1NTtcbiAgICAgICAgY29uc3Qga2sgPSBrICYgMjU1O1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSBmb3VyIGNvcm5lcnNcbiAgICAgICAgbGV0IHQwID0gMC42IC0geDAgKiB4MCAtIHkwICogeTAgLSB6MCAqIHowO1xuICAgICAgICBpZiAodDAgPCAwKVxuICAgICAgICAgICAgbjAgPSAwLjA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZ2kwID0gaWkgKyBwZXJtW2pqICsgcGVybVtra11dO1xuICAgICAgICAgICAgdDAgKj0gdDA7XG4gICAgICAgICAgICBuMCA9IHQwICogdDAgKiAocGVybUdyYWQzeFtnaTBdICogeDAgKyBwZXJtR3JhZDN5W2dpMF0gKiB5MCArIHBlcm1HcmFkM3pbZ2kwXSAqIHowKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDEgPSAwLjYgLSB4MSAqIHgxIC0geTEgKiB5MSAtIHoxICogejE7XG4gICAgICAgIGlmICh0MSA8IDApXG4gICAgICAgICAgICBuMSA9IDAuMDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBnaTEgPSBpaSArIGkxICsgcGVybVtqaiArIGoxICsgcGVybVtrayArIGsxXV07XG4gICAgICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIChwZXJtR3JhZDN4W2dpMV0gKiB4MSArIHBlcm1HcmFkM3lbZ2kxXSAqIHkxICsgcGVybUdyYWQzeltnaTFdICogejEpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0MiA9IDAuNiAtIHgyICogeDIgLSB5MiAqIHkyIC0gejIgKiB6MjtcbiAgICAgICAgaWYgKHQyIDwgMClcbiAgICAgICAgICAgIG4yID0gMC4wO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGdpMiA9IGlpICsgaTIgKyBwZXJtW2pqICsgajIgKyBwZXJtW2trICsgazJdXTtcbiAgICAgICAgICAgIHQyICo9IHQyO1xuICAgICAgICAgICAgbjIgPSB0MiAqIHQyICogKHBlcm1HcmFkM3hbZ2kyXSAqIHgyICsgcGVybUdyYWQzeVtnaTJdICogeTIgKyBwZXJtR3JhZDN6W2dpMl0gKiB6Mik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQzID0gMC42IC0geDMgKiB4MyAtIHkzICogeTMgLSB6MyAqIHozO1xuICAgICAgICBpZiAodDMgPCAwKVxuICAgICAgICAgICAgbjMgPSAwLjA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZ2kzID0gaWkgKyAxICsgcGVybVtqaiArIDEgKyBwZXJtW2trICsgMV1dO1xuICAgICAgICAgICAgdDMgKj0gdDM7XG4gICAgICAgICAgICBuMyA9IHQzICogdDMgKiAocGVybUdyYWQzeFtnaTNdICogeDMgKyBwZXJtR3JhZDN5W2dpM10gKiB5MyArIHBlcm1HcmFkM3pbZ2kzXSAqIHozKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXG4gICAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHN0YXkganVzdCBpbnNpZGUgWy0xLDFdXG4gICAgICAgIHJldHVybiAzMi4wICogKG4wICsgbjEgKyBuMiArIG4zKTtcbiAgICB9O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgNEQgbm9pc2UgZnVuY3Rpb25cbiAqIEBwYXJhbSByYW5kb20gdGhlIHJhbmRvbSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBidWlsZCB0aGUgcGVybXV0YXRpb24gdGFibGVcbiAqIEByZXR1cm5zIHtOb2lzZUZ1bmN0aW9uNER9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2lzZTREKHJhbmRvbSA9IE1hdGgucmFuZG9tKSB7XG4gICAgY29uc3QgcGVybSA9IGJ1aWxkUGVybXV0YXRpb25UYWJsZShyYW5kb20pO1xuICAgIC8vIHByZWNhbGN1bGF0aW5nIHRoZXNlIGxlYWRzIHRvIGEgfjEwJSBzcGVlZHVwXG4gICAgY29uc3QgcGVybUdyYWQ0eCA9IG5ldyBGbG9hdDY0QXJyYXkocGVybSkubWFwKHYgPT4gZ3JhZDRbKHYgJSAzMikgKiA0XSk7XG4gICAgY29uc3QgcGVybUdyYWQ0eSA9IG5ldyBGbG9hdDY0QXJyYXkocGVybSkubWFwKHYgPT4gZ3JhZDRbKHYgJSAzMikgKiA0ICsgMV0pO1xuICAgIGNvbnN0IHBlcm1HcmFkNHogPSBuZXcgRmxvYXQ2NEFycmF5KHBlcm0pLm1hcCh2ID0+IGdyYWQ0Wyh2ICUgMzIpICogNCArIDJdKTtcbiAgICBjb25zdCBwZXJtR3JhZDR3ID0gbmV3IEZsb2F0NjRBcnJheShwZXJtKS5tYXAodiA9PiBncmFkNFsodiAlIDMyKSAqIDQgKyAzXSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5vaXNlNEQoeCwgeSwgeiwgdykge1xuICAgICAgICBsZXQgbjAsIG4xLCBuMiwgbjMsIG40OyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIGZpdmUgY29ybmVyc1xuICAgICAgICAvLyBTa2V3IHRoZSAoeCx5LHosdykgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIGNlbGwgb2YgMjQgc2ltcGxpY2VzIHdlJ3JlIGluXG4gICAgICAgIGNvbnN0IHMgPSAoeCArIHkgKyB6ICsgdykgKiBGNDsgLy8gRmFjdG9yIGZvciA0RCBza2V3aW5nXG4gICAgICAgIGNvbnN0IGkgPSBmYXN0Rmxvb3IoeCArIHMpO1xuICAgICAgICBjb25zdCBqID0gZmFzdEZsb29yKHkgKyBzKTtcbiAgICAgICAgY29uc3QgayA9IGZhc3RGbG9vcih6ICsgcyk7XG4gICAgICAgIGNvbnN0IGwgPSBmYXN0Rmxvb3IodyArIHMpO1xuICAgICAgICBjb25zdCB0ID0gKGkgKyBqICsgayArIGwpICogRzQ7IC8vIEZhY3RvciBmb3IgNEQgdW5za2V3aW5nXG4gICAgICAgIGNvbnN0IFgwID0gaSAtIHQ7IC8vIFVuc2tldyB0aGUgY2VsbCBvcmlnaW4gYmFjayB0byAoeCx5LHosdykgc3BhY2VcbiAgICAgICAgY29uc3QgWTAgPSBqIC0gdDtcbiAgICAgICAgY29uc3QgWjAgPSBrIC0gdDtcbiAgICAgICAgY29uc3QgVzAgPSBsIC0gdDtcbiAgICAgICAgY29uc3QgeDAgPSB4IC0gWDA7IC8vIFRoZSB4LHkseix3IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgICBjb25zdCB5MCA9IHkgLSBZMDtcbiAgICAgICAgY29uc3QgejAgPSB6IC0gWjA7XG4gICAgICAgIGNvbnN0IHcwID0gdyAtIFcwO1xuICAgICAgICAvLyBGb3IgdGhlIDREIGNhc2UsIHRoZSBzaW1wbGV4IGlzIGEgNEQgc2hhcGUgSSB3b24ndCBldmVuIHRyeSB0byBkZXNjcmliZS5cbiAgICAgICAgLy8gVG8gZmluZCBvdXQgd2hpY2ggb2YgdGhlIDI0IHBvc3NpYmxlIHNpbXBsaWNlcyB3ZSdyZSBpbiwgd2UgbmVlZCB0b1xuICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIG1hZ25pdHVkZSBvcmRlcmluZyBvZiB4MCwgeTAsIHowIGFuZCB3MC5cbiAgICAgICAgLy8gU2l4IHBhaXItd2lzZSBjb21wYXJpc29ucyBhcmUgcGVyZm9ybWVkIGJldHdlZW4gZWFjaCBwb3NzaWJsZSBwYWlyXG4gICAgICAgIC8vIG9mIHRoZSBmb3VyIGNvb3JkaW5hdGVzLCBhbmQgdGhlIHJlc3VsdHMgYXJlIHVzZWQgdG8gcmFuayB0aGUgbnVtYmVycy5cbiAgICAgICAgbGV0IHJhbmt4ID0gMDtcbiAgICAgICAgbGV0IHJhbmt5ID0gMDtcbiAgICAgICAgbGV0IHJhbmt6ID0gMDtcbiAgICAgICAgbGV0IHJhbmt3ID0gMDtcbiAgICAgICAgaWYgKHgwID4geTApXG4gICAgICAgICAgICByYW5reCsrO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByYW5reSsrO1xuICAgICAgICBpZiAoeDAgPiB6MClcbiAgICAgICAgICAgIHJhbmt4Kys7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJhbmt6Kys7XG4gICAgICAgIGlmICh4MCA+IHcwKVxuICAgICAgICAgICAgcmFua3grKztcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmFua3crKztcbiAgICAgICAgaWYgKHkwID4gejApXG4gICAgICAgICAgICByYW5reSsrO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByYW5reisrO1xuICAgICAgICBpZiAoeTAgPiB3MClcbiAgICAgICAgICAgIHJhbmt5Kys7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJhbmt3Kys7XG4gICAgICAgIGlmICh6MCA+IHcwKVxuICAgICAgICAgICAgcmFua3orKztcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmFua3crKztcbiAgICAgICAgLy8gc2ltcGxleFtjXSBpcyBhIDQtdmVjdG9yIHdpdGggdGhlIG51bWJlcnMgMCwgMSwgMiBhbmQgMyBpbiBzb21lIG9yZGVyLlxuICAgICAgICAvLyBNYW55IHZhbHVlcyBvZiBjIHdpbGwgbmV2ZXIgb2NjdXIsIHNpbmNlIGUuZy4geD55Pno+dyBtYWtlcyB4PHosIHk8dyBhbmQgeDx3XG4gICAgICAgIC8vIGltcG9zc2libGUuIE9ubHkgdGhlIDI0IGluZGljZXMgd2hpY2ggaGF2ZSBub24temVybyBlbnRyaWVzIG1ha2UgYW55IHNlbnNlLlxuICAgICAgICAvLyBXZSB1c2UgYSB0aHJlc2hvbGRpbmcgdG8gc2V0IHRoZSBjb29yZGluYXRlcyBpbiB0dXJuIGZyb20gdGhlIGxhcmdlc3QgbWFnbml0dWRlLlxuICAgICAgICAvLyBSYW5rIDMgZGVub3RlcyB0aGUgbGFyZ2VzdCBjb29yZGluYXRlLlxuICAgICAgICAvLyBSYW5rIDIgZGVub3RlcyB0aGUgc2Vjb25kIGxhcmdlc3QgY29vcmRpbmF0ZS5cbiAgICAgICAgLy8gUmFuayAxIGRlbm90ZXMgdGhlIHNlY29uZCBzbWFsbGVzdCBjb29yZGluYXRlLlxuICAgICAgICAvLyBUaGUgaW50ZWdlciBvZmZzZXRzIGZvciB0aGUgc2Vjb25kIHNpbXBsZXggY29ybmVyXG4gICAgICAgIGNvbnN0IGkxID0gcmFua3ggPj0gMyA/IDEgOiAwO1xuICAgICAgICBjb25zdCBqMSA9IHJhbmt5ID49IDMgPyAxIDogMDtcbiAgICAgICAgY29uc3QgazEgPSByYW5reiA+PSAzID8gMSA6IDA7XG4gICAgICAgIGNvbnN0IGwxID0gcmFua3cgPj0gMyA/IDEgOiAwO1xuICAgICAgICAvLyBUaGUgaW50ZWdlciBvZmZzZXRzIGZvciB0aGUgdGhpcmQgc2ltcGxleCBjb3JuZXJcbiAgICAgICAgY29uc3QgaTIgPSByYW5reCA+PSAyID8gMSA6IDA7XG4gICAgICAgIGNvbnN0IGoyID0gcmFua3kgPj0gMiA/IDEgOiAwO1xuICAgICAgICBjb25zdCBrMiA9IHJhbmt6ID49IDIgPyAxIDogMDtcbiAgICAgICAgY29uc3QgbDIgPSByYW5rdyA+PSAyID8gMSA6IDA7XG4gICAgICAgIC8vIFRoZSBpbnRlZ2VyIG9mZnNldHMgZm9yIHRoZSBmb3VydGggc2ltcGxleCBjb3JuZXJcbiAgICAgICAgY29uc3QgaTMgPSByYW5reCA+PSAxID8gMSA6IDA7XG4gICAgICAgIGNvbnN0IGozID0gcmFua3kgPj0gMSA/IDEgOiAwO1xuICAgICAgICBjb25zdCBrMyA9IHJhbmt6ID49IDEgPyAxIDogMDtcbiAgICAgICAgY29uc3QgbDMgPSByYW5rdyA+PSAxID8gMSA6IDA7XG4gICAgICAgIC8vIFRoZSBmaWZ0aCBjb3JuZXIgaGFzIGFsbCBjb29yZGluYXRlIG9mZnNldHMgPSAxLCBzbyBubyBuZWVkIHRvIGNvbXB1dGUgdGhhdC5cbiAgICAgICAgY29uc3QgeDEgPSB4MCAtIGkxICsgRzQ7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgaW4gKHgseSx6LHcpIGNvb3Jkc1xuICAgICAgICBjb25zdCB5MSA9IHkwIC0gajEgKyBHNDtcbiAgICAgICAgY29uc3QgejEgPSB6MCAtIGsxICsgRzQ7XG4gICAgICAgIGNvbnN0IHcxID0gdzAgLSBsMSArIEc0O1xuICAgICAgICBjb25zdCB4MiA9IHgwIC0gaTIgKyAyLjAgKiBHNDsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIGluICh4LHkseix3KSBjb29yZHNcbiAgICAgICAgY29uc3QgeTIgPSB5MCAtIGoyICsgMi4wICogRzQ7XG4gICAgICAgIGNvbnN0IHoyID0gejAgLSBrMiArIDIuMCAqIEc0O1xuICAgICAgICBjb25zdCB3MiA9IHcwIC0gbDIgKyAyLjAgKiBHNDtcbiAgICAgICAgY29uc3QgeDMgPSB4MCAtIGkzICsgMy4wICogRzQ7IC8vIE9mZnNldHMgZm9yIGZvdXJ0aCBjb3JuZXIgaW4gKHgseSx6LHcpIGNvb3Jkc1xuICAgICAgICBjb25zdCB5MyA9IHkwIC0gajMgKyAzLjAgKiBHNDtcbiAgICAgICAgY29uc3QgejMgPSB6MCAtIGszICsgMy4wICogRzQ7XG4gICAgICAgIGNvbnN0IHczID0gdzAgLSBsMyArIDMuMCAqIEc0O1xuICAgICAgICBjb25zdCB4NCA9IHgwIC0gMS4wICsgNC4wICogRzQ7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkseix3KSBjb29yZHNcbiAgICAgICAgY29uc3QgeTQgPSB5MCAtIDEuMCArIDQuMCAqIEc0O1xuICAgICAgICBjb25zdCB6NCA9IHowIC0gMS4wICsgNC4wICogRzQ7XG4gICAgICAgIGNvbnN0IHc0ID0gdzAgLSAxLjAgKyA0LjAgKiBHNDtcbiAgICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSBmaXZlIHNpbXBsZXggY29ybmVyc1xuICAgICAgICBjb25zdCBpaSA9IGkgJiAyNTU7XG4gICAgICAgIGNvbnN0IGpqID0gaiAmIDI1NTtcbiAgICAgICAgY29uc3Qga2sgPSBrICYgMjU1O1xuICAgICAgICBjb25zdCBsbCA9IGwgJiAyNTU7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIGZpdmUgY29ybmVyc1xuICAgICAgICBsZXQgdDAgPSAwLjYgLSB4MCAqIHgwIC0geTAgKiB5MCAtIHowICogejAgLSB3MCAqIHcwO1xuICAgICAgICBpZiAodDAgPCAwKVxuICAgICAgICAgICAgbjAgPSAwLjA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZ2kwID0gaWkgKyBwZXJtW2pqICsgcGVybVtrayArIHBlcm1bbGxdXV07XG4gICAgICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgICAgIG4wID0gdDAgKiB0MCAqIChwZXJtR3JhZDR4W2dpMF0gKiB4MCArIHBlcm1HcmFkNHlbZ2kwXSAqIHkwICsgcGVybUdyYWQ0eltnaTBdICogejAgKyBwZXJtR3JhZDR3W2dpMF0gKiB3MCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQxID0gMC42IC0geDEgKiB4MSAtIHkxICogeTEgLSB6MSAqIHoxIC0gdzEgKiB3MTtcbiAgICAgICAgaWYgKHQxIDwgMClcbiAgICAgICAgICAgIG4xID0gMC4wO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGdpMSA9IGlpICsgaTEgKyBwZXJtW2pqICsgajEgKyBwZXJtW2trICsgazEgKyBwZXJtW2xsICsgbDFdXV07XG4gICAgICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIChwZXJtR3JhZDR4W2dpMV0gKiB4MSArIHBlcm1HcmFkNHlbZ2kxXSAqIHkxICsgcGVybUdyYWQ0eltnaTFdICogejEgKyBwZXJtR3JhZDR3W2dpMV0gKiB3MSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQyID0gMC42IC0geDIgKiB4MiAtIHkyICogeTIgLSB6MiAqIHoyIC0gdzIgKiB3MjtcbiAgICAgICAgaWYgKHQyIDwgMClcbiAgICAgICAgICAgIG4yID0gMC4wO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGdpMiA9IGlpICsgaTIgKyBwZXJtW2pqICsgajIgKyBwZXJtW2trICsgazIgKyBwZXJtW2xsICsgbDJdXV07XG4gICAgICAgICAgICB0MiAqPSB0MjtcbiAgICAgICAgICAgIG4yID0gdDIgKiB0MiAqIChwZXJtR3JhZDR4W2dpMl0gKiB4MiArIHBlcm1HcmFkNHlbZ2kyXSAqIHkyICsgcGVybUdyYWQ0eltnaTJdICogejIgKyBwZXJtR3JhZDR3W2dpMl0gKiB3Mik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQzID0gMC42IC0geDMgKiB4MyAtIHkzICogeTMgLSB6MyAqIHozIC0gdzMgKiB3MztcbiAgICAgICAgaWYgKHQzIDwgMClcbiAgICAgICAgICAgIG4zID0gMC4wO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGdpMyA9IGlpICsgaTMgKyBwZXJtW2pqICsgajMgKyBwZXJtW2trICsgazMgKyBwZXJtW2xsICsgbDNdXV07XG4gICAgICAgICAgICB0MyAqPSB0MztcbiAgICAgICAgICAgIG4zID0gdDMgKiB0MyAqIChwZXJtR3JhZDR4W2dpM10gKiB4MyArIHBlcm1HcmFkNHlbZ2kzXSAqIHkzICsgcGVybUdyYWQ0eltnaTNdICogejMgKyBwZXJtR3JhZDR3W2dpM10gKiB3Myk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQ0ID0gMC42IC0geDQgKiB4NCAtIHk0ICogeTQgLSB6NCAqIHo0IC0gdzQgKiB3NDtcbiAgICAgICAgaWYgKHQ0IDwgMClcbiAgICAgICAgICAgIG40ID0gMC4wO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGdpNCA9IGlpICsgMSArIHBlcm1bamogKyAxICsgcGVybVtrayArIDEgKyBwZXJtW2xsICsgMV1dXTtcbiAgICAgICAgICAgIHQ0ICo9IHQ0O1xuICAgICAgICAgICAgbjQgPSB0NCAqIHQ0ICogKHBlcm1HcmFkNHhbZ2k0XSAqIHg0ICsgcGVybUdyYWQ0eVtnaTRdICogeTQgKyBwZXJtR3JhZDR6W2dpNF0gKiB6NCArIHBlcm1HcmFkNHdbZ2k0XSAqIHc0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTdW0gdXAgYW5kIHNjYWxlIHRoZSByZXN1bHQgdG8gY292ZXIgdGhlIHJhbmdlIFstMSwxXVxuICAgICAgICByZXR1cm4gMjcuMCAqIChuMCArIG4xICsgbjIgKyBuMyArIG40KTtcbiAgICB9O1xufVxuLyoqXG4gKiBCdWlsZHMgYSByYW5kb20gcGVybXV0YXRpb24gdGFibGUuXG4gKiBUaGlzIGlzIGV4cG9ydGVkIG9ubHkgZm9yIChpbnRlcm5hbCkgdGVzdGluZyBwdXJwb3Nlcy5cbiAqIERvIG5vdCByZWx5IG9uIHRoaXMgZXhwb3J0LlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUGVybXV0YXRpb25UYWJsZShyYW5kb20pIHtcbiAgICBjb25zdCB0YWJsZVNpemUgPSA1MTI7XG4gICAgY29uc3QgcCA9IG5ldyBVaW50OEFycmF5KHRhYmxlU2l6ZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZVNpemUgLyAyOyBpKyspIHtcbiAgICAgICAgcFtpXSA9IGk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVTaXplIC8gMiAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCByID0gaSArIH5+KHJhbmRvbSgpICogKDI1NiAtIGkpKTtcbiAgICAgICAgY29uc3QgYXV4ID0gcFtpXTtcbiAgICAgICAgcFtpXSA9IHBbcl07XG4gICAgICAgIHBbcl0gPSBhdXg7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAyNTY7IGkgPCB0YWJsZVNpemU7IGkrKykge1xuICAgICAgICBwW2ldID0gcFtpIC0gMjU2XTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaW1wbGV4LW5vaXNlLmpzLm1hcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVGVycmFpbiB9IGZyb20gXCIuL3RlcnJhaW4vdGVycmFpblwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHsgSW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4vaW5wdXRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuY29uc3Qgc2NyZWVuRGltZW5zaW9uID0gY29uZmlnLnNjcmVlbkRpbWVuc2lvbjtcclxuY29uc3QgbWFpbkNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLWNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5tYWluQ2FudmFzLndpZHRoID0gc2NyZWVuRGltZW5zaW9uWzBdO1xyXG5tYWluQ2FudmFzLmhlaWdodCA9IHNjcmVlbkRpbWVuc2lvblsxXTtcclxuXHJcbmNvbnN0IGN0eCA9IG1haW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG5jb25zb2xlLmxvZyhcImhlbGxvIHdvcmxkXCIpO1xyXG5cclxubGV0IHNwZWVkWCA9IDU7XHJcbmxldCBzcGVlZFkgPSA1O1xyXG5sZXQgcG9zIDogUG9pbnQgPSBbc2NyZWVuRGltZW5zaW9uWzBdLCAwXTtcclxuXHJcbmNvbnN0IGlucHV0SGFuZGxlciA9IG5ldyBJbnB1dEhhbmRsZXIoKTtcclxuY29uc3QgdGVycmFpbiA9IG5ldyBUZXJyYWluKGN0eCk7XHJcblxyXG5jb25zdCB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICBpZihpbnB1dEhhbmRsZXIuaXNLZXlEb3duKCdhJykpIHBvc1swXSAtPSBzcGVlZFg7XHJcbiAgICBpZihpbnB1dEhhbmRsZXIuaXNLZXlEb3duKCdkJykpIHBvc1swXSArPSBzcGVlZFg7XHJcbiAgICBpZihpbnB1dEhhbmRsZXIuaXNLZXlEb3duKCd3JykpIHBvc1sxXSArPSBzcGVlZFk7XHJcbiAgICBpZihpbnB1dEhhbmRsZXIuaXNLZXlEb3duKCdzJykpIHBvc1sxXSAtPSBzcGVlZFk7XHJcblxyXG4gICAgdGVycmFpbi51cGRhdGUocG9zKTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhwb3MsIHRlcnJhaW4uY2h1bmtzKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHBvcywgdGVycmFpbi5nZXRDaHVua0Zyb21YKHBvc1swXSkpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc2NyZWVuRGltZW5zaW9uWzBdLCBzY3JlZW5EaW1lbnNpb25bMV0pO1xyXG4gICAgdGVycmFpbi5yZW5kZXIocG9zKTtcclxuICAgIHRlcnJhaW4ucmVuZGVyRGV2KHBvcyk7XHJcbn1cclxuXHJcbmxldCBhbHBoYSA9IDAuOTtcclxubGV0IGF2Z0ZwcyA9IDMwO1xyXG5sZXQgZnJhbWVzVGhpc1NlY29uZCA9IDA7XHJcbnNldEludGVydmFsKCgpID0+IHtcclxuICAgIGF2Z0ZwcyA9IGFscGhhICogYXZnRnBzICsgKDEuMCAtIGFscGhhKSAqIGZyYW1lc1RoaXNTZWNvbmQ7XHJcbiAgICBmcmFtZXNUaGlzU2Vjb25kID0gMDtcclxuICAgIGNvbnNvbGUubG9nKCdGUFMnLCBhdmdGcHMpO1xyXG59LCAxMDAwKTtcclxuXHJcbmNvbnN0IGxvb3AgPSAoKSA9PiB7XHJcbiAgICBmcmFtZXNUaGlzU2Vjb25kICs9IDE7XHJcbiAgICB1cGRhdGUoKTtcclxuICAgIHJlbmRlcigpO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG59XHJcbmxvb3AoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=