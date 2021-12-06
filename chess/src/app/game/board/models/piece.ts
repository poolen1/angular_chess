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
        if (name == '0')
        {
            theColor = 2;
        }
        else if (this.isUpper(name))
        {
            theColor = 0;
        }
        else if (this.isLower(name))
        {
            theColor = 1;
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
        let testBoard: any;
        let causesCheck: boolean;
        let tempPiece: Piece;

        testBoard = JSON.parse(JSON.stringify(currentBoard));
        
        if (piece.hasMoved == false)
        {
            if (currentBoard[x-2][y].piece.pieceName == '0')
            {
                tempPiece = currentBoard[x-2][y].piece;
                testBoard[x-2][y].piece = piece;
                testBoard[x][y].piece = tempPiece;

                causesCheck = this.verifyCheck(testBoard);
                if (causesCheck == false)
                {
                    currentBoard[x-2][y].canDrop = true;
                }
            }
        }
        if ((x-1)>-1 && currentBoard[x-1][y].piece.pieceName == '0')
        {
            tempPiece = currentBoard[x-1][y].piece;
            testBoard[x-1][y].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x-1][y].canDrop = true;
            }
        }
        if ((x-1)>-1 && (y-1)>-1 && currentBoard[x-1][y-1].piece.color == 1)
        {
            tempPiece = currentBoard[x-1][y-1].piece;
            testBoard[x-1][y-1].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x-1][y-1].canDrop = true;
            }
        }
        if ((x-1)>-1 && (y+1)<8 && currentBoard[x-1][y+1].piece.color == 1)
        {
            tempPiece = currentBoard[x-1][y+1].piece;
            testBoard[x-1][y+1].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x-1][y+1].canDrop = true;
            }
        }
    }
    
    // ======================================================================== //

    getBlackPawnMoves(currentBoard: any, piece: Piece, x: number, y: number): void
    {
        let testBoard: any;
        let causesCheck: boolean;
        let tempPiece: Piece;

        testBoard = JSON.parse(JSON.stringify(currentBoard));

        if (piece.hasMoved == false)
        {
            if (currentBoard[x+2][y].piece.pieceName == '0')
            {
                tempPiece = currentBoard[x+2][y].piece;
                testBoard[x+2][y].piece= piece;
                testBoard[x][y].piece= tempPiece;
                causesCheck = this.verifyCheck(testBoard);

                if (causesCheck == false)
                {
                    currentBoard[x+2][y].canDrop = true;
                }
            }
        }
        if ((x+1)<8 && currentBoard[x+1][y].piece.pieceName == '0')
        {
            tempPiece = currentBoard[x+1][y].piece;
            testBoard[x+1][y].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x+1][y].canDrop = true;
            }
        }
        if ((x+1)<8 && (y-1)>-1 && currentBoard[x+1][y-1].piece.color == 0)
        {
            tempPiece = currentBoard[x+1][y-1].piece;
            testBoard[x+1][y-1].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x+1][y-1].canDrop = true;
            }
        }
        if ((x+1)<8 && (y+1)<8 && currentBoard[x+1][y+1].piece.color == 0)
        {
            tempPiece = currentBoard[x+1][y+1].piece;
            testBoard[x+1][y+1].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x+1][y+1].canDrop = true;
            }
        }
    }
    
    // ======================================================================== //

    getKnightMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {
        let testBoard: any;
        let causesCheck: boolean;
        let tempPiece: Piece;

        testBoard = JSON.parse(JSON.stringify(currentBoard));

        if ((x-2)>-1 && (y-1)>-1 && currentBoard[x-2][y-1].piece.color != piece.color)
        {
            tempPiece = currentBoard[x-2][y-1].piece;
            testBoard[x-2][y-1].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x-2][y-1].canDrop = true;
            }
        }
        if ((x-2)>-1 && (y+1)<8 && currentBoard[x-2][y+1].piece.color != piece.color)
        {
            tempPiece = currentBoard[x-2][y+1].piece;
            testBoard[x-2][y+1].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x-2][y+1].canDrop = true;
            }
        }
        if ((x-1)>-1 && (y-2)>-1 && currentBoard[x-1][y-2].piece.color != piece.color)
        {
            tempPiece = currentBoard[x-1][y-2].piece;
            testBoard[x-1][y-2].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x-1][y-2].canDrop = true;
            }
        }
        if ((x-1)>-1 && (y+2)<8 && currentBoard[x-1][y+2].piece.color != piece.color)
        {
            tempPiece = currentBoard[x-1][y+2].piece;
            testBoard[x-1][y+2].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x-1][y+2].canDrop = true;
            }
        }
        if ((x+1)<8 && (y-2)>-1 && currentBoard[x+1][y-2].piece.color != piece.color)
        {
            tempPiece = currentBoard[x+1][y-2].piece;
            testBoard[x+1][y-2].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x+1][y-2].canDrop = true;
            }
        }
        if ((x+1)<8 && (y+2)<8 && currentBoard[x+1][y+2].piece.color != piece.color)
        {
            tempPiece = currentBoard[x+1][y+2].piece;
            testBoard[x+1][y+2].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x+1][y+2].canDrop = true;
            }
        }
        if ((x+2)<8 && (y-1)>-1 && currentBoard[x+2][y-1].piece.color != piece.color)
        {
            tempPiece = currentBoard[x+2][y-1].piece;
            testBoard[x+2][y-1].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x+2][y-1].canDrop = true;
            }
        }
        if ((x+2)<8 && (y+1)<8 && currentBoard[x+2][y+1].piece.color != piece.color)
        {
            tempPiece = currentBoard[x+2][y+1].piece;
            testBoard[x+2][y+1].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                currentBoard[x+2][y+1].canDrop = true;
            }
        }
    }
    
    // ======================================================================== //

    getBishopMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {
        let testBoard: any;
        let causesCheck: boolean;
        let tempPiece: Piece;

        testBoard = JSON.parse(JSON.stringify(currentBoard));
        
        // up-left (--)
        let i = x-1;
        let j = y-1;
        while (i>-1 && j>-1
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            tempPiece = currentBoard[i][j].piece;
            testBoard[i][j].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                if (currentBoard[i][j].piece.color != 2)
                {
                    currentBoard[i][j].canDrop = true;
                    break;
                }
                currentBoard[i][j].canDrop = true;
            }
            i -= 1;
            j -= 1;
        }
        
        // up-right (-+)
        i = x-1;
        j = y+1;
        while (i>-1 && j<8
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            tempPiece = currentBoard[i][j].piece;
            testBoard[i][j].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                if (currentBoard[i][j].piece.color != 2)
                {
                    currentBoard[i][j].canDrop = true;
                    break;
                }
                currentBoard[i][j].canDrop = true;
            }
            i -= 1;
            j += 1;
        }

        // down-right (++)
        i = x+1;
        j = y+1;
        while (i<8 && j<8
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            tempPiece = currentBoard[i][j].piece;
            testBoard[i][j].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                if (currentBoard[i][j].piece.color != 2)
                {
                    currentBoard[i][j].canDrop = true;
                    break;
                }
                currentBoard[i][j].canDrop = true;
            }
            i += 1;
            j += 1;
        }

        // down-left (+-)
        i = x+1;
        j = y-1;
        while (i<8 && j>-1
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            tempPiece = currentBoard[i][j].piece;
            testBoard[i][j].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                if (currentBoard[i][j].piece.color != 2)
                {
                    currentBoard[i][j].canDrop = true;
                    break;
                }
                currentBoard[i][j].canDrop = true;
            }
            i += 1;
            j -= 1;
        }
    }
    
    // ======================================================================== //

    getRookMoves(currentBoard: any, piece, x: number, y: number)
    {
        let testBoard: any;
        let causesCheck: boolean;
        let tempPiece: Piece;

        testBoard = JSON.parse(JSON.stringify(currentBoard));
        
        //rook downboard
        let i = x+1;
        let j = y;
        while (i<8 && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {    
            tempPiece = currentBoard[i][j].piece;
            testBoard[i][j].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                if (currentBoard[i][j].piece.color != 2)
                {
                    currentBoard[i][j].canDrop = true;
                    break;
                }
                currentBoard[i][j].canDrop = true;
            }
            i += 1;
        }
        //rook upboard
        i = x-1;
        j = y;
        while (i>-1 && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {    
            tempPiece = currentBoard[i][j].piece;
            testBoard[i][j].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                if (currentBoard[i][j].piece.color != 2)
                {
                    currentBoard[i][j].canDrop = true;
                    break;
                }
                currentBoard[i][j].canDrop = true;
            }
            i -= 1;
        }

        //rook right
        i = x;
        j = y+1;
        while (j<8 && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {    
            tempPiece = currentBoard[i][j].piece;
            testBoard[i][j].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                if (currentBoard[i][j].piece.color != 2)
                {
                    currentBoard[i][j].canDrop = true;
                    break;
                }
                currentBoard[i][j].canDrop = true;
            }
            j += 1;
        }

        //rook left
        i = x;
        j = y-1;
        while (j>-1 && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {    
            tempPiece = currentBoard[i][j].piece;
            testBoard[i][j].piece= piece;
            testBoard[x][y].piece= tempPiece;
            causesCheck = this.verifyCheck(testBoard);

            if (causesCheck == false)
            {
                if (currentBoard[i][j].piece.color != 2)
                {
                    currentBoard[i][j].canDrop = true;
                    break;
                }
                currentBoard[i][j].canDrop = true;
            }
            j -= 1;
        }
    }

    // ======================================================================== //

    getKingMoves(currentBoard: any, piece: Piece, x: number, y: number)
    {
        //up
        let isCheck = this.verifyCheck(currentBoard, piece, x-1, y);
        if ((x-1)>-1 && isCheck == false 
            && (currentBoard[x-1][y].piece.pieceName == '0'
            || currentBoard[x-1][y].piece.color != piece.color))
        {
            currentBoard[x-1][y].canDrop = true;
        }

        //down
        isCheck = this.verifyCheck(currentBoard, piece, x+1, y);
        if ((x+1)<8 && isCheck == false 
            && (currentBoard[x+1][y].piece.pieceName == '0'
            || currentBoard[x+1][y].piece.color != piece.color))
        {
            currentBoard[x+1][y].canDrop = true;
        }

        //right
        isCheck = this.verifyCheck(currentBoard, piece, x, y+1);
        if ((y+1)<8 && isCheck == false 
            && (currentBoard[x][y+1].piece.pieceName == '0'
            || currentBoard[x][y+1].piece.color != piece.color))
        {
            currentBoard[x][y+1].canDrop = true;
        }

        //left
        isCheck = this.verifyCheck(currentBoard, piece, x, y-1);
        if ((y-1)>-1 && isCheck == false 
            && (currentBoard[x][y-1].piece.pieceName == '0'
            || currentBoard[x][y-1].piece.color != piece.color))
        {
            currentBoard[x][y-1].canDrop = true;
        }

        //up left
        isCheck = this.verifyCheck(currentBoard, piece, x-1, y-1);
        if ((x-1)>-1 && (y-1)>-1 && isCheck == false 
            && (currentBoard[x-1][y-1].piece.pieceName == '0'
            || currentBoard[x-1][y-1].piece.color != piece.color))
        {
            currentBoard[x-1][y-1].canDrop = true;
        }

        //up right
        isCheck = this.verifyCheck(currentBoard, piece, x-1, y+1);
        if ((x-1)>-1 && (y+1)<8 && isCheck == false 
            && (currentBoard[x-1][y+1].piece.pieceName == '0'
            || currentBoard[x-1][y+1].piece.color != piece.color))
        {
            currentBoard[x-1][y+1].canDrop = true;
        }
        

        //down left
        isCheck = this.verifyCheck(currentBoard, piece, x+1, y-1);
        if ((x+1)<8 && (y-1)>-1 && isCheck == false 
            && (currentBoard[x+1][y-1].piece.pieceName == '0'
            || currentBoard[x+1][y-1].piece.color != piece.color))
        {
            currentBoard[x+1][y-1].canDrop = true;
        }

        //down right
        isCheck = this.verifyCheck(currentBoard, piece, x+1, y+1);
        if ((x+1)<8 && (y+1)<8 &&  isCheck == false 
            && (currentBoard[x+1][y+1].piece.pieceName == '0'
            || currentBoard[x+1][y+1].piece.color != piece.color))
        {
            currentBoard[x+1][y+1].canDrop = true;
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

    verifyCheck(currentBoard: any, piece?: Piece, x?: number, y?: number): boolean
    {
        let isCheck: boolean = false;
        let name: string;
        let i: number;
        let j: number;

        if (piece == undefined)
        {
            if (this.color == 0)
            {
                name = 'K';
            }
            else if (this.color == 1)
            {
                name = 'k';
            }
            piece = this.findPiece(currentBoard, name);
            x = piece.arrayRow;
            y = piece.arrayCol;
        }

        if (x>7 || x<0 || y>7 || y<0)
        {
            return isCheck;
        }

        // ----------------------------------------------------------------- //

        // pawn
        if (piece.color == 0)
        {
            if ((x-1)>-1 && (y+1)< 8 && currentBoard[x-1][y+1].piece.pieceName == 'p'
            || (y-1)>-1 && currentBoard[x-1][y-1].piece.pieceName == 'p')
            {
                return true;
            }
        }
        else if (piece.color == 1)
        {
            if ((x+1)<8 && (y+1)<8 && currentBoard[x+1][y+1].piece.pieceName == 'P'
            || (y-1)>-1 && currentBoard[x+1][y-1].piece.pieceName == 'P')
            {
                return true;
            }
        }

        // ----------------------------------------------------------------- //

        // knight
        if ((x-2)>-1 && (y-1)>-1 && currentBoard[x-2][y-1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x-2][y-1].piece.pieceName == 'N')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x-2][y-1].piece.pieceName == 'n')
            {
                return true;
            }
        }
        if ((x-2)>-1 && (y+1)<8 && currentBoard[x-2][y+1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x-2][y+1].piece.pieceName == 'N')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x-2][y+1].piece.pieceName == 'n')
            {
                return true;
            }
        }
        if ((x-1)>-1 && (y-2)>-1 && currentBoard[x-1][y-2].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x-1][y-2].piece.pieceName == 'N')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x-1][y-2].piece.pieceName == 'n')
            {
                return true;
            }
        }
        if ((x-1)>-1 && (y+2)<8 && currentBoard[x-1][y+2].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x-1][y+2].piece.pieceName == 'N')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x-1][y+2].piece.pieceName == 'n')
            {
                return true;
            }
        }
        if ((x+1)<8 && (y-2)>-1 && currentBoard[x+1][y-2].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x+1][y-2].piece.pieceName == 'N')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x+1][y-2].piece.pieceName == 'n')
            {
                return true;
            }
        }
        if ((x+1)<8 && (y+2)<8 && currentBoard[x+1][y+2].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x+1][y+2].piece.pieceName == 'N')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x+1][y+2].piece.pieceName == 'n')
            {
                return true;
            }
        }
        if ((x+2)<8 && (y-1)>-1 && currentBoard[x+2][y-1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x+2][y-1].piece.pieceName == 'N')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x+2][y-1].piece.pieceName == 'n')
            {
                return true;
            }
        }
        if ((x+2)<8 && (y+1)<8 && currentBoard[x+2][y+1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x+2][y+1].piece.pieceName == 'N')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x+2][y+1].piece.pieceName == 'n')
            {
                return true;
            }
        }

        // ----------------------------------------------------------------- //

        // bishop
        // up-left (--)
        i = x-1;
        j = y-1;
        while (i>-1 && j>-1
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.pieceName == 'B'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName == 'b'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName != '0')
            {
                break;
            }
            i -= 1;
            j -= 1;
        }
        
        // up-right (-+)
        i = x-1;
        j = y+1;
        while (i>-1 && j<8
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.pieceName == 'B'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName == 'b'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName != '0')
            {
                break;
            }
            i -= 1;
            j += 1;
        }

        // down-right (++)
        i = x+1;
        j = y+1;
        while (i<8 && j<8
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.pieceName == 'B'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName == 'b'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName != '0')
            {
                break;
            }
            i += 1;
            j += 1;
        }

        // down-left (+-)
        i = x+1;
        j = y-1;
        while (i<8 && j>-1
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.pieceName == 'B'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName == 'b'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName != '0')
            {
                break;
            }
            i += 1;
            j -= 1;
        }

        // ----------------------------------------------------------------- //

        // rook
        // up rook
        i = x+1;
        for (i; i<8; i++)
        {
            if (currentBoard[i][y].piece.pieceName == 'R'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName == 'r'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName != '0')
            {
                break;
            }
        }
        //down rook
        i = x-1;
        for (i; i>-1; i--)
        {
            if (currentBoard[i][y].piece.pieceName == 'R'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName == 'r'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName != '0')
            {
                break;
            }
        }

        //right rook
        i = y+1;
        for (i; i<8; i++)
        {
            if (currentBoard[i][y].piece.pieceName == 'R'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName == 'r'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName != '0')
            {
                break;
            }
        }

        //left rook
        i = y-1;
        for (i; i>-1; i--)
        {
            if (currentBoard[x][i].piece.pieceName == 'R'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[x][i].piece.pieceName == 'r'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[x][i].piece.pieceName != '0')
            {
                break;
            }
        }

        // ----------------------------------------------------------------- //

        // queen

        // up queen
        i = x+1;
        for (i; i<8; i++)
        {
            if (currentBoard[i][y].piece.pieceName == 'Q'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName == 'q'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName != '0')
            {
                break;
            }
        }
        //down queen
        i = x-1;
        for (i; i>-1; i--)
        {
            if (currentBoard[i][y].piece.pieceName == 'Q'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName == 'q'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName != '0')
            {
                break;
            }
        }

        //right queen
        i = y+1;
        for (i; i<8; i++)
        {
            if (currentBoard[i][y].piece.pieceName == 'Q'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName == 'q'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][y].piece.pieceName != '0')
            {
                break;
            }
        }

        //left queen
        i = y-1;
        for (i; i>-1; i--)
        {
            if (currentBoard[x][i].piece.pieceName == 'Q'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[x][i].piece.pieceName == 'q'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[x][i].piece.pieceName != '0')
            {
                break;
            }
        }

        // up-left (--)
        i = x-1;
        j = y-1;
        while (i>-1 && j>-1
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.pieceName == 'Q'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName == 'q'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName != '0')
            {
                break;
            }
            i -= 1;
            j -= 1;
        }
        
        // up-right (-+)
        i = x-1;
        j = y+1;
        while (i>-1 && j<8
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.pieceName == 'Q'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName == 'q'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName != '0')
            {
                break;
            }
            i -= 1;
            j += 1;
        }

        // down-right (++)
        i = x+1;
        j = y+1;
        while (i<8 && j<8
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.pieceName == 'Q'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName == 'q'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName != '0')
            {
                break;
            }
            i += 1;
            j += 1;
        }

        // down-left (+-)
        i = x+1;
        j = y-1;
        while (i<8 && j>-1
            && (currentBoard[i][j].piece.pieceName == '0'
            || currentBoard[i][j].piece.color != piece.color))
        {
            if (currentBoard[i][j].piece.pieceName == 'Q'
                && piece.pieceName == 'k')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName == 'q'
                    && piece.pieceName == 'K')
            {
                return true;
            }
            else if (currentBoard[i][j].piece.pieceName != '0')
            {
                break;
            }
            i += 1;
            j -= 1;
        }

        // ----------------------------------------------------------------- //

        // king
        //up
        if ((x-1)>-1 && currentBoard[x-1][y].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x-1][y].piece.pieceName == 'K')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x-1][y].piece.pieceName == 'k')
            {
                return true;
            }
        }

        //down
        if ((x+1)<8 && currentBoard[x+1][y].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x+1][y].piece.pieceName == 'K')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x+1][y].piece.pieceName == 'k')
            {
                return true;
            }
        }

        //right
        if ((y+1)<8 && currentBoard[x][y+1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x][y+1].piece.pieceName == 'K')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x][y+1].piece.pieceName == 'k')
            {
                return true;
            }
        }

        //left
        if ((y-1)>-1 && currentBoard[x][y-1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x][y-1].piece.pieceName == 'K')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x][y-1].piece.pieceName == 'k')
            {
                return true;
            }
        }

        //up left
        if ((x-1)>-1 && (y-1)>-1 && currentBoard[x-1][y-1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x-1][y-1].piece.pieceName == 'K')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x-1][y-1].piece.pieceName == 'k')
            {
                return true;
            }
        }

        //up right
        if ((x-1)>-1 && (y+1)<8 && currentBoard[x-1][y+1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x-1][y+1].piece.pieceName == 'K')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x-1][y+1].piece.pieceName == 'k')
            {
                return true;
            }
        }
        

        //down left
        if ((x+1)<8 && (y-1)>-1 && currentBoard[x+1][y-1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x+1][y-1].piece.pieceName == 'K')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x+1][y-1].piece.pieceName == 'k')
            {
                return true;
            }
        }

        //down right
        if ((x+1)<8 && (y+1)<8 && currentBoard[x+1][y+1].piece.color != piece.color)
        {
            if (piece.pieceName == 'k' && currentBoard[x+1][y+1].piece.pieceName == 'K')
            {
                return true;
            }
            else if (piece.pieceName == 'K' && currentBoard[x+1][y+1].piece.pieceName == 'k')
            {
                return true;
            }
        }

        return isCheck;
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
}