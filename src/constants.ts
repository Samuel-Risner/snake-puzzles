import type { T_ColorNumbers, T_Colors, T_TileTypeNumber } from "./types";

const COLORS: T_Colors = {
    RED: "bg-red-500",
    GREEN: "bg-green-300",
    YELLOW: "bg-yellow-300",
    BLUE: "bg-blue-400"
}

const COLOR_NUMBERS: T_ColorNumbers = {
    RED: 0,
    GREEN: 1,
    YELLOW: 2,
    BLUE: 3
}

const TILE_TYPES: T_TileTypeNumber = {
    EMPTY: 0,
    POINT: 1,
    CONNECTION: 2
}

const CONSTANTS = {
    COLORS: COLORS,
    COLOR_NUMBERS: COLOR_NUMBERS,
    TILE_TYPES: TILE_TYPES,
}

export default CONSTANTS;