import { Tile } from "./tile";

export class Board {
    tiles: Tile[][];

    constructor(tiles: Tile[][]) {
        this.tiles = tiles;
    }
}