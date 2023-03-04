export type Point = [number, number];
export type Color = [number, number, number];
export type BBox = [number, number, number, number];

export const lerpColor = (c1: Color, c2: Color, t: number) : Color => c1.map((n, i) => t * n + (1 - t) * c2[i]) as Color;
export const triple2Hex = (c1: number[]) => '#' + c1.map(n => (n | 0).toString(16).padStart(2, '0')).join('');

export const mulberry32 = (a: number) => {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}