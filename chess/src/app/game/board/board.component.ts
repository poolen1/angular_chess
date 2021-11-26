import { Component, OnInit, ViewChild } from '@angular/core';

import {
  CdkDragDrop, moveItemInArray
} from "@angular/cdk/drag-drop";

import { Piece } from './models/piece';
import { Bitboard } from './models/bitboard';
import { ViewportRuler } from '@angular/cdk/scrolling';

// ======================================================================== //

interface Boardspace
{
  piece: Piece;
  chessRow: string;
  chessCol: string;
  arrayRow: number;
  arrayCol: number;
}

// ======================================================================== //

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gameBoard: any[];
  bitBoards: Bitboard[];

  // ======================================================================== //

  constructor(private viewportRuler: ViewportRuler) { 
    this.bitBoards = [];
    this.gameBoard = [];

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
    let boardRow: Boardspace[];
    let chessPiece: Piece;
    let chessSpace: Boardspace;
    let rowNum: number = 10;

    for (let i=0; i<8; i++)
    {
      let row: string;
      rowNum = rowNum - 2;
      row = (i + rowNum).toString();

      for (let j=0; j<8; j++)
      {
        let col = String.fromCharCode(j + 65);
        let pieceName: any;

        pieceName = this.checkInitialPositionForPiece(i, j);
        chessPiece = this.initPiece(pieceName, i, j);

        chessSpace = { piece: chessPiece, arrayRow: i, arrayCol: j, 
          chessRow: row, chessCol: col};

        this.gameBoard.push(chessSpace);
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

  isBlack(square: Boardspace)
  {
    return (square.arrayRow + square.arrayCol) % 2 === 1;
  }

  // Drag/Drop
  // ======================================================================== //


}
