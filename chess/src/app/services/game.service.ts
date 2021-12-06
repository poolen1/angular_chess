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

  findPiece(currentBoard: any, pieceName: string)
  {
    let piece: Piece;
    for (let i=0; i<8; i++)
    {
      for (let j=0; j<8; j++)
      {
        piece = currentBoard[i][j].piece;

        if (piece.pieceName == pieceName)
        {
          return piece;
        }
      }
    }

    return piece;
  }

  // ======================================================================== //

  verifyCheck(currentBoard: any, piece?: Piece, x?: number, y?: number): boolean
  {
    let check: boolean = false;

    if (!piece)
    {
      if (this.playerTurn == 0)
      {
        piece = this.findPiece(currentBoard, 'K');
      }
      else if (this.playerTurn == 1)
      {
        piece = this.findPiece(currentBoard, 'K');
      }
    }
    if (!x)
    {
      x = piece.arrayRow;
    }
    if (!y)
    {
      y = piece.arrayCol;
    }
    
    check = piece.verifyCheck(currentBoard, piece, x, y);

    if (check)
    {
      this.verifyCheckmate(currentBoard, piece, x, y);
    }

    return check;
  }

  // ======================================================================== //

  verifyCheckmate(currentBoard: any, piece: Piece, x: number, y: number): boolean
  {
    let check: boolean;
    let checkMate: boolean = true;

    if (check)
    {
      //up
      let isCheck = this.verifyCheck(currentBoard, piece, x-1, y);
      if ((x-1)>-1 && isCheck == false 
          && (currentBoard[x-1][y].piece.pieceName == 2
          || currentBoard[x-1][y].piece.color != piece.color))
      {
        return false;
      }

      //down
      isCheck = this.verifyCheck(currentBoard, piece, x+1, y);
      if ((x+1)<8 && isCheck == false 
          && (currentBoard[x+1][y].piece.pieceName == 2
          || currentBoard[x+1][y].piece.color != piece.color))
      {
        return false;
      }

      //right
      isCheck = this.verifyCheck(currentBoard, piece, x, y+1);
      if ((y+1)<8 && isCheck == false 
          && (currentBoard[x][y+1].piece.pieceName == '0'
          || currentBoard[x][y+1].piece.color != piece.color))
      {
        return false;
      }

      //left
      isCheck = this.verifyCheck(currentBoard, piece, x, y-1);
      if ((y-1)>-1 && isCheck == false 
          && (currentBoard[x][y-1].piece.pieceName == '0'
          || currentBoard[x][y-1].piece.color != piece.color))
      {
        return false;
      }

      //up left
      isCheck = this.verifyCheck(currentBoard, piece, x-1, y-1);
      if ((x-1)>-1 && (y-1)>-1 && isCheck == false 
          && (currentBoard[x-1][y-1].piece.pieceName == '0'
          || currentBoard[x-1][y-1].piece.color != piece.color))
      {
        return false;
      }

      //up right
      isCheck = this.verifyCheck(currentBoard, piece, x-1, y+1);
      if ((x-1)>-1 && (y+1)<8 && isCheck == false 
          && (currentBoard[x-1][y+1].piece.pieceName == '0'
          || currentBoard[x-1][y+1].piece.color != piece.color))
      {
        return false;
      }
      
      //down left
      isCheck = this.verifyCheck(currentBoard, piece, x+1, y-1);
      if ((x+1)<8 && (y-1)>-1 && isCheck == false 
          && (currentBoard[x+1][y-1].piece.pieceName == '0'
          || currentBoard[x+1][y-1].piece.color != piece.color))
      {
        return false;
      }

      //down right
      isCheck = this.verifyCheck(currentBoard, piece, x+1, y+1);
      if ((x+1)<8 && (y+1)<8 &&  isCheck == false 
          && (currentBoard[x+1][y+1].piece.pieceName == '0'
          || currentBoard[x+1][y+1].piece.color != piece.color))
      {
        return false;
      }
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
