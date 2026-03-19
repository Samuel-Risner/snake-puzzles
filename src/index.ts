import "./index.css";
import processGameFieldData from "./processGameFieldData";
import initGameField from "./tiles/initGameField";
import type { T_GameFieldDataProcessed } from "./types";

const GAME_FIELD_DATA: T_GameFieldDataProcessed = processGameFieldData({
    points: [
        {
            head: [0, 0],
            tail: [5, 5],
            color: "RED"

        },
        {
            head: [2, 2],
            tail: [7, 5],
            color: "BLUE"

        }
    ]
});

const ROOT_EL = document.getElementById("root") as HTMLDivElement;
let gameContainer = document.createElement("div");

let lastMove: null | ((e: MouseEvent) => void) = null;
let lastUp: null | ((e: MouseEvent) => void) = null;

function registerMoveDetection(move: (e: MouseEvent) => void, up: (e: MouseEvent) => void) {
    unregisterMouseDetection();

    const betterUp = (e: MouseEvent) => {
        up(e);
        unregisterMouseDetection();
    }

    lastMove = move;
    lastUp = betterUp;

    gameContainer.addEventListener("mousemove", move);
    gameContainer.addEventListener("mouseup", betterUp);
}

function unregisterMouseDetection() {
    if (lastMove !== null) gameContainer.removeEventListener("mousemove", lastMove);
    if (lastUp !== null) gameContainer.removeEventListener("mouseup", lastUp);
}

let gameField = initGameField(10, 10, GAME_FIELD_DATA, registerMoveDetection);
gameField[0][0].startCreateElementRecursive(gameContainer);

ROOT_EL.appendChild(gameContainer);