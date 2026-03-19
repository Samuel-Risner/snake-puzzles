import type TileInterface from "./tileInterface";

export default class TileEnd implements TileInterface {

    contains(): boolean {
        return false;
    }

    isIntractable(): boolean {
        return false;
    }

    startCreateElementRecursive() {}
    _createElementRecursiveCol() {}
    _createElementRecursiveTile() {}

}