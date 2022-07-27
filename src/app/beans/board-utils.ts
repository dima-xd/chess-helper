import { Coordinate } from "./coordinate";
import { Tile } from "./tile";
import { Piece } from "./piece";

export class BoardUtils {

    static initBoard() {
        let chars = "abcdefghijklmnopqrstuvwxyz";
        
        let tiles: Tile[][] = [];
        for (let i = 0; i < 8; i++) {
            tiles[i] = [];
            for (let j = 0; j < 8; j++) {
                tiles[i][j] = new Tile(new Coordinate(chars[j], i+1), Piece.Empty);
            }
        }

        tiles[0][0] = new Tile(new Coordinate(chars[0], 8), Piece.RookBlack);
        tiles[0][1] = new Tile(new Coordinate(chars[1], 8), Piece.KnightBlack);
        tiles[0][2] = new Tile(new Coordinate(chars[2], 8), Piece.BishopBlack);
        tiles[0][3] = new Tile(new Coordinate(chars[3], 8), Piece.QueenBlack);
        tiles[0][4] = new Tile(new Coordinate(chars[4], 8), Piece.KingBlack);
        tiles[0][5] = new Tile(new Coordinate(chars[5], 8), Piece.BishopBlack);
        tiles[0][6] = new Tile(new Coordinate(chars[6], 8), Piece.KnightBlack);
        tiles[0][7] = new Tile(new Coordinate(chars[7], 8), Piece.RookBlack);

        tiles[1][0] = new Tile(new Coordinate(chars[0], 7), Piece.PawnBlack);
        tiles[1][1] = new Tile(new Coordinate(chars[1], 7), Piece.PawnBlack);
        tiles[1][2] = new Tile(new Coordinate(chars[2], 7), Piece.PawnBlack);
        tiles[1][3] = new Tile(new Coordinate(chars[3], 7), Piece.PawnBlack);
        tiles[1][4] = new Tile(new Coordinate(chars[4], 7), Piece.PawnBlack);
        tiles[1][5] = new Tile(new Coordinate(chars[5], 7), Piece.PawnBlack);
        tiles[1][6] = new Tile(new Coordinate(chars[6], 7), Piece.PawnBlack);
        tiles[1][7] = new Tile(new Coordinate(chars[7], 7), Piece.PawnBlack);

        tiles[6][0] = new Tile(new Coordinate(chars[0], 2), Piece.PawnWhite);
        tiles[6][1] = new Tile(new Coordinate(chars[1], 2), Piece.PawnWhite);
        tiles[6][2] = new Tile(new Coordinate(chars[2], 2), Piece.PawnWhite);
        tiles[6][3] = new Tile(new Coordinate(chars[3], 2), Piece.PawnWhite);
        tiles[6][4] = new Tile(new Coordinate(chars[4], 2), Piece.PawnWhite);
        tiles[6][5] = new Tile(new Coordinate(chars[5], 2), Piece.PawnWhite);
        tiles[6][6] = new Tile(new Coordinate(chars[6], 2), Piece.PawnWhite);
        tiles[6][7] = new Tile(new Coordinate(chars[7], 2), Piece.PawnWhite);

        tiles[7][0] = new Tile(new Coordinate(chars[0], 1), Piece.RookWhite);
        tiles[7][1] = new Tile(new Coordinate(chars[1], 1), Piece.KnightWhite);
        tiles[7][2] = new Tile(new Coordinate(chars[2], 1), Piece.BishopWhite);
        tiles[7][3] = new Tile(new Coordinate(chars[3], 1), Piece.QueenWhite);
        tiles[7][4] = new Tile(new Coordinate(chars[4], 1), Piece.KingWhite);
        tiles[7][5] = new Tile(new Coordinate(chars[5], 1), Piece.BishopWhite);
        tiles[7][6] = new Tile(new Coordinate(chars[6], 1), Piece.KnightWhite);
        tiles[7][7] = new Tile(new Coordinate(chars[7], 1), Piece.RookWhite);

        return tiles;
    }
}