import CONSTANTS from "../constants";
import type Tile from "../tiles/tile";
import type { T_ColorName, T_Directions, T_TileTypeNumber, ValueOf } from "../types";
import TileTypeBase from "./tileTypeBase";
import type TileTypeInterface from "./tileTypeInterface";

/**
 * true -> head
 * false -> nothing
 * Connection -> next Connection Element
 */
type T_Previous_Next = true | false | Connection;

export default class Connection extends TileTypeBase implements TileTypeInterface {

    private previous: T_Previous_Next;
    private previousDirection: ValueOf<T_Directions>;

    private next: T_Previous_Next = false;
    private nextDirection: ValueOf<T_Directions> = CONSTANTS.DIRECTIONS.TOP;

    constructor(colorName: T_ColorName, tile: Tile, previous: T_Previous_Next, previousDirection: ValueOf<T_Directions>, registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void) {
        super(tile, colorName);

        this.previous = previous;
        this.previousDirection = previousDirection;

        this.element.className = "w-4 h-4 bg-green-300";

        this.tile.setTileType(this);
        this.setClassName();

        const continueEventListener = (e: MouseEvent) => {
            registerMoveDetection(move, up);
        }

        const move = (e: MouseEvent) => {
            // get next tile
            const [targetTile, direction] = this.tile.getAdjacentTileIfContains(e.clientX, e.clientY);
            if (targetTile === null) return;
            
            // new connection
            this.next = new Connection(colorName, targetTile, this, direction, registerMoveDetection);

            // update own style
            this.nextDirection = direction;
            this.setClassName();

            // remove old event listeners
            this.element.removeEventListener("mousedown", continueEventListener);
            this.subElement.removeEventListener("mousedown", continueEventListener);
        }

        const up = (e: MouseEvent) => {
            // set event listener so that the connection can be continued later on
            // but only if the connection is not connected to a point
            if (this.previous === false || this.next === false) {
                this.element.addEventListener("mousedown", continueEventListener);
                this.subElement.addEventListener("mousedown", continueEventListener);
            }
        }

        registerMoveDetection(move, up);
    }

