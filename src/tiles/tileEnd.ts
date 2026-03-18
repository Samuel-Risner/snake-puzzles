import type TileInterface from "./tileInterface";

export default class TileEnd implements TileInterface {

    startCreateElementRecursive(parent: HTMLElement): void {}

    _createElementRecursiveCol(parent: HTMLElement): boolean {
        return true;
    }

    _createElementRecursiveTile(parent: HTMLElement, requiresBorderRight: boolean): boolean {
        return true;
    }

}