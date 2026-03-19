import CONSTANTS from "../constants";
import type Tile from "../tiles/tile";
import type { T_ColorName, T_ColorNumbers, T_ConnectionDirection, T_Directions, T_TileTypeNumber, ValueOf } from "../types";
import type TileTypeInterface from "./tileTypeInterface";

/**
 * true -> head
 * false -> nothing
 * Connection -> next Connection Element
 */
type T_Previous_Next = true | false | Connection;

export default class Connection implements TileTypeInterface {

    private tile: Tile;

    private previous: T_Previous_Next;
    private previousDirection: ValueOf<T_Directions>;

    private next: T_Previous_Next = false;
    private nextDirection: ValueOf<T_Directions> = CONSTANTS.DIRECTIONS.TOP;

    private element: HTMLDivElement;

    private colorNumber: ValueOf<T_ColorNumbers>;
    private color: string;

    constructor(colorName: T_ColorName, tile: Tile, previous: T_Previous_Next, previousDirection: ValueOf<T_Directions>) {
        this.tile = tile;

        this.previous = previous;
        this.previousDirection = previousDirection;

        this.element = document.createElement("div");
        this.element.className = "w-4 h-4 bg-green-300";

        this.colorNumber = CONSTANTS.COLOR_NUMBERS[colorName];
        this.color = CONSTANTS.COLORS[colorName];

        this.tile.setTileType(this);
        this.setClassName();
    }

    setClassName() {
        // previous element exists but no next element
        if (this.previous !== false && this.next === false) {

            // coming from the bottom of the previous element
            if (this.previousDirection === CONSTANTS.DIRECTIONS.TOP) {
                this.element.className = `mx-auto ${this.color} ${CONSTANTS.SIZES.CONNECTION.M_B} ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W} ${CONSTANTS.SIZES.CONNECTION.HALF_H}`;

            // coming from the top of the previous element
            } else if (this.previousDirection === CONSTANTS.DIRECTIONS.BOTTOM) {
                this.element.className = `mx-auto ${this.color} ${CONSTANTS.SIZES.CONNECTION.M_T} ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W} ${CONSTANTS.SIZES.CONNECTION.HALF_H}`;

            // coming from the left of the previous element
            }  else if (this.previousDirection === CONSTANTS.DIRECTIONS.LEFT) {
                this.element.className = `my-auto ${this.color} ${CONSTANTS.SIZES.CONNECTION.M_R} ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H} ${CONSTANTS.SIZES.CONNECTION.HALF_W}`;

            // coming from the right of the previous element
            } else if (this.previousDirection === CONSTANTS.DIRECTIONS.RIGHT) {
                this.element.className = `my-auto ${this.color} ${CONSTANTS.SIZES.CONNECTION.M_L} ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H} ${CONSTANTS.SIZES.CONNECTION.HALF_W}`;
            }
        }

        // previous and next element both exist
    }

    deleteSelf() {
        this.tile.setTileType(null);
    }

    deleteRecursively() {
        this.deleteSelf();

        if (this.previous !== false && this.previous !== true) {
            this.previous.deleteRecursively();
        }

        if (this.next !== false && this.next !== true) {
            this.next.deleteRecursively();
        }
    }

    deleteTrailRecursively(): boolean {
        if (this.previous === true || this.next === true) {
            return false;
        }

        if (this.previous !== false) {
            if (this.deleteTrailRecursively()) {
                this.deleteSelf();
                return true;
            }
        }

        if (this.next !== false) {
            if (this.deleteTrailRecursively()) {
                this.deleteSelf();
                return true;
            }
        }

        return false;
    }

    getTileType(): ValueOf<T_TileTypeNumber> {
        return CONSTANTS.TILE_TYPES.CONNECTION;
    }

    getHTML(): HTMLDivElement {
        return this.element;
    }
}