import type { Scene } from '@babylonjs/core/scene';
import type { Engine } from '@babylonjs/core/Engines';
import type { Location } from './location';
import type { Menu } from './Menu.js';
type Global = {
    engine: Engine | null;
    scene: Scene | null;
    system: unknown;
    pause: boolean;
    tooltip: boolean;
    suncalc: boolean;
    step: number;
    date: Date;
    location: Location;
    moonOrbitExpand: number;
    planetOrbitExpand: number;
    planetOrbitExponent: number;
    sizeExponent: number;
    sizeFactor: number;
    menu: null | Menu;
};
export declare const global: Global;
export {};
//# sourceMappingURL=globals.d.ts.map