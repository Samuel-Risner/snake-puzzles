import CONSTANTS from "./constants";
import type { T_GameFieldData, T_GameFieldDataProcessed } from "./types";

export default function processGameFieldData(d: T_GameFieldData): T_GameFieldDataProcessed {
    const m: T_GameFieldDataProcessed = new Map();

    d.points.forEach((p) => {
        let yMap = m.get(p.head[0]);

        if (yMap === undefined) {
            yMap = new Map();
            m.set(p.head[0], yMap);
        }

        yMap.set(p.head[1], { tileType: CONSTANTS.TILE_TYPES.POINT, color: CONSTANTS.COLORS[p.color] });

        yMap = m.get(p.tail[0]);
    
        if (yMap === undefined) {
            yMap = new Map();
            m.set(p.tail[0], yMap);
        }
    
        yMap.set(p.tail[1], { tileType: CONSTANTS.TILE_TYPES.POINT, color: CONSTANTS.COLORS[p.color] });
    })

    return m;
}