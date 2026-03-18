export type T_Colors = {
    RED: string;
    GREEN: string;
    YELLOW: string;
}

export type T_GameFieldData = {
    points: {
        head: [number, number];
        tail: [number, number];
        color: keyof T_Colors;
    }[];
}