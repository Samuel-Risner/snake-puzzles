export default interface TileInterface {

    //
    // - create HTML elements
    //

    /**
     * Starts the recursive creation for all the tiles
     * 
     * @param parent the HTML element to which all the tiles will be appended to
     */
    startCreateElementRecursive(parent: HTMLElement): void;
    /**
     * Creates the column for the tiles
     * Recursively calls the tile on the right
     * Starts the recursive chain for creating the single tiles
     * 
     * @param parent the HTML element to which the column which will be created will be appended to
     * @returns `true` if the object is from `TileEnd` otherwise `false` (`true` indicates that the previous tiles needs to have a border on the right)
     */
    _createElementRecursiveCol(parent: HTMLElement): boolean;
    /**
     * Creates a HTML element containing everything connected to the tile
     * Calls the tile below recursively to continue
     * 
     * @param parent the HTML element to which the created tile will be appended to
     * @param requiresBorderRight if the element requires a border on the right side (only when the tile is on the very right of the game field)
     * @return `true` if the object is from `TileEnd` otherwise `false` (`true` indicates that the previous tile needs to have a border on the bottom)
     */
    _createElementRecursiveTile(parent: HTMLElement, requiresBorderRight: boolean): boolean;

}