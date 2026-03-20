import type { T_GameFieldDataProcessed, T_RegisterMoveDetectionFunc } from "../types";
import Tile from "../tiles/tile";
import TileEnd from "../tiles/tileEnd";

/**
 * Links a tile to the tiles around it (top, bottom, left, right)
 * If there is no tile on either the top, bottom, left ot right that step is skipped
 * 
 * @param x x position of the tile to handle
 * @param y y position of the tile to handle
 * @param field the game field
 */
function linkTile(x: number, y: number, field: Tile[][]) {
    const width = field.length;
    const height = field[0].length;

    // top
    if (y > 0) field[x][y].setTileTop(field[x][y - 1]);
    
    // bottom
    if (y < height - 1) field[x][y].setTileBottom(field[x][y + 1]);
    
    // left
    if (x > 0) field[x][y].setTileLeft(field[x - 1][y]);
    
    // right
    if (x < width - 1) field[x][y].setTileRight(field[x + 1][y]);
}

/**
 * Creates a new game field filled with already linked tiles
 * 
 * @param width width of the game field that will be created
 * @param height height of the game field that will be created
 * 
 * @returns the created game field
 */
export default function initGameField(width: number, height: number, fieldData: T_GameFieldDataProcessed, registerMoveDetection: T_RegisterMoveDetectionFunc): Tile[][] {
    const tileEnd = new TileEnd();
    const field: Tile[][] = [];

    // fill field with tiles
    for (let x = 0; x < width; x++) {
        const column: Tile[] = [];
        field.push(column);

        for (let y = 0; y < height; y++) {
            column.push(new Tile(tileEnd, x, y, fieldData, registerMoveDetection));
        }
    }

    // link tiles
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            linkTile(x, y, field);
        }
    }

    return field;
}