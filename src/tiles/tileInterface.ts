export default interface TileInterface {

    contains(x: number, y: number): boolean;

    isIntractable(): boolean;

    //
    // - create HTML elements
    //

    /**
     * Starts the recursive creation for all the tiles
     * Also sets the styling for the passed parent element
     * 
     * @param parent the HTML element to which all the tiles will be appended to
     * @param fieldData data required for creating the game field
     */
    startCreateElementRecursive(parent: HTMLElement): void;

    /**
     * Creates the column for the tiles
     * Recursively calls the tile on the right
     * Starts the recursive chain for creating the single tiles
     * 
     * @param parent the HTML element to which the column which will be created will be appended to
     */
    _createElementRecursiveCol(parent: HTMLElement): void;

    /**
     * Creates a HTML element containing everything connected to the tile
     * Calls the tile below recursively to continue
     * 
     * @param parent the HTML element to which the created tile will be appended to
     */
    _createElementRecursiveTile(parent: HTMLElement): void;

}