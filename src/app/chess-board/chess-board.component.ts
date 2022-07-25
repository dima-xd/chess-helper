import { Component, OnInit } from '@angular/core';
import { Board } from '../beans/board';
import { BoardUtils } from '../beans/board-utils';
import { Coordinate } from '../beans/coordinate';
import { Piece } from '../beans/piece';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  board: Board | undefined;

  constructor() { }

  ngOnInit(): void {
    this.board = new Board(BoardUtils.initBoard());
  }

}
