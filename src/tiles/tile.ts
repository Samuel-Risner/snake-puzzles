import type TileEnd from "./tileEnd";
import type TileInterface from "./tileInterface";

export default class Tile implements TileInterface {

    private tileTop: TileInterface;
    private tileBottom: TileInterface;
    private tileLeft: TileInterface;
    private tileRight: TileInterface;

    private x: number;
    private y: number;

    constructor(tileEnd: TileEnd, x: number, y: number) {
        this.tileTop = tileEnd;
        this.tileBottom = tileEnd;
        this.tileLeft = tileEnd;
        this.tileRight = tileEnd;

        this.x = x;
        this.y = y;
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
        const e = document.createElement("div");
        parent.appendChild(e);

        const requiresBorderBottom = this.tileBottom._createElementRecursiveTile(parent, requiresBorderRight);

        e.className = `w-8 h-8 bg-green-200 border-black border-t-2 border-l-2 ${requiresBorderRight? "border-r-2" : ""} ${requiresBorderBottom? "border-b-2" : ""}`

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