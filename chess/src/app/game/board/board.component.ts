import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragStart } from "@angular/cdk/drag-drop";

import { Piece } from './models/piece';
import { Bitboard } from './models/bitboard';
import { BoardSpace } from './models/boardSpace';

import { GameService } from '../../services/game.service';

// ======================================================================== //

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gameBoard: any[];
  bitBoards: Bitboard[];
  gamePieces: Piece[];
  playerTurnDisplay: string;
  checkDisplay: string;
  prisonersOfWhite: Piece[];
  prisonersOfBlack: Piece[];

  // ======================================================================== //

  constructor(private _gameService: GameService) 
  { 
    this.bitBoards = [];
    this.gameBoard = [];
    this.gamePieces = [];
    this.prisonersOfWhite = [];
    this.prisonersOfBlack = [];

    this.initBitboards();
    this.initBoard();

    // on pick up piece
    this._gameService.pieceSelected$.subscribe(selection => {
      
      if (selection)
      {
        this.enableDropSquares(selection);
      }
    });

    // on drop piece
    this._gameService.moveCompleted$.subscribe(moveEvent => {

      if (moveEvent)
      {
        let from: BoardSpace = moveEvent.previousContainer.data;
        let to: BoardSpace = moveEvent.container.data;
        let toPiece: Piece = to.piece;
        let fromPiece: Piece = from.piece;
  
        if (from != to)
        {
          // update moved piece
          if (fromPiece.pieceName)
          {
            this.updateBitboard(moveEvent);
          }
          // if capture, update captured piece
          if (toPiece.pieceName != '0')
          {
            this.getCapturedPieces();
            this.updateBitboard(moveEvent);
          }

          if (this._gameService.playerTurn == 0)
          {
            this._gameService.isCheckWhite = this._gameService.verifyCheck(this.gameBoard);
            this.getCheckStatus();
          }
          else if (this._gameService.playerTurn == 1)
          {
            this._gameService.isCheckBlack = this._gameService.verifyCheck(this.gameBoard);
            this.getCheckStatus();
          }

          this._gameService.updatePlayerTurn();
          this.getPlayerTurn();  
          this.enableDisableDragSquares();
          this.disableDropSquares();

          if (this._gameService.playerTurn == 0)
          {
            this._gameService.isCheckWhite = this._gameService.verifyCheck(this.gameBoard);
            this.getCheckStatus();

            if (this._gameService.isCheckmate)
            {
              //endgame logic
            }
          }
          else if (this._gameService.playerTurn == 1)
          {
            this._gameService.isCheckBlack = this._gameService.verifyCheck(this.gameBoard);
            this.getCheckStatus();

            if (this._gameService.isCheckmate)
            {
              //endgame logic
            }
          }
        }
      }
    });
  }

  // ======================================================================== //

  ngOnInit(): void 
  {
  }

  // ======================================================================== //

  initBitboards(): void
  {
    let board: Bitboard;

    //init white pieces
    board = new Bitboard('P');
    this.bitBoards.push(board);
    board = new Bitboard('N');
    this.bitBoards.push(board);
    board = new Bitboard('B');
    this.bitBoards.push(board);
    board = new Bitboard('R');
    this.bitBoards.push(board);
    board = new Bitboard('K');
    this.bitBoards.push(board);
    board = new Bitboard('Q');
    this.bitBoards.push(board);

    //init black pieces
    board = new Bitboard('p');
    this.bitBoards.push(board);
    board = new Bitboard('n');
    this.bitBoards.push(board);
    board = new Bitboard('b');
    this.bitBoards.push(board);
    board = new Bitboard('r');
    this.bitBoards.push(board);
    board = new Bitboard('k');
    this.bitBoards.push(board);
    board = new Bitboard('q');
    this.bitBoards.push(board);
  }

  // ======================================================================== //

  initBoard(): void
  {
    let boardRow: BoardSpace[];
    let chessPiece: Piece;
    let chessSpace: BoardSpace;
    let rowNum: number = 10;

    for (let i=0; i<8; i++)
    {
      let row: string;
      rowNum = rowNum - 2;
      row = (i + rowNum).toString();
      boardRow = [];

      this.gameBoard.push(boardRow);

      for (let j=0; j<8; j++)
      {
        let col = String.fromCharCode(j + 65);
        let pieceName: any;

        pieceName = this.checkInitialPositionForPiece(i, j);
        chessPiece = this.initPiece(pieceName, i, j);

        chessSpace = new BoardSpace(chessPiece, row, col, i, j);

        this.gameBoard[i].push(chessSpace);
        this.gamePieces.push(chessPiece);
      }
    }

    this.getPlayerTurn();
    this.enableDisableDragSquares();
  
  }

  // ======================================================================== //

  checkInitialPositionForPiece(row: number, col: number): string
  {
    let pieceName: string;
    let board: any;

    pieceName = '0';
    for (let i=0; i<this.bitBoards.length; i++)
    {
      board = this.bitBoards[i].board;
      if (board[row][col] != 0)
      {
        pieceName = this.bitBoards[i].name;
        break; 
      }
    }

    return pieceName;
  }

  // ======================================================================== //

  initPiece(name: string, row: number, col: number): Piece
  {
    let thePiece: Piece = new Piece(name, row, col);

    return thePiece;
  }

  // ======================================================================== //

  isBlack(square: BoardSpace): boolean
  {
    return (square.arrayRow + square.arrayCol) % 2 === 1;
  }

  // ======================================================================== //

  updateBitboard(move: CdkDragDrop<BoardSpace>): void
  {

  }

  // ======================================================================== //

  enableDisableDragSquares(): void
  {
    let square: BoardSpace;

    for (let i=0; i<8; i++)
    {
      for (let j=0; j<8; j++)
      {
        square = this.gameBoard[i][j];
        if (this._gameService.playerTurn == square.piece.color)
        {
          square.disabled = false;
        }
        else
        {
          square.disabled = true;
        }
      }
    }
  }
  
  // ======================================================================== //

  enableDropSquares(selection: CdkDragStart<BoardSpace>): void
  { 
    let piece: Piece = selection.source.dropContainer.data.piece;
    let x: number = piece.arrayRow;
    let y: number = piece.arrayCol;

    this.gameBoard = piece.getLegalMoves(this.gameBoard, piece, x, y);

  }

  // ======================================================================== //
  
  disableDropSquares(): void
  {
    for (let i=0; i<8; i++)
    {
      for (let j=0; j<8; j++)
      {
        this.gameBoard[i][j].canDrop = false;
      }
    }
  }

  // ======================================================================== //

  getPlayerTurn(): void
  {
    console.log("getplayerturn");
    
    if (this._gameService.playerTurn == 0)
    {
      this.playerTurnDisplay = "White to Move";
    }
    else if (this._gameService.playerTurn == 1)
    {
      this.playerTurnDisplay = "Black to Move";
    }
  }

  // ======================================================================== //

  getCheckStatus(): void
  {
    if (this._gameService.isCheckBlack == true)
    {
      this.checkDisplay = "Black king is in check!";
    }
    else if (this._gameService.isCheckWhite == true)
    {
      this.checkDisplay = "White king is in check!";
    }
    else
    {
      this.checkDisplay = "";
    }
  }
  
  // ======================================================================== //

  getCapturedPieces()
  {
    this.prisonersOfBlack = this._gameService.prisonersOfBlack;
    this.prisonersOfWhite = this._gameService.prisonersOfWhite;
  }
  
  // ======================================================================== //

}
