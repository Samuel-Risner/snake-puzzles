import CONSTANTS from "../constants";
import invertDirection from "../helpers/inertDirection";
import type Tile from "../tiles/tile";
import type { ValueOf, T_ColorName, T_TileTypeNumber, T_Directions, T_Colors } from "../types";
import Connection from "./connection";
import TileTypeBase from "./tileTypeBase";
import type TileTypeInterface from "./tileTypeInterface";

export default class Point extends TileTypeBase implements TileTypeInterface {

    private connection: null | Connection = null;

    constructor(tile: Tile, colorTWCSS: ValueOf<T_Colors>, registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void) {
        super(tile, colorTWCSS);

        this.tile = tile;

        this.element.className = `absolute rounded-full ${this.colorTWCSS} ${CONSTANTS.SIZES.POINT.W} ${CONSTANTS.SIZES.POINT.H} ${CONSTANTS.SIZES.POINT.POS} ${CONSTANTS.SIZES.POINT.Z}`;

        const move = (e: MouseEvent) => {
            const [targetTile, direction] = this.tile.getAdjacentTileIfCollision(e.clientX, e.clientY);
            if (targetTile === null) return;

            // delete previous connection
            if (this.connection !== null) {
                this.connection.deleteRecursively();
                this.styleSubElement(null);
            }

            // new connection
            this.connection = new Connection(colorTWCSS, targetTile, [0, this], direction, registerMoveDetection);
            this.styleSubElement(direction);
        }

        const up = (e: MouseEvent) => {
            // when clicking the point the connections will be deleted
            if (this.tile.collision(e.clientX, e.clientY) && this.connection !== null) {
                this.connection.deleteRecursively();
                this.styleSubElement(null);
            } 
        }

        this.element.addEventListener("mousedown", (e: MouseEvent) => {
            registerMoveDetection(move, up);
        });
    }

    private styleSubElement(direction: ValueOf<T_Directions> | null) {
        switch (direction) {
            case CONSTANTS.DIRECTIONS.TOP:
                this.subElement.className = `absolute rounded-t-full
                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_BOTTOM}
                    ${this.colorTWCSS}
                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                    ${CONSTANTS.SIZES.CONNECTION.END_H}
                `;
                break;
                
                case CONSTANTS.DIRECTIONS.BOTTOM:
                this.subElement.className = `absolute rounded-b-full
                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_TOP}
                    ${this.colorTWCSS}
                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W}
                    ${CONSTANTS.SIZES.CONNECTION.END_H}
                `;
                break;
                
                case CONSTANTS.DIRECTIONS.LEFT:
                this.subElement.className = `absolute rounded-l-full
                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_RIGHT}
                    ${this.colorTWCSS}
                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                    ${CONSTANTS.SIZES.CONNECTION.END_W}
                `;
                break;
                
                case CONSTANTS.DIRECTIONS.RIGHT:
                this.subElement.className = `absolute rounded-r-full
                    ${CONSTANTS.SIZES.CONNECTION.POS_NO_SPACE_LEFT}
                    ${this.colorTWCSS}
                    ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H}
                    ${CONSTANTS.SIZES.CONNECTION.END_W}
                `;
                break;
            
            // case null:
            default: this.subElement.className = "";
        }
    }

    //
    //
    //

    tryConnect(connection: Connection, direction: ValueOf<T_Directions>): boolean {
        // can be connected
        if ((this.connection === null || !this.connection.connectionIncludesElement(connection)) && this.colorMatches(connection)) {
            this.connection = connection;
            this.styleSubElement(invertDirection(direction));
            return true;
        }

        return false;
    }

    disconnect() {
        this.connection = null;
        this.styleSubElement(null);
    }

    //
    // - getters
    //

    getTileType(): ValueOf<T_TileTypeNumber> {
        return CONSTANTS.TILE_TYPES.POINT;
    }
}