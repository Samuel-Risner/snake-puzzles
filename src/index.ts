import "./index.css";
import initGameField from "./tiles/initGameField";
import type { T_GameFieldData } from "./types";

const GAME_FIELD_DATA: T_GameFieldData = {
    points: [
            {
            head: [0, 0],
            tail: [5, 5],
            color: "RED"

        }
    ]
};

const ROOT_EL = document.getElementById("root") as HTMLDivElement;
let gameContainer = document.createElement("div");

let gameField = initGameField(10, 10);
gameField[0][0].startCreateElementRecursive(gameContainer);

ROOT_EL.appendChild(gameContainer);