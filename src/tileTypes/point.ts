import CONSTANTS from "../constants";
import type Tile from "../tiles/tile";
import type { ValueOf, T_ColorNumbers, T_ColorName, T_TileTypeNumber, T_Directions } from "../types";
import Connection from "./connection";
import type TileTypeInterface from "./tileTypeInterface";

export default class Point implements TileTypeInterface {

    private tile: Tile;

    private connection: null | Connection = null;

    private colorNumber: ValueOf<T_ColorNumbers>;
    private color: string;
    private element: HTMLElement;
    private subElement: HTMLDivElement;

    constructor(tile: Tile, colorName: T_ColorName, registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void) {
        this.tile = tile;
        
        this.colorNumber = CONSTANTS.COLOR_NUMBERS[colorName];
        this.color = CONSTANTS.COLORS[colorName];

        this.element = document.createElement("div");
        this.element.className = `w-6 h-6 rounded-full ${this.color}`;

        this.subElement = document.createElement("div");
        this.element.appendChild(this.subElement);

        const move = (e: MouseEvent) => {
            // when returning to the point the connections will be deleted
            if (this.tile.contains(e.clientX, e.clientY) && this.connection !== null) {
                this.connection.deleteRecursively();
                this.styleSubElement(null);
            }

            const [targetTile, direction] = this.tile.getAdjacentTileIfContains(e.clientX, e.clientY);
            if (targetTile === null) return;

            // delete previous connection
            if (this.connection !== null) {
                this.connection.deleteRecursively();
                this.styleSubElement(null);
            }

            // new connection
            this.connection = new Connection(colorName, targetTile, true, direction);
            this.styleSubElement(direction);
        }

        const up = (e: MouseEvent) => {
            // when clicking the point the connections will be deleted
            if (this.tile.contains(e.clientX, e.clientY) && this.connection !== null) {
                this.connection.deleteRecursively();
                this.styleSubElement(null);
            } 
        }

        this.element.addEventListener("mousedown", (e: MouseEvent) => {
            console.log(e.clientX);
            console.log(e.clientY);

            registerMoveDetection(move, up);
        })
    }

    private styleSubElement(direction: ValueOf<T_Directions> | null) {
        switch (direction) {
            case CONSTANTS.DIRECTIONS.TOP:
                this.subElement.className = `m-1 ${this.color} ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W} ${CONSTANTS.SIZES.CONNECTION.HALF_H}`;
                break;
                
                case CONSTANTS.DIRECTIONS.BOTTOM:
                this.subElement.className = `-mt-1 mx-1 ${this.color} ${CONSTANTS.SIZES.CONNECTION.THICKNESS_W} ${CONSTANTS.SIZES.CONNECTION.HALF_H}`;
                break;
                
                case CONSTANTS.DIRECTIONS.LEFT:
                this.subElement.className = `m-1 ${this.color} ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H} ${CONSTANTS.SIZES.CONNECTION.HALF_W}`;
                break;
                
                case CONSTANTS.DIRECTIONS.RIGHT:
                this.subElement.className = `-ml-1 my-1 ${this.color} ${CONSTANTS.SIZES.CONNECTION.THICKNESS_H} ${CONSTANTS.SIZES.CONNECTION.HALF_W}`;
                break;
            
            // case null:
            default: this.subElement.className = "";
        }
    }


    getTileType(): ValueOf<T_TileTypeNumber> {
        return CONSTANTS.TILE_TYPES.POINT;
    }

    getHTML(): HTMLElement {
        return this.element;
    }
}