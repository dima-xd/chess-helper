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
          break;
      }
      case 'piece-1':
      case 'piece-7': {
          console.log('knight');
          break;
      }
      case 'piece-2':
      case 'piece-8': {
          console.log('bishop');
          break;
      }
      case 'piece-3':
      case 'piece-9': {
          console.log('queen');
          break;
      }
      case 'piece-4':
      case 'piece-10': {
          console.log('king');
          break;
      }
      case 'piece-5': {
          console.log('black pawn');
          break;
      }
      case 'piece-11': {
          if (coordinateI == 6) {
            console.log('white pawn');
            this.addHintToTileByCoordinates(coordinateI-1, coordinateJ);
            this.addHintToTileByCoordinates(coordinateI-2, coordinateJ);
          } else {
            this.addHintToTileByCoordinates(coordinateI-1, coordinateJ);
          }
          break;
      }
    }
  }

  movePieceToTile(event: CdkDragEnd<any>) {
    const dropTile = document.elementFromPoint(event.dropPoint.x, event.dropPoint.y);
    const source = event.source.element.nativeElement;
    const dropCoordinateI = dropTile?.getAttribute('coordinateI'), dropCoordinateJ = dropTile?.getAttribute('coordinateJ');

    console.log(dropTile)
    console.log(dropCoordinateI!, dropCoordinateJ!)

    if (dropTile?.classList.contains('hint')) {
      event.source._dragRef.reset();

      source.setAttribute('coordinateI', dropCoordinateI!);
      source.setAttribute('coordinateJ', dropCoordinateJ!);

      dropTile.appendChild(source);
    } else {
      event.source._dragRef.reset();
    }

    this.flushHints(undefined);
  }

  flushHints(event: any) {
    //const tile = event.target as HTMLElement;
    document.querySelectorAll(".tile.hint").forEach(item => {
      item.classList.remove('hint');
    });
  }

  getHints(event: MouseEvent) {
    const tile = event.target as HTMLElement;

    if (tile.classList.contains('piece')) {
      const pieceType = tile.classList.item(2); //TODO: get with regex
      const coordinateI = tile.getAttribute('coordinateI'), coordinateJ = tile.getAttribute('coordinateJ');

      this.initPossibleMoves(pieceType!, +coordinateI!, +coordinateJ!);
    }
  }

  addHintToTileByCoordinates(coordinateI: number, coordinateJ: number) {
    document
      .querySelector(".tile[coordinateI='" + (coordinateI) + "'][coordinateJ='" + coordinateJ + "']")
      ?.classList.add('hint');
  }

}