    setClassName() {
        // previous element exists but no next element
        //  > previous element is point or another connection element
        //  > next element does not exist
        if (this.previous !== false && this.next === false) {

            // coming from the bottom of the previous element
            if (this.previousDirection === CONSTANTS.DIRECTIONS.TOP) {
                this.element.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_TOP}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                    ${CONSTANTS.SIZES.CONNECTION.END_H}
                `;

            // coming from the top of the previous element
            } else if (this.previousDirection === CONSTANTS.DIRECTIONS.BOTTOM) {
                this.element.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_BOTTOM}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                    ${CONSTANTS.SIZES.CONNECTION.END_H}
                `;

            // coming from the right of the previous element
            }  else if (this.previousDirection === CONSTANTS.DIRECTIONS.LEFT) {
                this.element.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_LEFT}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                    ${CONSTANTS.SIZES.CONNECTION.END_W}
                `;

            // coming from the left of the previous element
            } else if (this.previousDirection === CONSTANTS.DIRECTIONS.RIGHT) {
                this.element.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_RIGHT}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                    ${CONSTANTS.SIZES.CONNECTION.END_W}
                `;
            }
        }
            
        // previous and next element both exist
        //  > previous element is point or another connection element
        //  > next element is point or another connection element
        if (this.previous !== false && this.next !== false) {

            // corner
            //  |
            //  '----
            if (
                (this.previousDirection === CONSTANTS.DIRECTIONS.TOP && this.nextDirection === CONSTANTS.DIRECTIONS.LEFT) ||
                (this.previousDirection === CONSTANTS.DIRECTIONS.RIGHT && this.nextDirection === CONSTANTS.DIRECTIONS.BOTTOM)
            ) {
                this.element.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_TOP}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                    ${CONSTANTS.SIZES.CONNECTION.END_H}
                `;

                this.subElement.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_RIGHT}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                    ${CONSTANTS.SIZES.CONNECTION.CORNER_W}
                `;
                return;
            }

            // corner
            //      |
            //  ----'
            if (
                (this.previousDirection === CONSTANTS.DIRECTIONS.TOP && this.nextDirection === CONSTANTS.DIRECTIONS.RIGHT) ||
                (this.previousDirection === CONSTANTS.DIRECTIONS.LEFT && this.nextDirection === CONSTANTS.DIRECTIONS.BOTTOM)
            ) {
                this.element.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_TOP}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                    ${CONSTANTS.SIZES.CONNECTION.END_H}
                `;
                
                this.subElement.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_LEFT}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                    ${CONSTANTS.SIZES.CONNECTION.CORNER_W}
                `;
                return;
            }

            // corner
            //  ,----
            //  |
            if (
                (this.previousDirection === CONSTANTS.DIRECTIONS.BOTTOM && this.nextDirection === CONSTANTS.DIRECTIONS.LEFT) ||
                (this.previousDirection === CONSTANTS.DIRECTIONS.RIGHT && this.nextDirection === CONSTANTS.DIRECTIONS.TOP)
            ) {
                this.element.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_BOTTOM}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                    ${CONSTANTS.SIZES.CONNECTION.END_H}
                `;

                this.subElement.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_RIGHT}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                    ${CONSTANTS.SIZES.CONNECTION.CORNER_W}
                `;
                return;
            }

            // corner
            //  ----,
            //      |
            if (
                (this.previousDirection === CONSTANTS.DIRECTIONS.BOTTOM && this.nextDirection === CONSTANTS.DIRECTIONS.RIGHT) ||
                (this.previousDirection === CONSTANTS.DIRECTIONS.LEFT && this.nextDirection === CONSTANTS.DIRECTIONS.TOP)
            ) {
                this.element.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_BOTTOM}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                    ${CONSTANTS.SIZES.CONNECTION.END_H}
                `;

                this.subElement.className = `absolute
                    ${this.colorTWCSS}

                    ${CONSTANTS.SIZES.CONNECTION.Z}

                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_LEFT}

                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                    ${CONSTANTS.SIZES.CONNECTION.CORNER_W}
                `;
                return;
            }

            // horizontal
            if (this.previousDirection === CONSTANTS.DIRECTIONS.TOP || this.previousDirection === CONSTANTS.DIRECTIONS.BOTTOM) {
                if (this.nextDirection === CONSTANTS.DIRECTIONS.TOP || this.nextDirection === CONSTANTS.DIRECTIONS.BOTTOM) {
                    this.element.className = `absolute
                        ${this.colorTWCSS}

                        ${CONSTANTS.SIZES.CONNECTION.Z}

                        ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                        ${CONSTANTS.SIZES.CONNECTION.FULL_H}
                    `;
                }
            // vertical
            } else if (this.previousDirection === CONSTANTS.DIRECTIONS.LEFT || this.previousDirection === CONSTANTS.DIRECTIONS.RIGHT) {
                if (this.nextDirection === CONSTANTS.DIRECTIONS.LEFT || this.nextDirection === CONSTANTS.DIRECTIONS.RIGHT) {
                    this.element.className = `absolute
                        ${this.colorTWCSS}

                        ${CONSTANTS.SIZES.CONNECTION.Z}

                        ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                        ${CONSTANTS.SIZES.CONNECTION.FULL_W}
                    `;
                }

                return;
            }
        }

    }

    //
    // - delete
    //

    private deleteSelf() {
        this.tile.setTileType(null);
    }

    private deleteRecursivelyPrevious() {
        this.deleteSelf();

        if (this.previous !== false && this.previous !== true) {
            this.previous.deleteRecursivelyPrevious();
        }
    }

    private deleteRecursivelyNext() {
        this.deleteSelf();

        if (this.next !== false && this.next !== true) {
            this.next.deleteRecursivelyNext();
        }
    }

    deleteRecursively() {
        this.deleteRecursivelyPrevious();
        this.deleteRecursivelyNext();
    }

    //
    // - getters
    //

    getTileType(): ValueOf<T_TileTypeNumber> {
        return CONSTANTS.TILE_TYPES.CONNECTION;
    }
}