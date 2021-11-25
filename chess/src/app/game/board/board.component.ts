import { Component, OnInit } from '@angular/core';

import { Piece } from './models/piece';
import { Bitboard } from './models/bitboard';

interface Boardspace
{
  currentPiece?: any;
  chessRow?: string;
  chessCol?: string;
  arrayRow: number;
  arrayCol: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gameBoard: any[];
  bitBoards: Bitboard[];

  constructor() { 
    this.bitBoards = [];
    this.gameBoard = [];

    this.initBitboards();
    this.initBoard();
  }

  ngOnInit(): void 
  {
  }

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

  initBoard()
  {
    let boardRow: Boardspace[];
    let chessSpace: Boardspace;
    let chessPiece: Piece;
    let rowNum: number = 10;

    for (let i=0; i<8; i++)
    {
      let row: string;
      boardRow = [];

      this.gameBoard.push(boardRow);
      rowNum = rowNum - 2;
      row = (i + rowNum).toString();

      for (let j=0; j<8; j++)
      {
        let col = String.fromCharCode(j + 65);

        chessSpace = { arrayRow: i, arrayCol: j, 
          chessRow: row, chessCol: col};

        this.gameBoard[i].push(chessSpace);
      }
    }

    console.log("the board: ", this.gameBoard);
  }

  initPiece(name: string): Piece
  {
    let thePiece: Piece = new Piece(name);

    return thePiece;
  }

}
