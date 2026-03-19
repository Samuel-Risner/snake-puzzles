export type ValueOf<T> = T[keyof T];

export type T_TileTypeName = "EMPTY" | "POINT" | "CONNECTION";
export type T_TileTypeNumber = Record<T_TileTypeName, number>;

export type T_ColorName = "RED" | "GREEN" | "YELLOW" | "BLUE";
export type T_Colors = Record<T_ColorName, string>;
export type T_ColorNumbers = Record<T_ColorName, number>;

export type T_GameFieldData = {
    points: {
        head: [number, number];
        tail: [number, number];
        color: T_ColorName;
    }[];
}

type X = {
    tileType: T_TileTypeNumber["POINT"];
    color: T_ColorName;
}

export type T_GameFieldDataProcessed = Map<number, Map<number, X>>