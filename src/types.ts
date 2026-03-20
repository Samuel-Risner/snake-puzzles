export type ValueOf<T> = T[keyof T];

export type T_TileTypeName = "BLOCKED" | "EMPTY" | "POINT" | "CONNECTION" | "CONNECTION_END";
export type T_TileTypeNumber = Record<T_TileTypeName, number>;

export type T_ColorName = "RED" | "GREEN" | "YELLOW" | "BLUE";
export type T_Colors = Record<T_ColorName, string>;

export type T_GameFieldData = {
    points: {
        1: [number, number];
        2: [number, number];
        color: T_ColorName;
    }[];
}

type T_TileData = {
    tileType: T_TileTypeNumber["POINT"];
    color: ValueOf<T_Colors>;
}
/**
 * first map key is the x-coordinate
 * second map key is the y-coordinate
 */
export type T_GameFieldDataProcessed = Map<number, Map<number, T_TileData>>;


type T_DirectionNames = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";
export type T_Directions = Record<T_DirectionNames, number>;

export type T_RegisterMoveDetectionFunc = (move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) => void;