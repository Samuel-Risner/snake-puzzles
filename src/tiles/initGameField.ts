import type { T_GameFieldDataProcessed } from "../types";
import Tile from "./tile";
import TileEnd from "./tileEnd";

/**
 * Links a tile to the tiles around it (top, bottom, left, right)
 * If there is no tile on either the top, bottom, left ot right that step is skipped
 * 
 * @param x x position of the tile to handle
 * @param y z position of the tile to handle
 * @param width width of the game field
 * @param height height of the game field
 * @param filed the game field
 */
function linkTile(x: number, y: number, width: number, height: number, filed: Tile[][]) {
    // top
    if (y > 0) filed[x][y].setTileTop(filed[x][y - 1]);
    
    // bottom
    if (y < height - 1) filed[x][y].setTileBottom(filed[x][y + 1]);
    
    // left
    if (x > 0) filed[x][y].setTileLeft(filed[x - 1][y]);
    
    // right
    if (x < width - 1) filed[x][y].setTileRight(filed[x + 1][y]);
}

/**
 * Creates a new game field filled with already linked tiles
 * 
 * @param width width of the game field that will be created
 * @param height height of the game field that will be created
 * 
 * @returns the created game field
 */
export default function initGameField(width: number, height: number, fieldData: T_GameFieldDataProcessed, registerMoveDetection: (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void): Tile[][] {
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
            linkTile(x, y, width, height, field);
        }
    }

    return field;
}