import CONSTANTS from "../constants";
import type { T_ColorName, T_ColorNumbers, T_TileTypeNumber, ValueOf } from "../types";
import type TileTypeInterface from "./tileTypeInterface";

export default class Connection implements TileTypeInterface {

    private colorNumber: ValueOf<T_ColorNumbers>;
    private color: string;

    constructor(colorName: T_ColorName) {
        this.colorNumber = CONSTANTS.COLOR_NUMBERS[colorName];
        this.color = CONSTANTS.COLORS[colorName];
    }

    getTileType(): ValueOf<T_TileTypeNumber> {
        return CONSTANTS.TILE_TYPES.CONNECTION;
    }

    getHTML(): HTMLElement {
        return document.createElement("div");
    }
}