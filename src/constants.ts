import type { T_Colors, T_Directions, T_TileTypeNumber } from "./types";

let continuosNumber = 0;
function getContinuosNumber () {
    return continuosNumber++;
}

const COLORS: T_Colors = {
    RED: "bg-red-500",
    GREEN: "bg-green-300",
    YELLOW: "bg-yellow-300",
    BLUE: "bg-blue-400",
}

const TILE_TYPES: T_TileTypeNumber = {
    BLOCKED: getContinuosNumber(),
    EMPTY: getContinuosNumber(),
    POINT: getContinuosNumber(),
    CONNECTION: getContinuosNumber(),
    CONNECTION_END: getContinuosNumber(),
}

const DIRECTIONS: T_Directions = {
    TOP: getContinuosNumber(),
    BOTTOM: getContinuosNumber(),
    LEFT: getContinuosNumber(),
    RIGHT: getContinuosNumber(),
}

const CONSTANTS = {
    COLORS: COLORS,
    TILE_TYPES: TILE_TYPES,
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