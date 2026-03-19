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
    BLOCKED: 0,
    EMPTY: 1,
    POINT: 2,
    CONNECTION: 3,
    CONNECTION_END: 4,
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
        TILE: {
            W: "w-12",
            H: "h-12",
            BORDER: "border-[0.15rem]"
        },
        POINT: {
            W: "w-9",
            H: "h-9",
            POS: "top-1 left-1",
            Z: "z-20"
        },
        CONNECTION: {
            Z: "z-10",

            THICKNESS_W: "w-7",
            THICKNESS_H: "h-7",

            FULL_W: "w-12",
            FULL_H: "h-12",

            CORNER_W: "w-10",
            CORNER_H: "h-10",

            END_W: "w-10",
            END_H: "h-10",


            POS_NO_SPACE_TOP: "-top-1",
            POS_NO_SPACE_BOTTOM: "-bottom-1",
            POS_NO_SPACE_LEFT: "-left-1",
            POS_NO_SPACE_RIGHT: "-right-1",
        }
    }
}

export default CONSTANTS;