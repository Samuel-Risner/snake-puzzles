import CONSTANTS from "../constants";
import Connection from "../tileTypes/connection";
import Point from "../tileTypes/point";
import type TileTypeInterface from "../tileTypes/tileTypeInterface";
import type { T_ColorName, T_Colors, T_GameFieldDataProcessed, ValueOf } from "../types";
import type TileEnd from "./tileEnd";
import type TileInterface from "./tileInterface";

export default class Tile implements TileInterface {

    private tileTop: TileInterface;
    private tileBottom: TileInterface;
    private tileLeft: TileInterface;
    private tileRight: TileInterface;

    private x: number;
    private y: number;

    private tileElement: HTMLElement;
    private tileTypeElement: TileTypeInterface | null;

    constructor(tileEnd: TileEnd, x: number, y: number, fieldData: T_GameFieldDataProcessed, registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void) {
        this.tileTop = tileEnd;
        this.tileBottom = tileEnd;
        this.tileLeft = tileEnd;
        this.tileRight = tileEnd;

        this.x = x;
        this.y = y;

        this.tileElement = document.createElement("div");

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

        if (this.tileTypeElement !== null) this.tileElement.appendChild(this.tileTypeElement.getHTML());
    }

    contains(x: number, y: number): boolean {
        const rect = this.tileElement.getBoundingClientRect();

        
        return false;
    }

    //
    // - create HTML element
    //

    startCreateElementRecursive(parent: HTMLElement): void {
        parent.className = "flex flex-row";
        this._createElementRecursiveCol(parent);
    }

    _createElementRecursiveCol(parent: HTMLElement): boolean {
        const newParent = document.createElement("div");
        newParent.className = "flex flex-col";
        parent.appendChild(newParent);

        const requiresBorderRight = this.tileRight._createElementRecursiveCol(parent);

        this._createElementRecursiveTile(newParent, requiresBorderRight);

        return false;
    }

    _createElementRecursiveTile(parent: HTMLElement, requiresBorderRight: boolean): boolean {
        parent.appendChild(this.tileElement);

        const requiresBorderBottom = this.tileBottom._createElementRecursiveTile(parent, requiresBorderRight);

        this.tileElement.className = `w-8 h-8 flex border-black border-t-2 border-l-2 ${requiresBorderRight? "border-r-2" : ""} ${requiresBorderBottom? "border-b-2" : ""}`

        return false;
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