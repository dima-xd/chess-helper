import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Board } from '../beans/board';
import { BoardUtils } from '../beans/board-utils';
import { CdkDragDrop, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  board: Board | undefined;

  private isPieceClicked = false;
  private isFlushed = false;

  constructor() { }

  ngOnInit(): void {
    this.board = new Board(BoardUtils.initBoard());
  }
  
  startMovingPiece(event: CdkDragStart) {
    const source = event.source.element.nativeElement;
    const pieceType = source.classList.item(2) //TODO: get with regex
    const coordinateI = source.getAttribute('coordinateI'), coordinateJ = source.getAttribute('coordinateJ');
    
    this.initPossibleMoves(pieceType!, +coordinateI!, +coordinateJ!);
  }

  initPossibleMoves(pieceType: String, coordinateI: number, coordinateJ: number) {
    switch (pieceType) {
      case 'piece-0':
      case 'piece-6': {
          console.log('rook');
          for (let i = 0; i < 8; i++) {
            this.addHintToTileByCoordinates(coordinateI, coordinateJ-i);
            this.addHintToTileByCoordinates(coordinateI, coordinateJ+i);
            this.addHintToTileByCoordinates(coordinateI-i, coordinateJ);
            this.addHintToTileByCoordinates(coordinateI+i, coordinateJ);
          }
          break;
      }
      case 'piece-1':
      case 'piece-7': {
          console.log('knight');
          this.addHintToTileByCoordinates(coordinateI+2, coordinateJ-1);
          this.addHintToTileByCoordinates(coordinateI+1, coordinateJ-2);
          this.addHintToTileByCoordinates(coordinateI+2, coordinateJ+1);
          this.addHintToTileByCoordinates(coordinateI+1, coordinateJ+2);
          this.addHintToTileByCoordinates(coordinateI-1, coordinateJ-2);
          this.addHintToTileByCoordinates(coordinateI-2, coordinateJ-1);
          this.addHintToTileByCoordinates(coordinateI-2, coordinateJ+1);
          this.addHintToTileByCoordinates(coordinateI-1, coordinateJ+2);
          break;
      }
      case 'piece-2':
      case 'piece-8': {
          console.log('bishop');
          for (let i = 0; i < 8; i++) {
            this.addHintToTileByCoordinates(coordinateI-i, coordinateJ-i);
            this.addHintToTileByCoordinates(coordinateI-i, coordinateJ+i);
            this.addHintToTileByCoordinates(coordinateI+i, coordinateJ+i);
            this.addHintToTileByCoordinates(coordinateI+i, coordinateJ-i);
          }
          break;
      }
      case 'piece-3':
      case 'piece-9': {
          console.log('queen');
          for (let i = 0; i < 8; i++) {
            this.addHintToTileByCoordinates(coordinateI, coordinateJ-i);
            this.addHintToTileByCoordinates(coordinateI, coordinateJ+i);
            this.addHintToTileByCoordinates(coordinateI-i, coordinateJ);
            this.addHintToTileByCoordinates(coordinateI+i, coordinateJ);

            this.addHintToTileByCoordinates(coordinateI-i, coordinateJ-i);
            this.addHintToTileByCoordinates(coordinateI-i, coordinateJ+i);
            this.addHintToTileByCoordinates(coordinateI+i, coordinateJ+i);
            this.addHintToTileByCoordinates(coordinateI+i, coordinateJ-i);
          }
          break;
      }
      case 'piece-4':
      case 'piece-10': {
          console.log('king');
          this.addHintToTileByCoordinates(coordinateI+1, coordinateJ-1);
          this.addHintToTileByCoordinates(coordinateI, coordinateJ-1);
          this.addHintToTileByCoordinates(coordinateI-1, coordinateJ-1);
          this.addHintToTileByCoordinates(coordinateI-1, coordinateJ);
          this.addHintToTileByCoordinates(coordinateI-1, coordinateJ+1);
          this.addHintToTileByCoordinates(coordinateI, coordinateJ+1);
          this.addHintToTileByCoordinates(coordinateI+1, coordinateJ+1);
          this.addHintToTileByCoordinates(coordinateI+1, coordinateJ);
          break;
      }
      case 'piece-5': {
          if (coordinateI == 1) {
            console.log('black pawn');          
            this.addHintToTileByCoordinates(coordinateI+2, coordinateJ);
          }
          this.addHintToTileByCoordinates(coordinateI+1, coordinateJ);
          break;
      }
      case 'piece-11': {
          if (coordinateI == 6) {
            console.log('white pawn');
            this.addHintToTileByCoordinates(coordinateI-2, coordinateJ);
          }
          this.addHintToTileByCoordinates(coordinateI-1, coordinateJ);
          break;
      }
    }
    this.isFlushed = false
  }

  movePieceToTile(event: CdkDragEnd<any>) {
    const dropTile = document.elementFromPoint(event.dropPoint.x, event.dropPoint.y);
    const source = event.source.element.nativeElement;
    const dropCoordinateI = dropTile?.getAttribute('coordinateI'), dropCoordinateJ = dropTile?.getAttribute('coordinateJ');

    if (dropTile?.classList.contains('hint')) {
      source.setAttribute('coordinateI', dropCoordinateI!);
      source.setAttribute('coordinateJ', dropCoordinateJ!);

      dropTile.appendChild(source);
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

        this.isFlushed = true;
      }
    } else {
      document.querySelectorAll(".tile.hint").forEach(item => {
        item.classList.remove('hint');
      });

      this.isFlushed = true;
    }
  }

  getHints(event: MouseEvent) {
    if (!this.isPieceClicked || this.isFlushed) {
      const tile = event.target as HTMLElement;

      if (tile.classList.contains('piece')) {
        const pieceType = tile.classList.item(2); //TODO: get with regex
        const coordinateI = tile.getAttribute('coordinateI'), coordinateJ = tile.getAttribute('coordinateJ');

        this.initPossibleMoves(pieceType!, +coordinateI!, +coordinateJ!);
      }
    } else if(!this.isFlushed) {
      this.flushHints(undefined);
    }
    this.isPieceClicked = true;
  }

  addHintToTileByCoordinates(coordinateI: number, coordinateJ: number) {
    document
      .querySelector(".tile[coordinateI='" + (coordinateI) + "'][coordinateJ='" + coordinateJ + "']")
      ?.classList.add('hint');
  }

}
