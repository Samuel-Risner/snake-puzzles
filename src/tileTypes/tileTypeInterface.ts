import type { T_TileTypeNumber, ValueOf } from "../types";

export default interface TileTypeInterface {

    getTileType(): ValueOf<T_TileTypeNumber>;

    getHTML(): HTMLElement;

}