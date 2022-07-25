import { Coordinate } from "./coordinate";
import { Tile } from "./tile";
import { Piece } from "./piece";

export class BoardUtils {

    static initBoard() {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        let tiles: Tile[][] = [];
        for (let i = 0; i < 8; i++) {
            tiles[i] = [];
            for (let j = 0; j < 8; j++) {
                tiles[i][j] = new Tile(new Coordinate(chars[j], i+1), Piece.Empty);
            }
        }

        tiles[0][0] = new Tile(new Coordinate('A', 8), Piece.RookBlack);
        tiles[0][1] = new Tile(new Coordinate('B', 8), Piece.KnightBlack);
        tiles[0][2] = new Tile(new Coordinate('C', 8), Piece.BishopBlack);
        tiles[0][3] = new Tile(new Coordinate('D', 8), Piece.QueenBlack);
        tiles[0][4] = new Tile(new Coordinate('E', 8), Piece.KingBlack);
        tiles[0][5] = new Tile(new Coordinate('F', 8), Piece.BishopBlack);
        tiles[0][6] = new Tile(new Coordinate('G', 8), Piece.KnightBlack);
        tiles[0][7] = new Tile(new Coordinate('H', 8), Piece.RookBlack);

        tiles[1][0] = new Tile(new Coordinate('A', 7), Piece.PawnBlack);
        tiles[1][1] = new Tile(new Coordinate('B', 7), Piece.PawnBlack);
        tiles[1][2] = new Tile(new Coordinate('C', 7), Piece.PawnBlack);
        tiles[1][3] = new Tile(new Coordinate('D', 7), Piece.PawnBlack);
        tiles[1][4] = new Tile(new Coordinate('E', 7), Piece.PawnBlack);
        tiles[1][5] = new Tile(new Coordinate('F', 7), Piece.PawnBlack);
        tiles[1][6] = new Tile(new Coordinate('G', 7), Piece.PawnBlack);
        tiles[1][7] = new Tile(new Coordinate('H', 7), Piece.PawnBlack);

        tiles[6][0] = new Tile(new Coordinate('A', 2), Piece.PawnWhite);
        tiles[6][1] = new Tile(new Coordinate('B', 2), Piece.PawnWhite);
        tiles[6][2] = new Tile(new Coordinate('C', 2), Piece.PawnWhite);
        tiles[6][3] = new Tile(new Coordinate('D', 2), Piece.PawnWhite);
        tiles[6][4] = new Tile(new Coordinate('E', 2), Piece.PawnWhite);
        tiles[6][5] = new Tile(new Coordinate('F', 2), Piece.PawnWhite);
        tiles[6][6] = new Tile(new Coordinate('G', 2), Piece.PawnWhite);
        tiles[6][7] = new Tile(new Coordinate('H', 2), Piece.PawnWhite);

        tiles[7][0] = new Tile(new Coordinate('A', 1), Piece.RookWhite);
        tiles[7][1] = new Tile(new Coordinate('B', 1), Piece.KnightWhite);
        tiles[7][2] = new Tile(new Coordinate('C', 1), Piece.BishopWhite);
        tiles[7][3] = new Tile(new Coordinate('D', 1), Piece.QueenWhite);
        tiles[7][4] = new Tile(new Coordinate('E', 1), Piece.KingWhite);
        tiles[7][5] = new Tile(new Coordinate('F', 1), Piece.BishopWhite);
        tiles[7][6] = new Tile(new Coordinate('G', 1), Piece.KnightWhite);
        tiles[7][7] = new Tile(new Coordinate('H', 1), Piece.RookWhite);

        return tiles;
    }
}