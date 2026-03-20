import CONSTANTS from "../constants";
import type { T_Directions, ValueOf } from "../types";

/**
 * Inverts the passed direction (top > bottom; left > right etc.)
 * 
 * @param direction the direction to invert
 * @returns the new inverted direction
 */
export default function invertDirection(direction: ValueOf<T_Directions>): ValueOf<T_Directions> {
    switch (direction) {
        // case CONSTANTS.DIRECTIONS.TOP: return CONSTANTS.DIRECTIONS.BOTTOM;
        case CONSTANTS.DIRECTIONS.BOTTOM: return CONSTANTS.DIRECTIONS.TOP;
        case CONSTANTS.DIRECTIONS.LEFT: return CONSTANTS.DIRECTIONS.RIGHT;
        case CONSTANTS.DIRECTIONS.RIGHT: return CONSTANTS.DIRECTIONS.LEFT;
        default: return CONSTANTS.DIRECTIONS.BOTTOM;
    }
}