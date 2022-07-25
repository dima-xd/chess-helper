import { Coordinate } from "./coordinate";
import { Piece } from "./piece";

export class Tile {
    coordinate: Coordinate;
    piece: Piece;

    constructor(coordinate: Coordinate, piece: Piece) {
        this.coordinate = coordinate;
        this.piece = piece;
    }
}