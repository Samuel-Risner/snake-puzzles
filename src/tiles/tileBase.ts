export default abstract class TileBase {

    isBlocked(): boolean {
        return true;
    }
    
    collision(x: number, y: number): boolean {
        return false;
    }

    startCreateElementRecursive(parent: HTMLDivElement) {}
    _createElementRecursiveCol(parent: HTMLDivElement) {}
    _createElementRecursiveTile(parent: HTMLDivElement) {}
}