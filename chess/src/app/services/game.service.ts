import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Piece } from '../game/board/models/piece';
import { BoardSpace } from '../game/board/models/boardSpace';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  piecePosition$ = new BehaviorSubject<BoardSpace>();
  selectedPiece: Piece;
  currentPosition: BoardSpace;

  constructor()
  {
    this.piecePosition$.subscribe(pos => {
      this.currentPosition = pos;
    })
  }

  movePiece(to: BoardSpace)
  {
    this.piecePosition$.next(to);
  }
}
