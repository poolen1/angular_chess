import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from "@angular/cdk/drag-drop";

import { Piece } from './models/piece';
import { Bitboard } from './models/bitboard';
import { BoardSpace } from './models/boardSpace';

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

  // ======================================================================== //

  constructor() { 
    this.bitBoards = [];
    this.gameBoard = [];
    this.gamePieces = [];

    this.initBitboards();
    this.initBoard();
  }

  // ======================================================================== //

  ngOnInit(): void 
  {
  }

  // ======================================================================== //

  initBitboards()
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

  initBoard()
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

    console.log("the board: ", this.gameBoard);
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

  isBlack(square: BoardSpace)
  {
    return (square.arrayRow + square.arrayCol) % 2 === 1;
  }

  // Drag/Drop
  // ======================================================================== //

  drop(event: CdkDragDrop<BoardSpace>) {
    console.log("the event: ", event);
    if (event.isPointerOverContainer) {
      const from: BoardSpace = event.previousContainer.data;
      const to: BoardSpace = event.container.data;
      if (event.previousContainer !== event.container) {
        to.piece = from.piece;
        from.piece = undefined;
      } else {
        to.piece = from.piece;
      }
    }
  }

  // ======================================================================== //

  updateGameBoard(index: number, prevIndex: number)
  {
    let temp: Piece = this.gameBoard[prevIndex].piece;
    this.gameBoard[prevIndex].piece = this.gameBoard[index].piece;
    this.gameBoard[index].piece = temp;

    this.gameBoard[index].piece.arrayRow
      = this.gameBoard[index].arrayRow;
    this.gameBoard[index].piece.arrayRow
      = this.gameBoard[index].arrayRow;

    this.gameBoard[prevIndex].piece.arrayRow
      = this.gameBoard[prevIndex].arrayRow;
    this.gameBoard[prevIndex].piece.arrayRow
      = this.gameBoard[prevIndex].arrayRow;

    console.log("the board: ", this.gameBoard);
    console.log('the pieces: ', this.gamePieces);

  }

  // ======================================================================== //
}
