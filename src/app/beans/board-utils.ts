import { Coordinate } from "./coordinate";
import { Tile } from "./tile";

export class BoardUtils {

    static initBoard() {
        let chars = "abcdefghijklmnopqrstuvwxyz";
        
        let tiles: Tile[][] = [];
        for (let i = 0; i < 8; i++) {
            tiles[i] = [];
            for (let j = 0; j < 8; j++) {
                tiles[i][j] = new Tile(new Coordinate(chars[j], i+1));
            }
        }
        return tiles;
    }
}