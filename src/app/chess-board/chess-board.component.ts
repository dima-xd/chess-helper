import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Board } from '../beans/board';
import { BoardUtils } from '../beans/board-utils';
import { CdkDragDrop, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Piece } from '../beans/piece';
import { Coordinate } from '../beans/coordinate';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  board: Board | undefined;

  private whitePieces: Piece[] = [
    Piece.RookWhite, Piece.KnightWhite, Piece.BishopWhite, 
    Piece.QueenWhite, Piece.KingWhite, Piece.PawnWhite
  ];
  private blackPieces: Piece[] = [
    Piece.RookBlack, Piece.KnightBlack, Piece.BishopBlack, 
    Piece.QueenBlack, Piece.KingBlack, Piece.PawnBlack
  ];

  private isPieceClicked = false;
  private isFlushed = false;
  private isWhitesTurn = true;

  constructor() { }

  ngOnInit(): void {
    this.board = new Board(BoardUtils.initBoard());
  }
  
  startMovingPiece(event: CdkDragStart) {
    const source = event.source.element.nativeElement;
    const pieceTypeAttr = source.attributes.getNamedItem('pieceType');
    const pieceTypeValue = pieceTypeAttr?.value!;
    const coordinateI = source.getAttribute('coordinateI'), coordinateJ = source.getAttribute('coordinateJ');

    this.initPossibleMoves(pieceTypeValue, +coordinateI!, +coordinateJ!);
  }

  movePieceToTile(event: CdkDragEnd<any>) {
    const dropTile = document.elementFromPoint(event.dropPoint.x, event.dropPoint.y);
    const source = event.source.element.nativeElement;
    const dropCoordinateI = dropTile?.getAttribute('coordinateI'), dropCoordinateJ = dropTile?.getAttribute('coordinateJ');

    if (dropTile?.classList.contains('hint')) {
      source.setAttribute('coordinateI', dropCoordinateI!);
      source.setAttribute('coordinateJ', dropCoordinateJ!);

      dropTile.appendChild(source);
      this.isWhitesTurn = !this.isWhitesTurn;
    }
    event.source._dragRef.reset();

    this.flushHints(undefined);
  }

  flushHints(event: any) {
    if (event) {
      const clickedTile = event.target as HTMLElement;

      if (clickedTile.classList.contains('tile')) {
        document.querySelectorAll(".tile.hint").forEach(item => {
          item.classList.remove('hint');
        });
        document.querySelectorAll(".tile.attack").forEach(item => {
          item.classList.remove('attack');
        });
        
        this.isFlushed = true;
      }
    } else {
      document.querySelectorAll(".tile.hint").forEach(item => {
        item.classList.remove('hint');
      });
      document.querySelectorAll(".tile.attack").forEach(item => {
        item.classList.remove('attack');
      });

      this.isFlushed = true;
    }
  }

  getHints(event: MouseEvent) {
    if (!this.isPieceClicked || this.isFlushed) {
      const tile = event.target as HTMLElement;

      if (tile.classList.contains('piece')) {
        const pieceType = tile.attributes.getNamedItem('pieceType');
        const coordinateI = tile.getAttribute('coordinateI'), coordinateJ = tile.getAttribute('coordinateJ');

        this.initPossibleMoves(pieceType?.value!, +coordinateI!, +coordinateJ!);
      }
    } else if(!this.isFlushed) {
      this.flushHints(undefined);
    }
    this.isPieceClicked = true;
  }

  addHintToTileByCoordinates(coordinateI: number, coordinateJ: number): boolean {
    const tile = this.getTileAtCoordinates(coordinateI, coordinateJ);
    if (tile?.childElementCount == 0) {
      tile?.classList.add('hint');
      return true;
    }
    return false;
  }

  getPieceAtCoordinates(coordinateI: number, coordinateJ: number): Element | null {
    const piece = document.querySelector(".piece[coordinateI='" + coordinateI + "'][coordinateJ='" + coordinateJ + "']");
    return piece;
  }

  getPieceTypeAtCoordinates(coordinateI: number, coordinateJ: number): string {
    const piece = this.getPieceAtCoordinates(coordinateI, coordinateJ);
    const pieceTypeAttr = piece?.attributes.getNamedItem('pieceType');
    const pieceTypeValue = pieceTypeAttr?.value!;
    return pieceTypeValue;
  }
  
  getTileAtCoordinates(coordinateI: number, coordinateJ: number): Element | null {
    const tile = document.querySelector(".tile[coordinateI='" + coordinateI + "'][coordinateJ='" + coordinateJ + "']");
    return tile;
  }

  initPossibleMoves(pieceType: String, coordinateI: number, coordinateJ: number) {
    if (this.isWhitesTurn && this.whitePieces.includes(+pieceType)) {
      switch (pieceType) {
        case String(Piece.RookWhite): {
          console.log('white rook');
          this.initRookMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.KnightWhite): {
          console.log('white knight');
          this.initKnightMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.BishopWhite): {
          console.log('white bishop');
          this.initBishopMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.QueenWhite): {
          console.log('white quuen');
          this.initQueenMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.KingWhite): {
          console.log('white king');
          this.initKingMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.PawnWhite): {
          if (coordinateI == 6) {
            console.log('white pawn');
            this.addHintToTileByCoordinates(coordinateI-2, coordinateJ);
          }
          this.addHintToTileByCoordinates(coordinateI-1, coordinateJ);
          if (this.getPieceAtCoordinates(coordinateI-1, coordinateJ-1)) {
            this.initAttack(coordinateI-1, coordinateJ-1);
          }
          if (this.getPieceAtCoordinates(coordinateI-1, coordinateJ+1)) {
            this.initAttack(coordinateI-1, coordinateJ+1);
          }
          break;
        }
      }
    } else if (!this.isWhitesTurn && this.blackPieces.includes(+pieceType)) {
      switch (pieceType) {
        case String(Piece.RookBlack): {
          console.log('black rook');
          this.initRookMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.KnightBlack): {
          console.log('black knight');
          this.initKnightMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.BishopBlack): {
          console.log('black bishop');
          this.initBishopMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.QueenBlack): {
          console.log('black quuen');
          this.initQueenMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.KingBlack): {
          console.log('black king');
          this.initKingMoves(coordinateI, coordinateJ);
          break;
        }
        case String(Piece.PawnBlack): {
          if (coordinateI == 1) {
            console.log('black pawn');          
            this.addHintToTileByCoordinates(coordinateI+2, coordinateJ);
          }
          this.addHintToTileByCoordinates(coordinateI+1, coordinateJ);
          if (this.getPieceAtCoordinates(coordinateI+1, coordinateJ-1)) {
            this.initAttack(coordinateI+1, coordinateJ-1);
          }
          if (this.getPieceAtCoordinates(coordinateI+1, coordinateJ+1)) {
            this.initAttack(coordinateI+1, coordinateJ+1);
          }
          break;
        }
      }
    }
    this.isFlushed = false
  }

  initAttack(coordinateI: number, coordinateJ: number) {
    const tile = this.getTileAtCoordinates(coordinateI, coordinateJ);
        switch (this.isWhitesTurn) {
          case true: {
            if (this.blackPieces.includes(+this.getPieceTypeAtCoordinates(coordinateI, coordinateJ))) {
              tile?.classList.add('attack');
            }
            break;
          }
          case false: {
            if (this.whitePieces.includes(+this.getPieceTypeAtCoordinates(coordinateI, coordinateJ))) {
              tile?.classList.add('attack');
            }
            break;
          }
        }
  }

  initRookMoves(coordinateI: number, coordinateJ: number) {
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI, coordinateJ-i)) {
        this.initAttack(coordinateI, coordinateJ-i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI, coordinateJ+i)) {
        this.initAttack(coordinateI, coordinateJ+i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI-i, coordinateJ)) {
        this.initAttack(coordinateI-i, coordinateJ);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI+i, coordinateJ)) {
        this.initAttack(coordinateI+i, coordinateJ);
        break;
      }
    }
  }

  initKnightMoves(coordinateI: number, coordinateJ: number) {
    if (!this.addHintToTileByCoordinates(coordinateI+2, coordinateJ-1)) {
      this.initAttack(coordinateI+2, coordinateJ-1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI+1, coordinateJ-2)) {
      this.initAttack(coordinateI+1, coordinateJ-2);
    }
    if (!this.addHintToTileByCoordinates(coordinateI+2, coordinateJ+1)) {
      this.initAttack(coordinateI+2, coordinateJ+1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI+1, coordinateJ+2)) {
      this.initAttack(coordinateI+1, coordinateJ+2);
    }
    if (!this.addHintToTileByCoordinates(coordinateI-1, coordinateJ-2)) {
      this.initAttack(coordinateI-1, coordinateJ-2);
    }
    if (!this.addHintToTileByCoordinates(coordinateI-2, coordinateJ-1)) {
      this.initAttack(coordinateI-2, coordinateJ-1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI-2, coordinateJ+1)) {
      this.initAttack(coordinateI-2, coordinateJ+1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI-1, coordinateJ+2)) {
      this.initAttack(coordinateI-1, coordinateJ+2);
    }
  }

  initBishopMoves(coordinateI: number, coordinateJ: number) {
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI-i, coordinateJ-i)) {
        this.initAttack(coordinateI-i, coordinateJ-i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI-i, coordinateJ+i)) {
        this.initAttack(coordinateI-i, coordinateJ+i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI+i, coordinateJ+i)) {
        this.initAttack(coordinateI+i, coordinateJ+i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI+i, coordinateJ-i)) {
        this.initAttack(coordinateI+i, coordinateJ-i);
        break;
      }
    }
  }

  initQueenMoves(coordinateI: number, coordinateJ: number) {
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI, coordinateJ-i)) {
        this.initAttack(coordinateI, coordinateJ-i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI, coordinateJ+i)) {
        this.initAttack(coordinateI, coordinateJ+i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI-i, coordinateJ)) {
        this.initAttack(coordinateI-i, coordinateJ);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI+i, coordinateJ)) {
        this.initAttack(coordinateI+i, coordinateJ);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI-i, coordinateJ-i)) {
        this.initAttack(coordinateI-i, coordinateJ-i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI-i, coordinateJ+i)) {
        this.initAttack(coordinateI-i, coordinateJ+i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI+i, coordinateJ+i)) {
        this.initAttack(coordinateI+i, coordinateJ+i);
        break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (!this.addHintToTileByCoordinates(coordinateI+i, coordinateJ-i)) {
        this.initAttack(coordinateI+i, coordinateJ-i);
        break;
      }
    }
  }

  initKingMoves(coordinateI: number, coordinateJ: number) {
    if (!this.addHintToTileByCoordinates(coordinateI+1, coordinateJ-1)) {
      this.initAttack(coordinateI+1, coordinateJ-1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI, coordinateJ-1)) {
      this.initAttack(coordinateI, coordinateJ-1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI-1, coordinateJ-1)) {
      this.initAttack(coordinateI-1, coordinateJ-1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI-1, coordinateJ)) {
      this.initAttack(coordinateI-1, coordinateJ);
    }
    if (!this.addHintToTileByCoordinates(coordinateI-1, coordinateJ+1)) {
      this.initAttack(coordinateI-1, coordinateJ+1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI, coordinateJ+1)) {
      this.initAttack(coordinateI, coordinateJ+1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI+1, coordinateJ+1)) {
      this.initAttack(coordinateI+1, coordinateJ+1);
    }
    if (!this.addHintToTileByCoordinates(coordinateI+1, coordinateJ)) {
      this.initAttack(coordinateI+1, coordinateJ);
    }
  }

}
