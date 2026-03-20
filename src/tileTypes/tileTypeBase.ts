import CONSTANTS from "../constants";
import type Tile from "../tiles/tile";
import type { ValueOf, T_TileTypeNumber, T_ColorNumbers, T_ColorName } from "../types";
import type TileTypeInterface from "./tileTypeInterface";

export default abstract class TileTypeBase implements TileTypeInterface {

    protected tile: Tile;

    protected element: HTMLDivElement;
    protected subElement: HTMLDivElement;

    protected colorTWCSS: string;

    constructor(tile: Tile, colorName: T_ColorName) {
        this.tile = tile;

        this.element = document.createElement("div");
        this.subElement = document.createElement("div");
        this.element.appendChild(this.subElement);

        this.colorTWCSS = CONSTANTS.COLORS[colorName];
    }

    getTileType(): ValueOf<T_TileTypeNumber> {
        return CONSTANTS.TILE_TYPES.BLOCKED;
    }

    private getColorTWCSS() {
        return this.colorTWCSS;
    }

    colorMatches(tileType: TileTypeBase): boolean {
        return this.colorTWCSS === tileType.getColorTWCSS();
    }

    appendToParent(parent: HTMLDivElement) {
        parent.appendChild(this.element);
        parent.appendChild(this.subElement);
    }
}