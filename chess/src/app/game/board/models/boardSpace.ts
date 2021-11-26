import { Piece } from './piece';

export class BoardSpace 
{
    piece: Piece;
    chessRow: string;
    chessCol: string;
    arrayRow: number;
    arrayCol: number;

    constructor(chessPiece: Piece, boardRow: string, boardCol: string, machineRow: number, machineCol: number)
    {
        this.piece = chessPiece;
        this.chessRow = boardRow;
        this.chessCol = boardCol;
        this.arrayRow = machineRow;
        this.arrayCol = machineCol;
    }
}