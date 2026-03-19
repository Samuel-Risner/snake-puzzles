import type { T_ColorNumbers, T_Colors, T_ConnectionDirection, T_Directions, T_TileTypeNumber } from "./types";

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

const CONNECTION_DIRECTION: T_ConnectionDirection = {
    STRAIGHT_HORIZONTAL: 0,
    STRAIGHT_VERTICAL: 1,
    KURVE_TOP_LEFT: 2,
    KURVE_TOP_RIGHT: 3,
    KURVE_BOTTOM_LEFT: 4,
    KURVE_BOTTOM_RIGHT: 5
}

const DIRECTIONS: T_Directions = {
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3
}

const CONSTANTS = {
    COLORS: COLORS,
    COLOR_NUMBERS: COLOR_NUMBERS,
    TILE_TYPES: TILE_TYPES,
    CONNECTION_DIRECTION: CONNECTION_DIRECTION,
    DIRECTIONS: DIRECTIONS,
    SIZES: {
        TILE_W: "w-8",
        TILE_H: "h-8",
        CONNECTION: {
            THICKNESS_W: "w-4",
            THICKNESS_H: "h-4",

            FULL_W: "w-8",
            FULL_H: "h-8",

            HALF_W: "w-6",
            HALF_H: "h-6",

            M_T: "mt-2",
            M_B: "mb-2",
            M_L: "ml-2",
            M_R: "mr-2",
        }
    }
}

export default CONSTANTS;