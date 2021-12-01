import { BoardSpace } from '../models/boardSpace';

export class Piece {
    pieceName: string;
    graphic: string;
    arrayRow: number;
    arrayCol: number;
    color: number; // white == 0, black == 1

    // ======================================================================== //

    constructor (name: string, row: number, col: number)
    {
        if (name == '0')
        {
            return undefined;
        }
        this.pieceName = name;
        this.graphic = this.initGraphic(name);
        this.arrayRow = row;
        this.arrayCol = col;
        this.color = this.getColor(name);
    }

    // ======================================================================== //

    initGraphic(name: string): string
    {
        let pieceGraphic: string = '';
        
        if (name == 'P')
        {
            pieceGraphic = 'assets/wP.png';
        }
        else if (name == 'N')
        {
            pieceGraphic = 'assets/wN.png';
        }
        else if (name == 'B')
        {
            pieceGraphic = 'assets/wB.png';
        }
        else if (name == 'R')
        {
            pieceGraphic = 'assets/wR.png';
        }
        else if (name == 'K')
        {
            pieceGraphic = 'assets/wK.png';
        }
        else if (name == 'Q')
        {
            pieceGraphic = 'assets/wQ.png';
        }
        else if (name == 'p')
        {
            pieceGraphic = 'assets/bP.png';
        }
        else if (name == 'n')
        {
            pieceGraphic = 'assets/bN.png';
        }
        else if (name == 'b')
        {
            pieceGraphic = 'assets/bB.png';
            this.color = 1;
        }
        else if (name == 'r')
        {
            pieceGraphic = 'assets/bR.png';
        }
        else if (name == 'k')
        {
            pieceGraphic = 'assets/bK.png';
        }
        else if (name == 'q')
        {
            pieceGraphic = 'assets/bQ.png';
        }

        return pieceGraphic;
    }

    // ======================================================================== //

    getColor(name: string)
    {
        let theColor: number;
        if (this.isUpper(name))
        {
            theColor = 0;
        }
        else if (this.isLower(name))
        {
            theColor = 1;
        }
        else
        {
            theColor = undefined;
        }

        return theColor;
    }
        
    // ======================================================================== //

    isUpper(char: string)
    {
        if (char == char.toUpperCase())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    // ======================================================================== //

    isLower(char: string)
    {
        if (char == char.toLowerCase())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    // ======================================================================== //

    getLegalMoves(currentBoard: any, piece: Piece, x: number, y: number): any
    {
        currentBoard[x][y].canDrop = true;

        this.getPieceMoves(currentBoard, piece, x, y);

        return currentBoard;
    }

    // ======================================================================== //

    getPieceMoves(currentBoard: any, piece: Piece, x: number, y: number): any
    {
        let name: string = piece.pieceName;

        if (name == 'p')
        {
            this.getBlackPawnMoves(currentBoard, piece, x, y);
        }
        else if (name == 'P')
        {
            this.getWhitePawnMoves(currentBoard, piece, x, y);
        }
        else if (name == 'n' || name == 'N')
        {
            this.getKnightMoves(currentBoard, piece, x, y);
        }
        else if (name == 'b' || name == 'B')
        {
            this.getBishopMoves(currentBoard, piece, x, y);
        }
        else if (name == 'r' || name == 'R')
        {
            this.getRookMoves(currentBoard, piece, x, y);
        }
        else if (name == 'k' || name == 'K')
        {
            this.getKingMoves(currentBoard, piece, x, y);
        }
        else if (name == 'q' || name == 'Q')
        {
            this.getQueenMoves(currentBoard, piece, x, y);
        }

    }
    
    // ======================================================================== //

    getWhitePawnMoves(currentBoard: any, piece: Piece, x: number, y: number): void
    {
        console.log("piece: ", currentBoard[x-1][y].piece.pieceName);
        if (currentBoard[x-1][y].piece.pieceName == undefined)
        {
            currentBoard[x-1][y].canDrop = true;
        }
        if (currentBoard[x-1][y-1].piece)
        {
            currentBoard[x-1][y-1].canDrop = true;
        }
        if (currentBoard[x-1][y+1].piece)
        {
            currentBoard[x-1][y+1].canDrop = true;
        }
    }
    
    // ======================================================================== //

    getBlackPawnMoves(currentBoard: any, piece: Piece, x: number, y: number): void
    {
        console.log("piece: ", currentBoard[x+1][y].piece.pieceName);
        if (currentBoard[x+1][y].piece.pieceName == undefined)
        {
            currentBoard[x+1][y].canDrop = true;
        }
        if (currentBoard[x+1][y-1].piece)
        {
            currentBoard[x+1][y-1].canDrop = true;
            
        }
        if (currentBoard[x+1][y+1].piece)
        {
            currentBoard[x+1][y+1].canDrop = true;
        }
    }
    
    // ======================================================================== //

    getKnightMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {

    }
    
    // ======================================================================== //

    getBishopMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {

    }
    
    // ======================================================================== //
    
    getRookMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {

    }

    // ======================================================================== //

    getKingMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {

    }

    // ======================================================================== //
    
    getQueenMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {

    }

    // ======================================================================== //

    checkForCaptures()
    {

    }

    // ======================================================================== //
    
    checkBlockedSpaces()
    {

    }

    // ======================================================================== //

    checkPawnPromotion()
    {

    }

    // ======================================================================== //
    
    checkEnPassant()
    {

    }

    // ======================================================================== //
    
    checkCanCastle()
    {

    }

    // ======================================================================== //
    
    promotePawn()
    {

    }

    // ======================================================================== //

    castle()
    {

    }
    
    // ======================================================================== //

}