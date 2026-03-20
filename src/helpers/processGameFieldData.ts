import CONSTANTS from "../constants";
import type { T_GameFieldData, T_GameFieldDataProcessed } from "../types";

/**
 * Converts the passed data from type `T_GameFieldData` to type `T_GameFieldDataProcessed`
 * (type `T_GameFieldData` is better for creating games manually and type `T_GameFieldDataProcessed` is better to work with when coding)
 * 
 * @param data the data to convert
 * @returns the new converted data
 */
export default function processGameFieldData(data: T_GameFieldData): T_GameFieldDataProcessed {
    const m: T_GameFieldDataProcessed = new Map();

    data.points.forEach((point) => {
        for (let i: 1 | 2 = 1; i <= 2; i++) {
            const iString = String(i) as "1" | "2";

            let yMap = m.get(point[iString][0]);

            if (yMap === undefined) {
                yMap = new Map();
                m.set(point[iString][0], yMap);
            }

            yMap.set(point[iString][1], { tileType: CONSTANTS.TILE_TYPES.POINT, color: CONSTANTS.COLORS[point.color] });
        }
    });

    return m;
}