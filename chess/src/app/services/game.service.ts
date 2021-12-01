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

  canCastleLeft: boolean;
  canCastleRight: boolean;
  isCheck: boolean;
  isCheckmate: boolean;

  prisonersOfBlack: Piece[];
  prisonersOfWhite: Piece[];

  private pieceSelectedSource = new BehaviorSubject<CdkDragStart<BoardSpace>>(null);
  private moveCompletedSource = new BehaviorSubject<CdkDragDrop<BoardSpace>>(null);

  moveCompleted$ = this.moveCompletedSource.asObservable();
  pieceSelected$ = this.pieceSelectedSource.asObservable();

  // ======================================================================== //

  constructor()
  {
    this.playerTurn = 0;
    this.isCheck = false;
    this.isCheckmate = false;
    this.prisonersOfWhite = [];
    this.prisonersOfBlack = [];
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

  verifyCastleLeft()
  {
    let canCastle: boolean = false;

    return canCastle;
  }

  // ======================================================================== //

  verifyCastleRight()
  {
    let canCastle: boolean = false;

    return canCastle;
  }

  // ======================================================================== //

  verifyCheck(): boolean
  {
    let check: boolean = false;

    return check;
  }

  // ======================================================================== //

  verifyCheckmate()
  {
    let check: boolean;
    let checkMate: boolean = false;

    check = this.verifyCheck();
    
    if (check)
    {
      //do stuff
    }

    return checkMate;
  }

  // ======================================================================== //

  capturePiece(capturer: Piece, prisoner: Piece)
  {
    if (capturer.color == 0)
    {
      this.prisonersOfWhite.push(prisoner);
    }
    else if (capturer.color == 1)
    {
      this.prisonersOfBlack.push(prisoner);
    }
  }

  // ======================================================================== //

}
