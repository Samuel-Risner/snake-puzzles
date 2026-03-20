import CONSTANTS from "../constants";
import type Tile from "../tiles/tile";
import type { T_ColorName, T_Colors, T_Directions, T_TileTypeNumber, ValueOf } from "../types";
import type Point from "./point";
import TileTypeBase from "./tileTypeBase";
import type TileTypeInterface from "./tileTypeInterface";

/**
 * 0 -> point
 * 1 -> nothing
 * 2 -> next Connection Element
 */
type T_ConnectionState = [0, Point] | [1, null] | [2, Connection];

export default class Connection extends TileTypeBase implements TileTypeInterface {

    private previous: T_ConnectionState;
    private previousDirection: ValueOf<T_Directions>;

    private next: T_ConnectionState = [1, null];
    private nextDirection: ValueOf<T_Directions> = CONSTANTS.DIRECTIONS.TOP;

    private registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void;

    constructor(colorTWCSS: ValueOf<T_Colors>, tile: Tile, previous: T_ConnectionState, previousDirection: ValueOf<T_Directions>, registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void) {
        super(tile, colorTWCSS);

        this.tile.setTileType(this);

        this.previous = previous;
        this.previousDirection = previousDirection;

        this.registerMoveDetection = registerMoveDetection;

        this.setClassName();
        this.setupInteraction();

        this.setupInteraction = this.setupInteraction.bind(this);
    }

    //
    // - interaction
    //

    setupInteraction() {
        this.registerMoveDetection(this.interactionMove.bind(this), this.interactionUp.bind(this));
    }

    private addEventListeners() {
        this.element.addEventListener("mousedown", this.setupInteraction);
        this.subElement.addEventListener("mousedown", this.setupInteraction);
    }

    private removeEventListeners() {
        this.element.removeEventListener("mousedown", this.setupInteraction);
        this.subElement.removeEventListener("mousedown", this.setupInteraction);
    }

    interactionMove(e: MouseEvent) {
        // get next tile
        const [targetTile, direction] = this.tile.getAdjacentTileIfCollision(e.clientX, e.clientY);
        if (targetTile === null || targetTile.isBlocked()) return;

        // move to an empty tile
        if (targetTile.isEmpty()) {
            // new connection
            this.next = [2, new Connection(this.colorTWCSS, targetTile, [2, this], direction, this.registerMoveDetection)];

            // update own style
            this.nextDirection = direction;
            this.setClassName();
        }

        // connect with point
        const [isPoint, point] = targetTile.isPoint();
        if (isPoint && point.tryConnect(this, direction)) {
            this.next = [0, point];
            // update own style
            this.nextDirection = direction;
            this.setClassName();
        }

        // backtrack
        const connection = targetTile.isConnection();
        if (this.previous[0] === 2 && connection === this.previous[1]) {
            this.deleteSelf();
            connection.receiveBacktrack();
        
        // sever other connection
        } else if (connection !== null && !connection.connectionIncludesElement(this)) {
            console.log("CUT!");
            connection.severStart();
        }
        
        // remove old event listeners
        this.removeEventListeners();
    }

    interactionUp(e: MouseEvent) {
        // set event listener so that the connection can be continued later on
        // but only if the connection is not connected to a point
        if (this.previous[0] === 1 || this.next[0] === 1) this.addEventListeners();
    }

    //
    //
    //

    setClassName() {
        // previous element exists but no next element
        //  > previous element is point or another connection element
        //  > next element does not exist
        if (this.previous[0] !== 1 && this.next[0] === 1) {

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

            this.subElement.className = "";
        }
            
        // previous and next element both exist
        //  > previous element is point or another connection element
        //  > next element is point or another connection element
        if (this.previous[0] !== 1 && this.next[0] !== 1) {

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
    // - sever
    //

    private severRecursivelyPrevious(): boolean {
        // do not delete if connected to point
        if (this.previous[0] === 0) return false;

        // delete self if previous is <null>
        if (this.previous[0] === 1) {
            this.deleteSelf();
            return true;
        
        // delete if previous says so (is not connected to point)
        } else if (this.previous[1].severRecursivelyPrevious()) {
            this.deleteSelf();
            return true;

        // otherwise do nothing
        } else {
            return false;
        }
    }

    private severRecursivelyNext(): boolean {
        // do not delete if connected to point
        if (this.next[0] === 0) return false;

        // delete self if next is <null>
        if (this.next[0] === 1) {
            this.deleteSelf();
            return true;
        
        // delete if next says so (is not connected to point)
        } else if (this.next[1].severRecursivelyNext()) {
            this.deleteSelf();
            return true;

        // otherwise do nothing
        } else {
            return false;
        }
    }

    private severStart() {
        this.deleteSelf();

        if (this.previous[0] === 2) {
            this.previous[1].deleteNext();
            if (!this.previous[1].severRecursivelyPrevious()) this.previous[1].addEventListeners();
        }
        
        if (this.next[0] === 2) {
            this.next[1].deletePrevious();
            if (!this.next[1].severRecursivelyNext()) this.next[1].addEventListeners();
        }

    }

    connectionIncludesElement(connection: Connection, dir: undefined | 0 | 1 = undefined): boolean {
        if (this === connection) return true;

        if (dir === 0) {
            return this.previous[0] === 2? this.previous[1].connectionIncludesElement(connection, 0) : false;
        } else if (dir === 1) {
            return this.next[0] === 2? this.next[1].connectionIncludesElement(connection, 1) : false;
        } else { // for undefined
            return this.previous[0] === 2? this.previous[1].connectionIncludesElement(connection, 0) : false || this.next[0] === 2? this.next[1].connectionIncludesElement(connection, 1) : false;
        }
    }

    //
    // - backtrack
    //

    receiveBacktrack() {
        this.next = [1, null];
        this.setupInteraction();
        this.setClassName();
    }

    //
    // - delete
    //

    private deleteSelf() {
        this.tile.setTileType(null);
    }

    deletePrevious() {
        this.previous = [1, null];
        this.setClassName();
    }

    deleteNext() {
        this.next = [1, null];
        this.setClassName();
    }

    private deleteRecursivelyPrevious() {
        this.deleteSelf();

        // if previous is a point
        if (this.previous[0] === 0) {
            this.previous[1].disconnect();
            return;
        }

        // if previous is a connection
        if (this.previous[0] === 2) {
            this.previous[1].deleteRecursivelyPrevious();
        }
    }

    private deleteRecursivelyNext() {
        this.deleteSelf();

        // if next is a point
        if (this.next[0] === 0) {
            this.next[1].disconnect();
            return;
        }

        // if next is a connection
        if (this.next[0] === 2) {
            this.next[1].deleteRecursivelyNext();
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