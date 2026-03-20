import CONSTANTS from "../constants";
import type Tile from "../tiles/tile";
import type { ValueOf, T_TileTypeNumber, T_Colors } from "../types";
import type TileTypeInterface from "./tileTypeInterface";

export default abstract class TileTypeBase implements TileTypeInterface {

    protected tile: Tile;

    protected element: HTMLDivElement;
    protected subElement: HTMLDivElement;

    protected colorTWCSS: string;

    constructor(tile: Tile, colorTWCSS: ValueOf<T_Colors>) {
        this.tile = tile;
        this.colorTWCSS = colorTWCSS;

        this.element = document.createElement("div");
        this.subElement = document.createElement("div");
        this.element.appendChild(this.subElement);
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