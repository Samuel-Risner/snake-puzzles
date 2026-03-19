import CONSTANTS from "../constants";
import Point from "../tileTypes/point";
import type TileTypeInterface from "../tileTypes/tileTypeInterface";
import type { T_ColorName, T_Directions, T_GameFieldDataProcessed, ValueOf } from "../types";
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
        let color: T_ColorName = "RED";
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

    contains(x: number, y: number): boolean {
        const rect = this.element.getBoundingClientRect();

        return (rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height);
    }

    isIntractable(): boolean {
        if (this.tileTypeElement === null) return true;

        return this.tileTypeElement.getTileType() === CONSTANTS.TILE_TYPES.EMPTY;
    }

    getAdjacentTileIfContains(x: number, y: number): [null | Tile, ValueOf<T_Directions>] {
        if (this.tileTop.contains(x, y) && this.tileTop.isIntractable()) return [this.tileTop as Tile, CONSTANTS.DIRECTIONS.BOTTOM];
        if (this.tileBottom.contains(x, y) && this.tileBottom.isIntractable()) return [this.tileBottom as Tile, CONSTANTS.DIRECTIONS.TOP];
        if (this.tileLeft.contains(x, y) && this.tileLeft.isIntractable()) return [this.tileLeft as Tile, CONSTANTS.DIRECTIONS.RIGHT];
        if (this.tileRight.contains(x, y) && this.tileRight.isIntractable()) return [this.tileRight as Tile, CONSTANTS.DIRECTIONS.LEFT];

        return [null, CONSTANTS.DIRECTIONS.TOP];
    }

    //
    // - create HTML elements recursively
    //

    startCreateElementRecursive(parent: HTMLElement) {
        parent.className = `flex flex-row z-0 ${CONSTANTS.SIZES.TILE.BORDER}`;
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