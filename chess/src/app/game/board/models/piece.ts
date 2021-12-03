import { BoardSpace } from '../models/boardSpace';

export class Piece {
    pieceName: string;
    graphic: string;
    arrayRow: number;
    arrayCol: number;
    color: number; // white == 0, black == 1
    hasMoved: boolean = false;

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
        if (piece.hasMoved == false)
        {
            if (currentBoard[x-2][y].piece.pieceName == undefined)
            {
                currentBoard[x-2][y].canDrop = true;
            }
        }
        if ((x-1)>-1 && currentBoard[x-1][y].piece.pieceName == undefined)
        {
            currentBoard[x-1][y].canDrop = true;
        }
        if ((x-1)>-1 && (y-1)>-1 && currentBoard[x-1][y-1].piece.color == 1)
        {
            currentBoard[x-1][y-1].canDrop = true;
        }
        if ((x-1)>-1 && (y+1)<8 && currentBoard[x-1][y+1].piece.color == 1)
        {
            currentBoard[x-1][y+1].canDrop = true;
        }
    }
    
    // ======================================================================== //

    getBlackPawnMoves(currentBoard: any, piece: Piece, x: number, y: number): void
    {
        if (piece.hasMoved == false)
        {
            if (currentBoard[x+2][y].piece.pieceName == undefined)
            {
                currentBoard[x+2][y].canDrop = true;
            }
        }
        if ((x+1)<8 && currentBoard[x+1][y].piece.pieceName == undefined)
        {
            currentBoard[x+1][y].canDrop = true;
        }
        if ((x+1)<8 && (y-1)>-1 && currentBoard[x+1][y-1].piece.color == 0)
        {
            currentBoard[x+1][y-1].canDrop = true;
        }
        if ((x+1)<8 && (y+1)<8 && currentBoard[x+1][y+1].piece.color == 0)
        {
            currentBoard[x+1][y+1].canDrop = true;
        }
    }
    
    // ======================================================================== //

    getKnightMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {
        if (currentBoard[x-2] != undefined)
        {
            if (currentBoard[x-2][y-1] != undefined && currentBoard[x-2][y-1].piece.color != piece.color)
            {
                currentBoard[x-2][y-1].canDrop = true;
            }
            if (currentBoard[x-2][y+1] != undefined && currentBoard[x-2][y+1].piece.color != piece.color)
            {
                currentBoard[x-2][y+1].canDrop = true;
            }
        }
        if (currentBoard[x-1] != undefined)
        {
            if (currentBoard[x-1][y-2] != undefined && currentBoard[x-1][y-2].piece.color != piece.color)
            {
                currentBoard[x-1][y-2].canDrop = true;
            }
            if (currentBoard[x-1][y+2] != undefined && currentBoard[x-1][y+2].piece.color != piece.color)
            {
                currentBoard[x-1][y+2].canDrop = true;
            }
        }
        if (currentBoard[x+1] != undefined)
        {
            if (currentBoard[x+1][y-2] != undefined && currentBoard[x+1][y-2].piece.color != piece.color)
            {
                currentBoard[x+1][y-2].canDrop = true;
            }
            if (currentBoard[x+1][y+2] != undefined && currentBoard[x+1][y+2].piece.color != piece.color)
            {
                currentBoard[x+1][y+2].canDrop = true;
            }
        }
        if (currentBoard[x+2] != undefined)
        {
            if (currentBoard[x+2][y-1] != undefined && currentBoard[x+2][y-1].piece.color != piece.color)
            {
                currentBoard[x+2][y-1].canDrop = true;
            }
            if (currentBoard[x+2][y+1] != undefined && currentBoard[x+2][y+1].piece.color != piece.color)
            {
                currentBoard[x+2][y+1].canDrop = true;
            }
        }
    }
    
    // ======================================================================== //

    getBishopMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {
        // up-left (--)
        let i = x-1;
        let j = y-1;
        while (i>=0 && j>=0
            && (currentBoard[i][j].piece.pieceName == undefined
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.color != undefined)
            {
                currentBoard[i][j].canDrop = true;
                break;
            }
            currentBoard[i][j].canDrop = true;
            i -= 1;
            j -= 1;
        }
        
        // up-right (-+)
        i = x-1;
        j = y+1;
        while (i>=0 && j<8
            && (currentBoard[i][j].piece.pieceName == undefined
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.color != undefined)
            {
                currentBoard[i][j].canDrop = true;
                break;
            }
            currentBoard[i][j].canDrop = true;
            i -= 1;
            j += 1;
        }

        // down-right (++)
        i = x+1;
        j = y+1;
        while (i<8 && j<8
            && (currentBoard[i][j].piece.pieceName == undefined
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.color != undefined)
            {
                currentBoard[i][j].canDrop = true;
                break;
            }
            currentBoard[i][j].canDrop = true;
            i += 1;
            j += 1;
        }

        // down-left (+-)
        i = x+1;
        j = y-1;
        while (i<8 && j>=0
            && (currentBoard[i][j].piece.pieceName == undefined
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.color != undefined)
            {
                currentBoard[i][j].canDrop = true;
                break;
            }
            currentBoard[i][j].canDrop = true;
            i += 1;
            j -= 1;
        }
    }
    
    // ======================================================================== //

    getRookMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {
        //rook downboard
        let i = x+1;
        let j = y;
        while (i<8 && (currentBoard[i][j].piece.pieceName == undefined
            || currentBoard[i][j].piece.color != piece.color))
        {    
            if (currentBoard[i][j].piece.color != undefined)
            {
                currentBoard[i][j].canDrop = true;
                break;
            }
            currentBoard[i][j].canDrop = true;
            i += 1;
        }
        //rook upboard
        i = x-1;
        j = y;
        while (i>-1 && (currentBoard[i][j].piece.pieceName == undefined
            || currentBoard[i][j].piece.color != piece.color))
        {    
            if (currentBoard[i][j].piece.color != undefined)
            {
                currentBoard[i][j].canDrop = true;
                break;
            }
            currentBoard[i][j].canDrop = true;
            i -= 1;
        }

        //rook right
        i = x;
        j = y+1;
        while (j<8 && (currentBoard[i][j].piece.pieceName == undefined
            || currentBoard[i][j].piece.color != piece.color))
        {    
            if (currentBoard[i][j].piece.color != undefined)
            {
                currentBoard[i][j].canDrop = true;
                break;
            }
            currentBoard[i][j].canDrop = true;
            j += 1;
        }

        //rook left
        i = x;
        j = y-1;
        while (j>-1 && (currentBoard[i][j].piece.pieceName == undefined
            || currentBoard[i][j].piece.color != piece.color))
        {    
            if (currentBoard[i][j].piece.color != undefined)
            {
                currentBoard[i][j].canDrop = true;
                break;
            }
            currentBoard[i][j].canDrop = true;
            j -= 1;
        }
    }

    // ======================================================================== //

    getKingMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {
        //up
        let isCheck = this.verifyCheck(currentBoard, piece, x+1, y);
        if ((x+1)<8 && isCheck == false 
            && currentBoard[x+1][y].piece.pieceName == undefined
            || currentBoard[x+1][y].piece.color != piece.color)
        {
            currentBoard[x+1][y].canDrop = true;
        }

        //down
        isCheck = this.verifyCheck(currentBoard, piece, x-1, y);
        if ((x-1)>-1 && isCheck == false 
            && currentBoard[x-1][y].piece.pieceName == undefined
            || currentBoard[x-1][y].piece.color != piece.color)
        {
            currentBoard[x-1][y].canDrop = true;
        }

        //right
        isCheck = this.verifyCheck(currentBoard, piece, x, y+1);
        if ((y+1)<8 && isCheck == false 
            && currentBoard[x][y+1].piece.pieceName == undefined
            || currentBoard[x][y+1].piece.color != piece.color)
        {
            currentBoard[x][y+1].canDrop = true;
        }

        //left
        isCheck = this.verifyCheck(currentBoard, piece, x, y-1);
        if ((y-1)>-1 && isCheck == false 
            && currentBoard[x][y-1].piece.pieceName == undefined
            || currentBoard[x][y-1].piece.color != piece.color)
        {
            currentBoard[x][y-1].canDrop = true;
        }

        
    }

    // ======================================================================== //
    
    getQueenMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {
        this.getBishopMoves(currentBoard, piece, x, y);
        this.getRookMoves(currentBoard, piece, x, y);
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

    verifyCheck(currentBoard: any, king: Piece, x: number, y: number): boolean
    {
        let isCheck: boolean = false;

        // pawn
        if (king.color == 0)
        {
            if (currentBoard[x-1][y+1].piece.pieceName == 'p'
            || currentBoard[x-1][y-1].piece.pieceName == 'p')
            {
                isCheck = true;
            }
        }
        else if (king.color == 1)
        {
            if (currentBoard[x+1][y+1].piece.pieceName == 'P'
            || currentBoard[x+1][y-1].piece.pieceName == 'P')
            {
                isCheck = true;
            }
        }

        // knight

        // bishop

        // rook

        // queen

        // king

        return isCheck;
    }

    // ======================================================================== //
}