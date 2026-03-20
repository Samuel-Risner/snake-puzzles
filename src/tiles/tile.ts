import CONSTANTS from "../constants";
import type Connection from "../tileTypes/connection";
import Point from "../tileTypes/point";
import type TileTypeInterface from "../tileTypes/tileTypeInterface";
import type { T_ColorName, T_Colors, T_Directions, T_GameFieldDataProcessed, ValueOf } from "../types";
import type TileEnd from "./tileEnd";
import type TileInterface from "./tileInterface";

export default class Tile implements TileInterface {

    private tileTop: TileInterface;
    private tileBottom: TileInterface;
    private tileLeft: TileInterface;
    private tileRight: TileInterface;

    private x: number;
    private y: number;

    private element: HTMLDivElement;
    private tileTypeElement: TileTypeInterface | null;

    constructor(tileEnd: TileEnd, x: number, y: number, fieldData: T_GameFieldDataProcessed, registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void) {
        this.tileTop = tileEnd;
        this.tileBottom = tileEnd;
        this.tileLeft = tileEnd;
        this.tileRight = tileEnd;

        this.x = x;
        this.y = y;

        this.element = document.createElement("div");

        // set tile type element
        let tileType = 0;
        let color: ValueOf<T_Colors> = "RED";
        const yMap = fieldData.get(x);
        if (yMap !== undefined) {
            const t = yMap.get(y);
            if (t !== undefined) {
                tileType = t.tileType;
                color = t.color;
            }
        }
        
        if (tileType === CONSTANTS.TILE_TYPES.POINT) {
            this.tileTypeElement = new Point(this, color, registerMoveDetection);
        } else {
            this.tileTypeElement = null;
        }

        if (this.tileTypeElement !== null) this.tileTypeElement.appendToParent(this.element);
    }

    /**
     * @implements
     */
    isBlocked(): boolean {
        if (this.tileTypeElement === null) return false;

        return this.tileTypeElement.getTileType() === CONSTANTS.TILE_TYPES.EMPTY;
    }

    isEmpty(): boolean {
        return this.tileTypeElement === null;
    }

    isPoint(): [true, Point] | [false, null] {
        if (this.tileTypeElement === null || this.tileTypeElement.getTileType() !== CONSTANTS.TILE_TYPES.POINT) return [false, null];

        return [true, this.tileTypeElement as Point];
    }

    isConnection(): Connection | null {
        if (this.tileTypeElement === null || this.tileTypeElement.getTileType() !== CONSTANTS.TILE_TYPES.CONNECTION) return null;

        return this.tileTypeElement as Connection;
    }

    /**
     * Checks if the coordinates collide with this tile (the HTML element)
     * 
     * @param x the x coordinate with which collision will be checked
     * @param y the y coordinate with which collision will be checked
     * @returns if a collision occurred (`true`) or not (`false`)
     */
    collision(x: number, y: number): boolean {
        const rect = this.element.getBoundingClientRect();

        return (rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height);
    }

    /**
     * Checks for collision with one of the neighboring 4 tiles (only if the tiles are not blocked)
     * 
     * @param x the x coordinate with which collision will be checked
     * @param y the x coordinate with which collision will be checked
     * @returns a tile and this tiles relative position to it (eg. if the tile is to the left of this tile `right` will be returned because this tile is to the left of the other one)
     */
    getAdjacentTileIfCollision(x: number, y: number): [null | Tile, ValueOf<T_Directions>] {
        if (this.tileTop.collision(x, y) && !this.tileTop.isBlocked()) return [this.tileTop as Tile, CONSTANTS.DIRECTIONS.BOTTOM];
        if (this.tileBottom.collision(x, y) && !this.tileBottom.isBlocked()) return [this.tileBottom as Tile, CONSTANTS.DIRECTIONS.TOP];
        if (this.tileLeft.collision(x, y) && !this.tileLeft.isBlocked()) return [this.tileLeft as Tile, CONSTANTS.DIRECTIONS.RIGHT];
        if (this.tileRight.collision(x, y) && !this.tileRight.isBlocked()) return [this.tileRight as Tile, CONSTANTS.DIRECTIONS.LEFT];

        return [null, -1];
    }

    //
    // - create HTML elements recursively
    //

    startCreateElementRecursive(parent: HTMLElement) {
        parent.className = `flex flex-row z-0 border-black w-fit ${CONSTANTS.SIZES.TILE.BORDER}`;
        this._createElementRecursiveCol(parent);
    }

    _createElementRecursiveCol(parent: HTMLElement) {
        const newParent = document.createElement("div");
        newParent.className = "flex flex-col";
        parent.appendChild(newParent);

        this.tileRight._createElementRecursiveCol(parent);
        this._createElementRecursiveTile(newParent);
    }

    _createElementRecursiveTile(parent: HTMLElement) {
        parent.appendChild(this.element);

        this.tileBottom._createElementRecursiveTile(parent);
        this.element.className = `${CONSTANTS.SIZES.TILE.W} ${CONSTANTS.SIZES.TILE.H} z-0 relative flex items-center justify-center border-black ${CONSTANTS.SIZES.TILE.BORDER}`
    }

    //
    // - more complex setters
    //

    /**
     * Removes previous HTML children and adds the new ones (unless `t` is `null`)
     * @param t either `null` if the tile should just be cleared or the new tile contents
     */
    setTileType(t: null | TileTypeInterface) {
        // remove previous HTML
        while (this.element.firstChild) this.element.removeChild(this.element.firstChild);

        this.tileTypeElement = t;

        if (t !== null) t.appendToParent(this.element);
    }

    //
    // - setters
    //

    setTileTop(tile: TileInterface) {
        this.tileTop = tile;
    }

    setTileBottom(tile: TileInterface) {
        this.tileBottom = tile;
    }

    setTileLeft(tile: TileInterface) {
        this.tileLeft = tile;
    }

    setTileRight(tile: TileInterface) {
        this.tileRight = tile;
    }

}