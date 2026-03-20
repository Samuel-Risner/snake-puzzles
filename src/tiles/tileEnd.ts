import type TileInterface from "./tileInterface";

export default class TileEnd implements TileInterface {

    isBlocked(): boolean {
        return true;
    }
    
    collision(): boolean {
        return false;
    }

    startCreateElementRecursive() {}
    _createElementRecursiveCol() {}
    _createElementRecursiveTile() {}

}