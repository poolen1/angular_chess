import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Piece } from '../game/board/models/piece';
import { BoardSpace } from '../game/board/models/boardSpace';
import { SquareComponent } from '../game/square/square.component';
import { CdkDragDrop, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop';

// ======================================================================== //

@Injectable({
  providedIn: 'root'
})
export class GameService {
  board: BoardSpace;
  playerTurn: number;

  private pieceSelectedSource = new BehaviorSubject<CdkDragStart<BoardSpace>>(null);
  private moveCompletedSource = new BehaviorSubject<CdkDragDrop<BoardSpace>>(null);

  moveCompleted$ = this.moveCompletedSource.asObservable();
  pieceSelected$ = this.pieceSelectedSource.asObservable();

  // ======================================================================== //

  constructor()
  {
    this.playerTurn = 0;
  }

  // ======================================================================== //

  pieceSelected(selection: CdkDragStart<BoardSpace>)
  {
    this.pieceSelectedSource.next(selection);
  }

  // ======================================================================== //

  moveCompleted(move: CdkDragDrop<BoardSpace>)
  {
    if (this.playerTurn == 0)
    {
      this.playerTurn += 1;
    }
    else if (this.playerTurn == 1)
    {
      this.playerTurn -= 1;
    }

    this.moveCompletedSource.next(move);
  }

  // ======================================================================== //

}
