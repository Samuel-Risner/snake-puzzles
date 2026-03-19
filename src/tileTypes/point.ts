import CONSTANTS from "../constants";
import type Tile from "../tiles/tile";
import type { ValueOf, T_ColorNumbers, T_ColorName, T_TileTypeNumber } from "../types";
import type TileTypeInterface from "./tileTypeInterface";

export default class Point implements TileTypeInterface {

    private tile: Tile;

    private colorNumber: ValueOf<T_ColorNumbers>;
    private color: string;
    private element: HTMLElement;

    constructor(tile: Tile, colorName: T_ColorName, registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void) {
        this.tile = tile;
        
        this.colorNumber = CONSTANTS.COLOR_NUMBERS[colorName];
        this.color = CONSTANTS.COLORS[colorName];

        this.element = document.createElement("div");
        this.element.className = `flex grow m-1 rounded-full ${this.color}`;

        const move = (e: MouseEvent) => {
            console.log(`x: ${e.clientX} y: ${e.clientY}`);
        }

        const up = (e: MouseEvent) => {

        }

        this.element.addEventListener("mousedown", (e: MouseEvent) => {
            console.log(e.clientX);
            console.log(e.clientY);

            registerMoveDetection(move, up);
        })
    }


    getTileType(): ValueOf<T_TileTypeNumber> {
        return CONSTANTS.TILE_TYPES.POINT;
    }

    getHTML(): HTMLElement {
        return this.element;
    }
}